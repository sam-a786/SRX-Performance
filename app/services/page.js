'use client';
import Link from 'next/link';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/site/Reveal';
import { Zap, Gauge, Sparkles, Wind, Fuel, Beaker, Rocket, Flame, Trophy, Stethoscope, Heart, Wrench, ArrowRight, Clock } from 'lucide-react';
import { trackEvent, Events } from '@/lib/analytics';

const SERVICES = [
  { icon: Zap, title: 'Stage 1 Remap', desc: 'Optimised calibration on standard hardware. Increased power, torque and drivability with OEM reliability.', benefits: ['+20–30% power (typical)', 'Sharper throttle response', 'Better mid-range torque', 'Improved MPG on cruise'], time: '60–90 min' },
  { icon: Gauge, title: 'Stage 2 Remap', desc: 'For vehicles fitted with performance hardware such as intake, downpipe or intercooler upgrades.', benefits: ['Higher power ceiling', 'Optimised for hardware', 'Refined boost control', 'Custom fuel & ignition'], time: '90–120 min' },
  { icon: Sparkles, title: 'Stage 3 Remap', desc: 'Race-grade calibrations for extensively modified builds, including hybrid turbo and forged engines.', benefits: ['Fully bespoke tuning', 'Track-focused mapping', 'Data-logged validation', 'Ongoing support'], time: 'Custom' },
  { icon: Wind, title: 'DPF Solutions', desc: 'Diagnostic and calibration solutions for problematic Diesel Particulate Filter systems (off-road use).', benefits: ['Fault code cleared', 'Improved efficiency', 'Reduced regen intervals', 'Off-road use only'], time: '90 min' },
  { icon: Beaker, title: 'EGR Solutions', desc: 'Software solutions for faulty EGR systems, restoring performance and lowering intake soot build-up.', benefits: ['Cleaner intake', 'Improved reliability', 'Better throttle response', 'Off-road use only'], time: '60–90 min' },
  { icon: Fuel, title: 'AdBlue Solutions', desc: 'Reliable AdBlue/SCR system solutions to eliminate limp modes and countdown errors (off-road use).', benefits: ['No countdown timers', 'No AdBlue tank issues', 'Improved reliability', 'Off-road use only'], time: '60–90 min' },
  { icon: Rocket, title: 'Speed Limiter Removal', desc: 'Removal of manufacturer top-speed limiters where legally permitted (private land use).', benefits: ['Free-flowing performance', 'Correct top-speed reporting', 'Track-day ready'], time: '45–60 min' },
  { icon: Flame, title: 'Pop & Bang Calibration', desc: 'Enhanced exhaust decel character on suitable vehicles, tuned for a controlled, refined tone.', benefits: ['Refined character', 'Controlled decel', 'Configurable intensity'], time: '60–90 min' },
  { icon: Trophy, title: 'Launch Control', desc: 'Software launch control calibration on suitable performance vehicles for consistent starts.', benefits: ['Consistent launches', 'Configurable RPM', 'Optimised traction'], time: '60 min' },
  { icon: Stethoscope, title: 'Diagnostics', desc: 'Full diagnostic scans, live-data logging and fault-code reporting across all vehicle systems.', benefits: ['Complete ECU scan', 'Live-data recording', 'Written report'], time: '30–60 min' },
  { icon: Heart, title: 'Vehicle Health Checks', desc: 'Comprehensive pre-mapping health checks. We only tune vehicles we’re confident are ready.', benefits: ['Compression check', 'Sensor verification', 'Fluids & filters review'], time: '30–45 min' },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="section-eyebrow">Services</span>
            <h1 className="font-display text-5xl lg:text-6xl font-medium mt-5">Performance, Refined</h1>
            <p className="mt-5 text-lg text-neutral-600 max-w-2xl mx-auto">Every service delivered with OEM-grade tooling, custom calibrations and full post-service support.</p>
          </Reveal>
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.04}>
              <div className="luxury-card p-8 h-full flex flex-col">
                <div className="w-14 h-14 rounded-xl bg-neutral-50 flex items-center justify-center border border-neutral-100">
                  <s.icon className="w-6 h-6 gold-text" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-neutral-900">{s.title}</h3>
                <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
                <ul className="mt-5 space-y-2">
                  {s.benefits.map(b => (<li key={b} className="text-sm text-neutral-700 flex items-start gap-2"><span className="gold-text mt-0.5">–</span>{b}</li>))}
                </ul>
                <div className="mt-auto pt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
                  <span className="text-neutral-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {s.time}</span>
                  <Link href="/contact" onClick={() => trackEvent(Events.quoteRequest, { location: 'services-card', service: s.title })} className="gold-text font-semibold hover:underline">Enquire →</Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="luxury-card p-10 lg:p-14 text-center">
            <span className="section-eyebrow">Ready to Begin?</span>
            <h2 className="font-display text-3xl lg:text-4xl font-medium mt-4">Request Your Personalised Quote</h2>
            <div className="mt-8"><Link href="/contact" onClick={() => trackEvent(Events.quoteRequest, { location: 'services-footer' })} className="btn-gold px-8 py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2">Get a Quote <ArrowRight className="w-4 h-4" /></Link></div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
