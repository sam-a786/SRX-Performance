'use client';
import Link from 'next/link';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import Reveal from '@/components/site/Reveal';
import { ShieldCheck, Sparkles, Target, Heart, ArrowRight } from 'lucide-react';
import { trackEvent, Events } from '@/lib/analytics';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <Reveal>
            <span className="section-eyebrow">About SRX Performance</span>
            <h1 className="font-display text-5xl lg:text-6xl font-medium mt-5">A New Standard in UK Performance Tuning</h1>
            <p className="mt-6 text-lg text-neutral-600 leading-relaxed">Based in Cardiff, SRX Performance is a specialist ECU remapping and vehicle performance studio dedicated to precision-engineered calibrations. Our work sits at the intersection of engineering, craftsmanship and driver experience.</p>
          </Reveal>
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-6">
          {[
            { icon: ShieldCheck, t: 'Integrity First', d: 'We only take on work we’re confident we can deliver to the highest standard. Full health checks precede every calibration.' },
            { icon: Sparkles, t: 'Custom-Built Files', d: 'Every map is bespoke to your exact vehicle, fuel, and driving style — never a templated file.' },
            { icon: Target, t: 'Measured Performance', d: 'Real-world logging and data validation ensure our results are honest, repeatable and reliable.' },
            { icon: Heart, t: 'Aftercare Included', d: 'Our relationship doesn’t end at handover. Fine-tuning and support are part of the service.' },
          ].map((v, i) => (
            <Reveal key={v.t} delay={i * 0.06}>
              <div className="luxury-card p-8 h-full">
                <v.icon className="w-8 h-8 gold-text" />
                <h3 className="mt-5 text-xl font-semibold">{v.t}</h3>
                <p className="mt-2 text-neutral-600 leading-relaxed">{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="luxury-card p-10 lg:p-14 text-center">
            <span className="section-eyebrow">Ready to Work With Us?</span>
            <h2 className="font-display text-3xl lg:text-4xl font-medium mt-4">Book a consultation today.</h2>
            <Link href="/contact" onClick={() => trackEvent(Events.quoteRequest, { location: 'about' })} className="mt-8 btn-gold px-8 py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2">Enquire Now <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
