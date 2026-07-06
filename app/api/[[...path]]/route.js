import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { Resend } from 'resend';
import { lookupVehicle } from '@/lib/vehicle-service';

// ---- MongoDB (singleton) ----
let client;
let db;
async function getDb() {
  if (db) return db;
  client = client || new MongoClient(process.env.MONGO_URL);
  await client.connect();
  db = client.db(process.env.DB_NAME || 'srx_performance');
  return db;
}

// ---- Resend (singleton, tolerates missing key) ----
function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};
function json(data, status = 200) {
  return NextResponse.json(data, { status, headers: CORS_HEADERS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function GET(request, { params }) {
  const p = (await params)?.path || [];
  const route = p.join('/');
  try {
    if (route === '' || route === 'health') return json({ ok: true, service: 'SRX Performance API' });
    return json({ ok: false, error: 'Not found' }, 404);
  } catch (e) {
    return json({ ok: false, error: e.message }, 500);
  }
}

export async function POST(request, { params }) {
  const p = (await params)?.path || [];
  const route = p.join('/');
  try {
    const body = await request.json().catch(() => ({}));

    // ---- Vehicle Lookup ----
    if (route === 'vehicle/lookup') {
      const { registration } = body || {};
      const result = await lookupVehicle(registration);
      try {
        const d = await getDb();
        await d.collection('vehicle_lookups').insertOne({
          registration, at: new Date(), success: !!result.ok, provider: result.provider || null,
        });
      } catch (_) {}
      return json(result);
    }

    // ---- Lead capture (from calculator after registration lookup) ----
    if (route === 'lead') {
      const { name, email, telephone, vehicle } = body || {};
      if (!name || !email || !telephone) {
        return json({ ok: false, error: 'Name, email and phone are required.' }, 400);
      }

      let mongoId = null;
      try {
        const d = await getDb();
        const r = await d.collection('leads').insertOne({
          name, email, telephone, vehicle, source: 'calculator', createdAt: new Date(),
        });
        mongoId = r.insertedId.toString();
      } catch (e) { console.error('Mongo insert failed:', e.message); }

      const resend = getResend();
      let emailStatus = 'skipped';
      let emailError = null;
      if (resend) {
        try {
          const v = vehicle || {};
          const html = `
            <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;background:#fff">
              <div style="border-bottom:2px solid #C8A24C;padding-bottom:12px;margin-bottom:18px">
                <h2 style="color:#0A0A0A;margin:0;font-size:22px">New Stage 1 Lead &mdash; SRX Performance</h2>
                <p style="color:#999;font-size:12px;margin:6px 0 0 0">Captured from Performance Calculator</p>
              </div>
              <h3 style="margin:0 0 8px 0;font-size:14px;color:#666">CUSTOMER</h3>
              <table style="width:100%;font-size:14px;color:#222;margin-bottom:16px">
                <tr><td style="padding:6px 0;color:#666;width:150px">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
                <tr><td style="padding:6px 0;color:#666">Email</td><td><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td></tr>
                <tr><td style="padding:6px 0;color:#666">Phone</td><td><a href="tel:${escapeHtml(telephone)}">${escapeHtml(telephone)}</a></td></tr>
              </table>
              <h3 style="margin:0 0 8px 0;font-size:14px;color:#666">VEHICLE</h3>
              <table style="width:100%;font-size:14px;color:#222">
                <tr><td style="padding:6px 0;color:#666;width:150px">Registration</td><td><strong style="font-family:monospace;letter-spacing:2px">${escapeHtml(v.registration || '\u2014')}</strong></td></tr>
                <tr><td style="padding:6px 0;color:#666">Make</td><td>${escapeHtml(v.make || '\u2014')}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Model</td><td>${escapeHtml(v.model || '\u2014')}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Year</td><td>${escapeHtml(v.year || '\u2014')}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Fuel</td><td>${escapeHtml(v.fuel || '\u2014')}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Engine</td><td>${escapeHtml(v.engineCCDisplay || (v.engineCC ? v.engineCC + ' cc' : '\u2014'))}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Colour</td><td>${escapeHtml(v.colour || '\u2014')}</td></tr>
              </table>
              <div style="margin-top:22px;padding:14px;background:#fafafa;border-left:3px solid #C8A24C;font-size:13px;color:#333">
                Action needed: prepare Stage 1 estimate and reply to customer at <strong>${escapeHtml(email)}</strong>.
              </div>
              <p style="color:#999;font-size:12px;margin-top:20px">Lead ID: ${mongoId || 'n/a'}</p>
            </div>`;
          const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'SRX Performance <onboarding@resend.dev>',
            to: process.env.CONTACT_TO_EMAIL || 'performance.srx@gmail.com',
            replyTo: email,
            subject: `New Stage 1 Lead \u2013 ${name} \u2013 ${(vehicle?.make || '')} ${(vehicle?.model || '') || (vehicle?.registration || '')}`.trim(),
            html,
          });
          if (error) { emailStatus = 'failed'; emailError = error.message || String(error); }
          else emailStatus = 'sent';
        } catch (e) { emailStatus = 'failed'; emailError = e.message; }
      }

      return json({ ok: true, id: mongoId, emailStatus, emailError });
    }

    // ---- Contact Form Submission ----
    if (route === 'contact') {
      const { name, email, telephone, registration, make, model, service, message } = body || {};
      if (!name || !email || !message) {
        return json({ ok: false, error: 'Name, email and message are required.' }, 400);
      }

      let mongoId = null;
      try {
        const d = await getDb();
        const doc = { name, email, telephone, registration, make, model, service, message, createdAt: new Date() };
        const r = await d.collection('enquiries').insertOne(doc);
        mongoId = r.insertedId.toString();
      } catch (e) { console.error('Mongo insert failed:', e.message); }

      const resend = getResend();
      let emailStatus = 'skipped';
      let emailError = null;

      if (resend) {
        try {
          const html = `
            <div style="font-family:Inter,Arial,sans-serif;max-width:640px;margin:auto;padding:24px;background:#fff">
              <div style="border-bottom:2px solid #C8A24C;padding-bottom:12px;margin-bottom:18px">
                <h2 style="color:#0A0A0A;margin:0;font-size:22px">New Enquiry &mdash; SRX Performance</h2>
              </div>
              <table style="width:100%;font-size:14px;color:#222">
                <tr><td style="padding:6px 0;color:#666;width:180px">Name</td><td><strong>${escapeHtml(name)}</strong></td></tr>
                <tr><td style="padding:6px 0;color:#666">Email</td><td>${escapeHtml(email)}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Telephone</td><td>${escapeHtml(telephone || '\u2014')}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Registration</td><td>${escapeHtml(registration || '\u2014')}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Vehicle</td><td>${escapeHtml(`${make || ''} ${model || ''}`.trim() || '\u2014')}</td></tr>
                <tr><td style="padding:6px 0;color:#666">Service</td><td>${escapeHtml(service || '\u2014')}</td></tr>
              </table>
              <div style="margin-top:18px;padding:16px;background:#fafafa;border-left:3px solid #C8A24C">
                <div style="color:#666;font-size:12px;margin-bottom:6px">MESSAGE</div>
                <div style="white-space:pre-wrap;color:#111">${escapeHtml(message)}</div>
              </div>
              <p style="color:#999;font-size:12px;margin-top:20px">Enquiry ID: ${mongoId || 'n/a'}</p>
            </div>`;
          const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL || 'SRX Performance <onboarding@resend.dev>',
            to: process.env.CONTACT_TO_EMAIL || 'performance.srx@gmail.com',
            replyTo: email,
            subject: `New Enquiry \u2013 ${name}${service ? ` \u2013 ${service}` : ''}`,
            html,
          });
          if (error) { emailStatus = 'failed'; emailError = error.message || String(error); }
          else emailStatus = 'sent';
        } catch (e) { emailStatus = 'failed'; emailError = e.message; }
      }

      return json({ ok: true, id: mongoId, emailStatus, emailError });
    }

    return json({ ok: false, error: 'Not found' }, 404);
  } catch (e) {
    console.error('API error:', e);
    return json({ ok: false, error: e.message }, 500);
  }
}

function escapeHtml(str = '') {
  return String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
