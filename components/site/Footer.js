'use client';
import Link from 'next/link';
import { Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react';
import Logo from './Logo';
import { trackEvent, Events } from '@/lib/analytics';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-neutral-200 pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid md:grid-cols-4 gap-10">
          <div>
            <Logo size={72} showText={true} />
            <p className="mt-5 text-sm text-neutral-600 leading-relaxed max-w-xs">Premium ECU remapping and performance software. Precision-engineered calibrations for the modern driver.</p>
            <div className="mt-6 flex flex-col gap-2.5">
              <a href="https://instagram.com/srx.performance" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-[#E1306C] hover:opacity-80">
                <Instagram className="w-4 h-4" /> @srx.performance
              </a>
              <a href="https://www.tiktok.com/@srxperformance" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm gold-text hover:opacity-80">
                <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.1z"/>
                </svg>
                @srxperformance
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-5">Explore</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link href="/" className="hover:gold-text">Home</Link></li>
              <li><Link href="/services" className="hover:gold-text">Services</Link></li>
              <li><Link href="/calculator" className="hover:gold-text">Performance Calculator</Link></li>
              <li><Link href="/about" className="hover:gold-text">About</Link></li>
              <li><Link href="/contact" className="hover:gold-text">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-5">Legal</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li><Link href="/privacy" className="hover:gold-text">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:gold-text">Terms &amp; Conditions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-semibold tracking-[0.25em] uppercase text-neutral-900 mb-5">Contact</h4>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li className="flex items-start gap-2.5"><MapPin className="w-4 h-4 gold-text mt-0.5" /> Cardiff, United Kingdom</li>
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 gold-text mt-0.5" />
                <a href="tel:+447919012892" onClick={() => trackEvent(Events.phoneClick, { location: 'footer' })} className="hover:gold-text">+44 7919 012892</a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 gold-text mt-0.5" />
                <a href="mailto:performance.srx@gmail.com" onClick={() => trackEvent(Events.emailClick, { location: 'footer' })} className="hover:gold-text">performance.srx@gmail.com</a>
              </li>
              <li className="flex items-start gap-2.5"><Clock className="w-4 h-4 gold-text mt-0.5" /> By Appointment Only</li>
            </ul>
          </div>
        </div>
        <div className="gold-hairline my-10" />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} SRX Performance. All rights reserved.</p>
          <p className="tracking-wider uppercase">Cardiff · United Kingdom</p>
        </div>
      </div>
    </footer>
  );
}
