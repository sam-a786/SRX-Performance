'use client';
import { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/site/Reveal';
import { ArrowRight, Gauge, Zap, Search, Loader2, CheckCircle2, Car, Palette, Fuel, Calendar, Cog, ShieldCheck } from 'lucide-react';
import { trackEvent, trackLeadConversion, Events } from '@/lib/analytics';

const FUEL_OPTIONS = ['Petrol', 'Diesel', 'Hybrid', 'Plug-in Hybrid', 'Electric'];
const CURRENT_YEAR = new Date().getFullYear();
const YEAR_OPTIONS = Array.from({ length: 30 }, (_, i) => CURRENT_YEAR - i);

function CalculatorInner() {
  const params = useSearchParams();
  const [reg, setReg] = useState(params.get('reg') || '');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true); setError(null); setResult(null);
    trackEvent(Events.vehicleLookup, { registration: reg });
    try {
      const res = await fetch('/api/vehicle/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registration: reg }),
      });
      const data = await res.json();
      if (data.ok) setResult(data);
      else setError(data.error || 'Vehicle not found');
    } catch (err) { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <>
      {/* HEADER */}
      <section className="pt-32 pb-10">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="section-eyebrow">Performance Calculator</span>
            <h1 className="font-display text-5xl lg:text-6xl font-medium mt-5">See What Your Vehicle Can Do</h1>
            <p className="mt-5 text-neutral-600 max-w-2xl mx-auto">Enter your UK registration to receive a personalised Stage 1 performance estimate — tailored to your exact vehicle.</p>
          </Reveal>
        </div>
      </section>

      {/* SEARCH */}
      <section className="pb-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Reveal>
            <form onSubmit={submit} className="luxury-card p-4 lg:p-6 flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-3 flex-1 w-full">
                <div className="bg-blue-600 text-yellow-300 font-bold px-3 py-3 rounded-md text-sm tracking-wider hidden sm:block">GB</div>
                <input
                  value={reg}
                  onChange={(e) => setReg(e.target.value.toUpperCase())}
                  placeholder="YOUR REG"
                  className="flex-1 text-2xl font-black tracking-widest uppercase bg-yellow-300 text-neutral-900 py-3 px-4 rounded-md placeholder:text-neutral-800/50 outline-none border-2 border-yellow-400 w-full text-center"
                  maxLength={8}
                />
              </div>
              <button type="submit" disabled={loading || !reg} className="btn-gold px-6 py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2 w-full sm:w-auto justify-center disabled:opacity-60">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Check Vehicle
              </button>
            </form>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500 mt-4">
              <ShieldCheck className="w-3.5 h-3.5 gold-text" />
              <span>Your details are never shared. We only use them to email your personalised estimate.</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ERROR */}
      <AnimatePresence>
        {error && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="pb-8">
            <div className="max-w-3xl mx-auto px-6 lg:px-10">
              <div className="luxury-card p-6 border-red-200 bg-red-50/60">
                <p className="text-sm text-red-800 font-medium">{error}</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* RESULT */}
      <AnimatePresence>
        {result && (
          <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pb-16">
            <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-6">
              {result.hasPerformanceData && result.stage1 && (
                <>
                  <VehicleInfoCard vehicle={result.vehicle} stage1={result.stage1} showPercent />
                  <PerformanceCard factory={result.factory} stage1={result.stage1} />
                  <FinalCtaCard vehicle={result.vehicle} />
                </>
              )}

              {!result.hasPerformanceData && (
                <LeadCapture vehicle={result.vehicle} notice={result.notice} isManualEntry={result.manualEntry} />
              )}

              {result.hasPerformanceData && (
                <p className="text-xs text-neutral-500 text-center max-w-2xl mx-auto">
                  Performance figures are estimates based on manufacturer specifications and may vary depending on software version and vehicle condition.
                </p>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-xl bg-neutral-50">
      <Icon className="w-4 h-4 gold-text mt-0.5" />
      <div>
        <div className="text-[10px] uppercase tracking-wider text-neutral-500">{label}</div>
        <div className="text-sm font-semibold text-neutral-900">{value}</div>
      </div>
    </div>
  );
}

function VehicleInfoCard({ vehicle, stage1, showPercent }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="luxury-card p-8">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex-1">
          <div className="text-xs tracking-[0.25em] uppercase text-neutral-500">Vehicle Information</div>
          <h2 className="font-display text-3xl lg:text-4xl font-medium mt-2">
            {vehicle.make || 'Vehicle'} {vehicle.model || ''}
          </h2>
          <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {vehicle.make && <InfoTile icon={Car} label="Make" value={vehicle.make} />}
            {vehicle.year && <InfoTile icon={Calendar} label="Year" value={vehicle.year} />}
            {vehicle.fuel && <InfoTile icon={Fuel} label="Fuel" value={vehicle.fuel} />}
            {vehicle.engineCCDisplay && <InfoTile icon={Cog} label="Engine" value={vehicle.engineCCDisplay} />}
            {vehicle.colour && <InfoTile icon={Palette} label="Colour" value={vehicle.colour} />}
            <InfoTile icon={Search} label="Registration" value={vehicle.registration} />
          </div>
        </div>
        {showPercent && stage1 && (
          <div className="flex gap-4">
            <div className="text-center px-6 py-4 rounded-xl bg-neutral-50">
              <div className="text-3xl font-bold gold-gradient-text">+{stage1.bhpPct}%</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Power</div>
            </div>
            <div className="text-center px-6 py-4 rounded-xl bg-neutral-50">
              <div className="text-3xl font-bold gold-gradient-text">+{stage1.torquePct}%</div>
              <div className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Torque</div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function PerformanceCard({ factory, stage1 }) {
  const maxBhp = Math.max(factory.bhp, stage1.bhp);
  const maxTorque = Math.max(factory.torque, stage1.torque);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="luxury-card p-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-6"><Gauge className="w-5 h-5 gold-text" /><h3 className="font-semibold text-lg">Horsepower</h3></div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="text-neutral-600">Factory</span><span className="font-semibold">{factory.bhp} BHP</span></div>
              <div className="power-bar"><motion.div initial={{ width: 0 }} animate={{ width: `${(factory.bhp / maxBhp) * 100}%` }} transition={{ duration: 1 }} className="power-bar-fill" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="text-neutral-600">Stage 1</span><span className="font-semibold gold-text">{stage1.bhp} BHP</span></div>
              <div className="power-bar"><motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.2, delay: 0.2 }} className="power-bar-fill gold" /></div>
            </div>
            <div className="pt-2 text-sm text-neutral-600">Increase: <span className="font-semibold gold-text">+{stage1.bhpIncrease} BHP</span></div>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-6"><Zap className="w-5 h-5 gold-text" /><h3 className="font-semibold text-lg">Torque</h3></div>
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="text-neutral-600">Factory</span><span className="font-semibold">{factory.torque} Nm</span></div>
              <div className="power-bar"><motion.div initial={{ width: 0 }} animate={{ width: `${(factory.torque / maxTorque) * 100}%` }} transition={{ duration: 1 }} className="power-bar-fill" /></div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2"><span className="text-neutral-600">Stage 1</span><span className="font-semibold gold-text">{stage1.torque} Nm</span></div>
              <div className="power-bar"><motion.div initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ duration: 1.2, delay: 0.2 }} className="power-bar-fill gold" /></div>
            </div>
            <div className="pt-2 text-sm text-neutral-600">Increase: <span className="font-semibold gold-text">+{stage1.torqueIncrease} Nm</span></div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function FinalCtaCard({ vehicle }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="luxury-card p-10 text-center relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[hsl(var(--gold))] opacity-10 blur-3xl" />
      <span className="section-eyebrow">Like what you see?</span>
      <h3 className="font-display text-3xl lg:text-4xl font-medium mt-4">Request your personalised quote today.</h3>
      <Link href={`/contact?reg=${encodeURIComponent(vehicle.registration)}&make=${encodeURIComponent(vehicle.make || '')}&model=${encodeURIComponent(vehicle.model || '')}`}
        onClick={() => trackEvent(Events.quoteRequest, { location: 'calculator', vehicle: `${vehicle.make} ${vehicle.model}` })}
        className="btn-gold px-8 py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2 mt-8">
        Request My Quote <ArrowRight className="w-4 h-4" />
      </Link>
    </motion.div>
  );
}

function LeadCapture({ vehicle, notice, isManualEntry }) {
  const [details, setDetails] = useState({
    make: vehicle?.make || '',
    model: vehicle?.model || '',
    year: vehicle?.year || '',
    fuel: vehicle?.fuel || '',
  });
  const [contact, setContact] = useState({ name: '', email: '', telephone: '' });
  const [status, setStatus] = useState({ state: 'idle', message: null });

  const submit = async (e) => {
    e.preventDefault();
    setStatus({ state: 'submitting' });
    trackEvent(Events.leadCapture, { vehicle: `${details.make} ${details.model}`.trim() });
    try {
      const payload = {
        ...contact,
        vehicle: {
          registration: vehicle.registration,
          make: details.make,
          model: details.model,
          year: details.year,
          fuel: details.fuel,
          engineCCDisplay: vehicle.engineCCDisplay || null,
          colour: vehicle.colour || null,
        },
      };
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        // Fire Google Ads conversion ONLY after the lead is confirmed captured.
        trackLeadConversion({ transaction_id: data.id, event_category: 'lead_calculator' });
        setStatus({ state: 'success' });
      } else {
        setStatus({ state: 'error', message: data.error || 'Something went wrong.' });
      }
    } catch { setStatus({ state: 'error', message: 'Network error. Please try again.' }); }
  };

  const input = 'w-full px-4 py-3.5 rounded-lg bg-white border border-neutral-200 focus:border-[hsl(var(--gold))] focus:ring-2 focus:ring-[hsl(var(--gold)/0.15)] outline-none transition text-sm';
  const labelCls = 'text-xs font-semibold tracking-wider uppercase text-neutral-600 mb-2 block';

  if (status.state === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="luxury-card p-10 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[hsl(var(--gold))] opacity-10 blur-3xl" />
        <CheckCircle2 className="w-14 h-14 gold-text mx-auto" />
        <h3 className="font-display text-3xl lg:text-4xl font-medium mt-6">Thanks! We&apos;ll email your personalised Stage 1 estimate shortly.</h3>
        <p className="mt-3 text-neutral-600 max-w-lg mx-auto">Our team is preparing a bespoke report for your {details.make || 'vehicle'}. You&apos;ll hear from us within one working day.</p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/services" className="px-6 py-3 rounded-full font-semibold text-sm border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition inline-flex items-center gap-2 justify-center">Browse Services</Link>
          <a href="https://instagram.com/srx.performance" target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2 justify-center">Follow @srx.performance</a>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="luxury-card p-8 lg:p-10 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[hsl(var(--gold))] opacity-10 blur-3xl pointer-events-none" />
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <span className="section-eyebrow">Your Personalised Report</span>
            <h3 className="font-display text-3xl lg:text-4xl font-medium mt-4">Want to see your full Stage 1 performance report?</h3>
            <p className="mt-3 text-neutral-600 max-w-2xl">
              Confirm your vehicle details below and our team will email you a bespoke Stage 1 estimate — including projected power, torque and drivability gains.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-1 shrink-0">
            <div className="text-[10px] tracking-[0.25em] uppercase text-neutral-500">Registration</div>
            <div className="bg-yellow-300 text-neutral-900 font-black text-lg px-4 py-2 rounded-md border-2 border-yellow-400 tracking-widest">{vehicle.registration}</div>
          </div>
        </div>

        {notice && (
          <p className="mt-5 text-xs text-neutral-500 bg-neutral-50 border border-neutral-200 rounded-lg p-3">{notice}</p>
        )}

        <form onSubmit={submit} className="mt-8 space-y-6">
          {/* Vehicle Details */}
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-neutral-700 mb-4">Vehicle Details</div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Make *</label>
                <input required value={details.make} onChange={e => setDetails({ ...details, make: e.target.value })} className={input} placeholder="e.g. BMW" />
              </div>
              <div>
                <label className={labelCls}>Model *</label>
                <input required value={details.model} onChange={e => setDetails({ ...details, model: e.target.value })} className={input} placeholder="e.g. 320d M Sport" />
              </div>
              <div>
                <label className={labelCls}>Year *</label>
                <select required value={details.year} onChange={e => setDetails({ ...details, year: e.target.value })} className={input}>
                  <option value="">Select year…</option>
                  {YEAR_OPTIONS.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Fuel *</label>
                <select required value={details.fuel} onChange={e => setDetails({ ...details, fuel: e.target.value })} className={input}>
                  <option value="">Select fuel…</option>
                  {FUEL_OPTIONS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-neutral-700 mb-4">Your Details</div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Name *</label>
                <input required value={contact.name} onChange={e => setContact({ ...contact, name: e.target.value })} className={input} placeholder="Full name" />
              </div>
              <div>
                <label className={labelCls}>Email *</label>
                <input required type="email" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} className={input} placeholder="you@example.com" />
              </div>
              <div>
                <label className={labelCls}>Phone *</label>
                <input required value={contact.telephone} onChange={e => setContact({ ...contact, telephone: e.target.value })} className={input} placeholder="07…" />
              </div>
            </div>
          </div>

          <button type="submit" disabled={status.state === 'submitting'} className="btn-gold w-full md:w-auto px-8 py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2 justify-center disabled:opacity-60">
            {status.state === 'submitting' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : <>Send My Stage 1 Report <ArrowRight className="w-4 h-4" /></>}
          </button>
          {status.state === 'error' && <p className="text-sm text-red-600">{status.message}</p>}
        </form>
        <p className="text-xs text-neutral-500 mt-5">By submitting, you agree to be contacted by SRX Performance about your enquiry. We&apos;ll never share your details.</p>
      </div>
    </motion.div>
  );
}

export default function CalculatorPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Suspense fallback={<div className="pt-40 text-center text-neutral-500">Loading…</div>}>
        <CalculatorInner />
      </Suspense>
      <Footer />
    </main>
  );
}
