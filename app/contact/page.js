'use client';
import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/site/Reveal';
import { CheckCircle2, Loader2, Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { trackEvent, Events } from '@/lib/analytics';

const SERVICES = ['Stage 1 Remap','Stage 2 Remap','Stage 3 Remap','DPF Solutions','EGR Solutions','AdBlue Solutions','Speed Limiter Removal','Pop & Bang Calibration','Launch Control','Diagnostics','Vehicle Health Check','Other / Custom'];

function ContactForm() {
  const params = useSearchParams();
  const [form, setForm] = useState({
    name: '', email: '', telephone: '',
    registration: params.get('reg') || '', make: params.get('make') || '', model: params.get('model') || '',
    service: '', message: ''
  });
  const [status, setStatus] = useState({ state: 'idle', message: null });

  useEffect(() => { setForm(f => ({ ...f, registration: params.get('reg') || f.registration, make: params.get('make') || f.make, model: params.get('model') || f.model })); }, [params]);

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'submitting' });
    trackEvent(Events.contactSubmit, { service: form.service });
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      const data = await res.json();
      if (data.ok) {
        setStatus({ state: 'success', message: 'Your enquiry has been sent. We’ll be in touch shortly.' });
        setForm({ name: '', email: '', telephone: '', registration: '', make: '', model: '', service: '', message: '' });
      } else setStatus({ state: 'error', message: data.error || 'Something went wrong.' });
    } catch { setStatus({ state: 'error', message: 'Network error. Please try again.' }); }
  };

  const input = 'w-full px-4 py-3.5 rounded-lg bg-neutral-50 border border-neutral-200 focus:border-[hsl(var(--gold))] focus:ring-2 focus:ring-[hsl(var(--gold)/0.15)] outline-none transition text-sm';
  const label = 'text-xs font-semibold tracking-wider uppercase text-neutral-600 mb-2 block';

  return (
    <form onSubmit={submit} className="luxury-card p-8 lg:p-10 space-y-5">
      <div className="grid md:grid-cols-2 gap-5">
        <div><label className={label}>Name *</label><input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={input} /></div>
        <div><label className={label}>Email *</label><input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className={input} /></div>
        <div><label className={label}>Telephone</label><input value={form.telephone} onChange={e=>setForm({...form,telephone:e.target.value})} className={input} /></div>
        <div><label className={label}>Vehicle Registration</label><input value={form.registration} onChange={e=>setForm({...form,registration:e.target.value.toUpperCase()})} className={input + ' uppercase tracking-wider'} /></div>
        <div><label className={label}>Vehicle Make</label><input value={form.make} onChange={e=>setForm({...form,make:e.target.value})} className={input} /></div>
        <div><label className={label}>Vehicle Model</label><input value={form.model} onChange={e=>setForm({...form,model:e.target.value})} className={input} /></div>
      </div>
      <div>
        <label className={label}>Requested Service</label>
        <select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className={input}>
          <option value="">Select a service…</option>
          {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div>
        <label className={label}>Message *</label>
        <textarea required rows={5} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className={input + ' resize-none'} placeholder="Tell us a little about your vehicle and what you’re looking for." />
      </div>
      {status.state === 'error' && <p className="text-sm text-red-600">{status.message}</p>}
      {status.state === 'success' && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-emerald-900">{status.message}</p>
        </div>
      )}
      <button type="submit" disabled={status.state === 'submitting'} className="btn-gold w-full py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2 justify-center disabled:opacity-60">
        {status.state === 'submitting' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : 'Send Enquiry'}
      </button>
      <p className="text-xs text-neutral-500 text-center">Your enquiry will be sent securely to <span className="font-medium">performance.srx@gmail.com</span>. We’ll respond within one working day.</p>
    </form>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-14">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="section-eyebrow">Enquire</span>
            <h1 className="font-display text-5xl lg:text-6xl font-medium mt-5">Get in Touch</h1>
            <p className="mt-5 text-neutral-600 max-w-2xl mx-auto">Send us the details of your vehicle and requested service. We’ll get back with a bespoke quote.</p>
          </Reveal>
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <Suspense fallback={<div className="luxury-card p-10">Loading form…</div>}>
              <ContactForm />
            </Suspense>
          </div>
          <aside className="space-y-5">
            <div className="luxury-card p-7">
              <h3 className="font-semibold text-lg mb-4">Direct Contact</h3>
              <ul className="space-y-4 text-sm text-neutral-700">
                <li className="flex items-start gap-3"><Phone className="w-4 h-4 gold-text mt-1" /><div><div className="text-xs text-neutral-500">Phone</div><a href="tel:+447919012892" onClick={()=>trackEvent(Events.phoneClick, { location: 'contact-sidebar' })} className="hover:gold-text">+44 7919 012892</a></div></li>
                <li className="flex items-start gap-3"><Mail className="w-4 h-4 gold-text mt-1" /><div><div className="text-xs text-neutral-500">Email</div><a href="mailto:performance.srx@gmail.com" onClick={()=>trackEvent(Events.emailClick, { location: 'contact-sidebar' })} className="hover:gold-text">performance.srx@gmail.com</a></div></li>
                <li className="flex items-start gap-3"><MapPin className="w-4 h-4 gold-text mt-1" /><div><div className="text-xs text-neutral-500">Location</div>Cardiff, United Kingdom</div></li>
                <li className="flex items-start gap-3"><Instagram className="w-4 h-4 gold-text mt-1" /><div><div className="text-xs text-neutral-500">Instagram</div><a href="https://instagram.com/srx.performance" target="_blank" rel="noopener noreferrer" className="hover:gold-text">@srx.performance</a></div></li>
                <li className="flex items-start gap-3">
                  <svg viewBox="0 0 24 24" className="w-4 h-4 gold-text mt-1" fill="currentColor" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                  </svg>
                  <div><div className="text-xs text-neutral-500">TikTok</div><a href="https://www.tiktok.com/@srxperformance" target="_blank" rel="noopener noreferrer" className="hover:gold-text">@srxperformance</a></div>
                </li>
              </ul>
            </div>
            <div className="luxury-card p-7 bg-neutral-900 text-white border-neutral-900">
              <h3 className="font-semibold text-lg mb-2">By Appointment Only</h3>
              <p className="text-sm text-neutral-300 leading-relaxed">To provide our full attention to every vehicle, we operate strictly on an appointment basis. Get in touch to arrange a convenient time.</p>
            </div>
          </aside>
        </div>
      </section>
      <Footer />
    </main>
  );
}
