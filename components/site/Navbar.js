'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo';
import { trackEvent, Events } from '@/lib/analytics';

const NAV = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/calculator', label: 'Performance Calculator' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/85 backdrop-blur-lg border-b border-neutral-200/70' : 'bg-white/40 backdrop-blur-md'}`}>
      <div className="max-w-7xl mx-auto px-5 lg:px-10 h-20 flex items-center justify-between">
        <Logo size={56} />
        <nav className="hidden lg:flex items-center gap-9">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} className={`text-[13px] tracking-wide font-medium transition-colors relative ${active ? 'gold-text' : 'text-neutral-700 hover:text-black'}`}>
                {item.label}
                {active && <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-[hsl(var(--gold))]" />}
              </Link>
            );
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:+447919012892" onClick={() => trackEvent(Events.phoneClick, { location: 'navbar' })} className="flex items-center gap-2 text-[13px] font-medium text-neutral-800 hover:gold-text transition">
            <Phone className="w-4 h-4" /> 07919 012892
          </a>
          <Link href="/contact" onClick={() => trackEvent(Events.quoteRequest, { location: 'navbar' })} className="btn-gold px-5 py-2.5 rounded-full text-[13px] font-semibold">
            Get a Quote
          </Link>
        </div>
        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-white border-t border-neutral-200">
          <nav className="px-6 py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`text-sm font-medium ${pathname === item.href ? 'gold-text' : 'text-neutral-800'}`}>{item.label}</Link>
            ))}
            <a href="tel:+447919012892" onClick={() => { trackEvent(Events.phoneClick, { location: 'mobile-menu' }); setOpen(false); }} className="text-sm font-medium text-neutral-800 flex items-center gap-2">
              <Phone className="w-4 h-4" /> 07919 012892
            </a>
            <Link href="/contact" onClick={() => { trackEvent(Events.quoteRequest, { location: 'mobile-menu' }); setOpen(false); }} className="btn-gold px-5 py-3 rounded-full text-sm font-semibold text-center">Get a Quote</Link>
          </nav>
        </div>
      )}
    </header>
  );
}
