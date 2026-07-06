'use client';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Gauge, Wrench, ShieldCheck, Sparkles, Zap, Clock, Star, ChevronDown, Instagram, Phone } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/site/Reveal';
import { LOGO_URL } from '@/components/site/Logo';
import { trackEvent, Events } from '@/lib/analytics';
import { useState } from 'react';

const HERO_IMG = 'https://customer-assets.emergentagent.com/job_vehicle-calibration/artifacts/y0h2px8x_1595593791-1288-Lamborghini-Aventador-Glod-Gloss-wrap-1-.jpg';

const SERVICES_PREVIEW = [
  { icon: Zap, title: 'Stage 1 Remap', desc: 'Safe, reliable performance gains on standard hardware.', time: '60–90 min' },
  { icon: Gauge, title: 'Stage 2 Remap', desc: 'For vehicles with performance hardware upgrades.', time: '90–120 min' },
  { icon: Sparkles, title: 'Stage 3 Remap', desc: 'Race-grade calibrations for heavily modified builds.', time: 'Custom' },
  { icon: Wrench, title: 'DPF / EGR / AdBlue', desc: 'Off-road diagnostics and delete solutions.', time: '90 min' },
];

const REASONS = [
  { icon: Wrench, t: 'Professional Equipment', d: 'Industry-leading tools and OEM-grade diagnostic hardware for every calibration.' },
  { icon: Sparkles, t: 'Custom Software', d: 'Bespoke files tuned for your exact vehicle, fuel and driving conditions.' },
  { icon: ShieldCheck, t: 'Reliable Calibrations', d: 'Every map is validated for safety, longevity and OEM reliability tolerances.' },
  { icon: Gauge, t: 'Health Checks Before Mapping', d: 'A comprehensive diagnostic pass runs before any changes are made.' },
  { icon: Zap, t: 'Performance & Efficiency', d: 'More power and torque, with smoother drivability and improved MPG.' },
  { icon: Star, t: 'Aftercare Support', d: 'Ongoing support and revisions after your remap. We stand behind our work.' },
];

const PROCESS = [
  { n: '01', t: 'Vehicle Inspection', d: 'A full visual and mechanical check to ensure your car is ready.' },
  { n: '02', t: 'Diagnostic Health Check', d: 'Deep scan for fault codes, sensor values and vitals.' },
  { n: '03', t: 'Custom ECU Calibration', d: 'A bespoke map written for your engine, fuel and driving.' },
  { n: '04', t: 'Road Testing & Quality Checks', d: 'Real-world testing across load, RPM and temperature ranges.' },
  { n: '05', t: 'Customer Handover', d: 'Full walkthrough of results, aftercare and support included.' },
];

const FAQS = [
  { q: 'Is remapping safe?', a: 'When performed by professionals using tolerance-tested files, remapping is safe and reliable. All SRX Performance calibrations remain well within OEM safety margins.' },
  { q: 'Will it improve fuel economy?', a: 'Yes — particularly on diesels and modern turbo petrols. Improved combustion efficiency generally results in 5–15% better MPG when driven normally.' },
  { q: 'Can the vehicle be returned to standard?', a: 'Absolutely. We keep a full backup of your original file and can restore it at any time.' },
  { q: 'How long does it take?', a: 'A typical Stage 1 remap takes 60–90 minutes including diagnostics and road testing.' },
  { q: 'Do you health check the vehicle first?', a: 'Yes. Every vehicle receives a full diagnostic health check before any calibration work is carried out.' },
  { q: 'How much does a Stage 1 remap cost?', a: 'Pricing depends on your specific vehicle, engine and requested service. Enter your registration on our Performance Calculator or send us an enquiry for a tailored quote \u2014 we\u2019re transparent, competitive and never charge for extras you don\u2019t need.' },
  { q: 'Will it damage my engine?', a: 'Not when calibrated correctly. We tune within manufacturer safety limits and refuse work on vehicles where doing so is not viable.' },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(0);
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-20 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={HERO_IMG} alt="Gold-wrapped Lamborghini Aventador — SRX Performance" fill priority className="object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/40 to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/55 to-transparent" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-32 lg:pt-36 lg:pb-44">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, ease: [.2,.8,.2,1] }} className="max-w-3xl">
            <span className="section-eyebrow">Cardiff · Established Expertise</span>
            <h1 className="font-display text-[44px] leading-[1.05] sm:text-6xl lg:text-7xl font-medium text-neutral-900 mt-6">
              Unlock Your Vehicle&apos;s <span className="gold-gradient-text">True Performance</span>
            </h1>
            <p className="mt-7 text-lg lg:text-xl text-neutral-700 max-w-2xl leading-relaxed">
              Professional ECU Remapping and Performance Software designed to increase power, improve drivability and maximise efficiency.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/calculator" onClick={() => trackEvent(Events.checkVehicle, { location: 'hero' })} className="btn-gold px-8 py-4 rounded-full font-semibold text-sm tracking-wide inline-flex items-center gap-2 justify-center">
                Check My Vehicle <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contact" onClick={() => trackEvent(Events.quoteRequest, { location: 'hero' })} className="px-8 py-4 rounded-full font-semibold text-sm tracking-wide border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition inline-flex items-center gap-2 justify-center bg-white/70 backdrop-blur">
                Get a Free Quote
              </Link>
            </div>
            <div className="mt-14 flex flex-wrap gap-8 lg:gap-12 text-sm text-neutral-700">
              <div className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 gold-text" /> OEM-grade calibrations</div>
              <div className="flex items-center gap-2"><Sparkles className="w-4 h-4 gold-text" /> Custom bespoke files</div>
              <div className="flex items-center gap-2"><Star className="w-4 h-4 gold-text" /> Aftercare included</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">Our Services</span>
              <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4">Precision-Engineered Performance</h2>
              <p className="mt-4 text-neutral-600">From subtle refinement to race-grade recalibrations, every service is delivered with uncompromising attention to detail.</p>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES_PREVIEW.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08}>
                <Link href="/services" className="luxury-card p-8 block h-full">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#B8862B] to-[#E5C97A] text-white flex items-center justify-center mb-6">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">{s.title}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
                    <span className="text-neutral-500 flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {s.time}</span>
                    <span className="gold-text font-semibold">Learn more →</span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-900 border-b border-neutral-300 pb-1 hover:gold-text hover:border-[hsl(var(--gold))] transition">View all services <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">Why Choose SRX Performance</span>
              <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4">A New Standard of Trust</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REASONS.map((r, i) => (
              <Reveal key={r.t} delay={i * 0.06}>
                <div className="luxury-card p-8 h-full">
                  <r.icon className="w-8 h-8 gold-text" />
                  <h3 className="mt-5 text-lg font-semibold text-neutral-900">{r.t}</h3>
                  <p className="mt-2 text-sm text-neutral-600 leading-relaxed">{r.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS TIMELINE */}
      <section className="py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="section-eyebrow">Our Process</span>
              <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4">Meticulous. Methodical. Refined.</h2>
            </div>
          </Reveal>
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-[hsl(var(--gold))] to-transparent" />
            <div className="space-y-10">
              {PROCESS.map((p, i) => (
                <Reveal key={p.n} delay={i * 0.08}>
                  <div className={`md:grid md:grid-cols-2 md:gap-16 items-center ${i % 2 === 0 ? '' : 'md:[&>div:first-child]:order-2'}`}>
                    <div className={`${i % 2 === 0 ? 'md:text-right md:pr-10' : 'md:pl-10'}`}>
                      <div className="font-display gold-gradient-text text-6xl font-medium">{p.n}</div>
                      <h3 className="mt-2 text-2xl font-semibold text-neutral-900">{p.t}</h3>
                      <p className="mt-3 text-neutral-600 max-w-md md:inline-block">{p.d}</p>
                    </div>
                    <div className="hidden md:flex justify-center relative">
                      <div className="w-4 h-4 rounded-full bg-white border-2 border-[hsl(var(--gold))] shadow-md relative z-10" />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR CTA */}
      <section className="py-24 bg-neutral-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <Image src="https://images.unsplash.com/photo-1683638287438-7710b87ffb41?auto=format&fit=crop&w=2400&q=80" alt="" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-neutral-900/40" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div>
              <span className="section-eyebrow" style={{color:'#E5C97A'}}>Performance Calculator</span>
              <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4">See What Your Vehicle Can Really Do</h2>
              <p className="mt-5 text-neutral-300 max-w-lg">Enter your registration and see genuine Stage 1 estimates based on your engine’s factory specification — no gimmicks, no inflated numbers.</p>
              <Link href="/calculator" onClick={() => trackEvent(Events.checkVehicle, { location: 'home-cta' })} className="mt-8 btn-gold px-8 py-4 rounded-full font-semibold text-sm tracking-wide inline-flex items-center gap-2">
                Check My Vehicle <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="glass p-8 rounded-2xl text-neutral-900">
              <div className="text-xs tracking-[0.25em] uppercase text-neutral-500">Example — 2.0 TDI</div>
              <div className="mt-6">
                <div className="flex justify-between text-xs text-neutral-500 mb-2"><span>Factory Power</span><span>150 BHP</span></div>
                <div className="power-bar"><div className="power-bar-fill" style={{width:'60%'}} /></div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-neutral-500 mb-2"><span>Stage 1 Estimate</span><span className="font-semibold gold-text">192 BHP</span></div>
                <div className="power-bar"><div className="power-bar-fill gold" style={{width:'82%'}} /></div>
              </div>
              <div className="mt-6">
                <div className="flex justify-between text-xs text-neutral-500 mb-2"><span>Factory Torque</span><span>340 Nm</span></div>
                <div className="power-bar"><div className="power-bar-fill" style={{width:'62%'}} /></div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-xs text-neutral-500 mb-2"><span>Stage 1 Estimate</span><span className="font-semibold gold-text">440 Nm</span></div>
                <div className="power-bar"><div className="power-bar-fill gold" style={{width:'85%'}} /></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="section-eyebrow">Customer Reviews</span>
              <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4">Trusted by Discerning Drivers</h2>
            </div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { text: "Thank you so much bro, I've had maps done in the past never had such good service though \ud83e\udd23. Appreciate the quick service and the quality map as well feels like a new car defo coming back to you!" },
              { text: "Very professional, friendly guy who sorted my car out the same day I messaged! Thank you, will be a returning customer." },
              { text: "Honestly man cannot thank you enough unreal job im well happy with it. Already had so many people asking about it so ive already recommended you to a few mates and family too. Anything i need done now il be back soon enough. Top man too made me feel like my car was in good hands before he even started." },
              { text: "Thank you so much for going above and beyond helping me get my car sorted, I'll definitely recommend you to my close friends and family, feel at ease now that everything is sorted, great service !!" },
            ].map((r, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="luxury-card p-8 h-full flex flex-col">
                  <div className="flex gap-1 gold-text">{[...Array(5)].map((_,j)=>(<Star key={j} className="w-4 h-4 fill-current" />))}</div>
                  <p className="mt-5 text-neutral-700 leading-relaxed italic flex-1">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center gap-2 text-xs text-neutral-500">
                    <Instagram className="w-3.5 h-3.5 gold-text" />
                    <span>Verified customer from Instagram</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="text-center mb-14">
              <span className="section-eyebrow">FAQ</span>
              <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4">Answers, Not Assumptions</h2>
            </div>
          </Reveal>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="luxury-card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? -1 : i)} className="w-full flex items-center justify-between p-6 text-left">
                  <span className="font-semibold text-neutral-900">{f.q}</span>
                  <ChevronDown className={`w-5 h-5 gold-text transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-6 text-neutral-600 leading-relaxed border-t border-neutral-100 pt-4">{f.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">
              <div>
                <span className="section-eyebrow">On Instagram</span>
                <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4">@srx.performance</h2>
                <p className="mt-3 text-neutral-600 max-w-xl">Follow our latest builds, dyno results and behind-the-scenes work in Cardiff.</p>
              </div>
              <a href="https://instagram.com/srx.performance" target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2">
                <Instagram className="w-4 h-4" /> Follow
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              'https://customer-assets.emergentagent.com/job_vehicle-calibration/artifacts/1y749e74_Screenshot%202026-07-05%20at%2017-35-52%20SRX%20performance%20%28%40srx.performance%29%20%E2%80%A2%20Instagram%20photos%20and%20videos.png',
              'https://customer-assets.emergentagent.com/job_vehicle-calibration/artifacts/u783f207_Screenshot%202026-07-05%20at%2017-35-57%20SRX%20performance%20%28%40srx.performance%29%20%E2%80%A2%20Instagram%20photos%20and%20videos.png',
              'https://customer-assets.emergentagent.com/job_vehicle-calibration/artifacts/y4ivel38_Screenshot%202026-07-05%20at%2017-36-03%20SRX%20performance%20%28%40srx.performance%29%20%E2%80%A2%20Instagram%20photos%20and%20videos.png',
              'https://customer-assets.emergentagent.com/job_vehicle-calibration/artifacts/a9odrkbn_Screenshot%202026-07-05%20at%2017-36-11%20SRX%20performance%20%28%40srx.performance%29%20%E2%80%A2%20Instagram%20photos%20and%20videos.png',
            ].map((src, i) => (
              <a key={i} href="https://instagram.com/srx.performance" target="_blank" rel="noopener noreferrer" className="relative aspect-square rounded-xl overflow-hidden group">
                <Image src={src} alt="SRX Performance Instagram post" fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center">
                  <Instagram className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition" />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* TIKTOK */}
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="luxury-card p-8 lg:p-12 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[hsl(var(--gold))] opacity-10 blur-3xl" />
              <div className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full bg-neutral-900 opacity-[0.04] blur-3xl" />
              <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <span className="section-eyebrow">On TikTok</span>
                  <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4 flex items-center gap-3 flex-wrap">
                    <span>@srxperformance</span>
                    <svg viewBox="0 0 24 24" className="w-9 h-9 lg:w-11 lg:h-11" aria-hidden="true">
                      <defs>
                        <linearGradient id="tt-gold" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0" stopColor="#B8862B" />
                          <stop offset=".5" stopColor="#E5C97A" />
                          <stop offset="1" stopColor="#B8862B" />
                        </linearGradient>
                      </defs>
                      <path fill="url(#tt-gold)" d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                    </svg>
                  </h2>
                  <p className="mt-4 text-neutral-600 max-w-xl leading-relaxed">Watch remaps, dyno pulls, and behind-the-scenes clips from the SRX Performance workshop. Real cars. Real results. Straight from Cardiff.</p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a href="https://www.tiktok.com/@srxperformance" target="_blank" rel="noopener noreferrer" className="btn-gold px-6 py-3 rounded-full font-semibold text-sm inline-flex items-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                      </svg>
                      Follow on TikTok
                    </a>
                    <a href="https://www.tiktok.com/@srxperformance" target="_blank" rel="noopener noreferrer" className="px-6 py-3 rounded-full font-semibold text-sm border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition inline-flex items-center gap-2">
                      Watch Latest Videos
                    </a>
                  </div>
                </div>
                <div className="hidden lg:flex flex-col items-center justify-center gap-4 pl-8 border-l border-neutral-200">
                  <div className="relative w-32 h-32">
                    <Image
                      src={LOGO_URL}
                      alt="SRX Performance"
                      fill
                      sizes="128px"
                      className="object-contain mix-blend-multiply"
                      style={{
                        WebkitMaskImage: 'radial-gradient(ellipse 82% 70% at center, black 62%, transparent 100%)',
                        maskImage: 'radial-gradient(ellipse 82% 70% at center, black 62%, transparent 100%)',
                      }}
                    />
                  </div>
                  <div className="text-center">
                    <div className="text-xs tracking-[0.25em] uppercase text-neutral-500">Follow</div>
                    <div className="text-sm font-semibold text-neutral-900 mt-1">@srxperformance</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="luxury-card p-10 lg:p-16 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[hsl(var(--gold))] opacity-10 blur-3xl" />
            <span className="section-eyebrow">Ready to Begin?</span>
            <h2 className="font-display text-4xl lg:text-5xl font-medium mt-4">Request Your Personalised Quote</h2>
            <p className="mt-4 text-neutral-600 max-w-xl mx-auto">Fast response, honest advice and calibrations designed around your vehicle — not templated files.</p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" onClick={() => trackEvent(Events.quoteRequest, { location: 'home-final' })} className="btn-gold px-8 py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2 justify-center">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
              <a href="tel:+447919012892" onClick={() => trackEvent(Events.phoneClick, { location: 'home-final' })} className="px-8 py-4 rounded-full font-semibold text-sm border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition inline-flex items-center gap-2 justify-center"><Phone className="w-4 h-4" /> 07919 012892</a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
