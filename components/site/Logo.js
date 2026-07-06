import Link from 'next/link';
import Image from 'next/image';

// Official SRX Performance logo.
export const LOGO_URL = 'https://customer-assets.emergentagent.com/job_vehicle-calibration/artifacts/gqkc99hi_WhatsApp%20Image%202026-06-22%20at%2001.04.29.jpeg';

export default function Logo({ className = '', size = 56, showText = false }) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 group ${className}`}
      aria-label="SRX Performance home"
    >
      <div
        className="relative shrink-0 transition-transform duration-300 group-hover:scale-105"
        style={{
          width: size,
          height: size,
          WebkitMaskImage: 'radial-gradient(ellipse 78% 66% at center, black 38%, rgba(0,0,0,0.6) 62%, transparent 96%)',
          maskImage: 'radial-gradient(ellipse 78% 66% at center, black 38%, rgba(0,0,0,0.6) 62%, transparent 96%)',
        }}
      >
        <Image
          src={LOGO_URL}
          alt="SRX Performance"
          fill
          priority
          sizes={`${size}px`}
          className="object-contain mix-blend-multiply"
        />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="text-lg font-bold tracking-wide text-neutral-900">SRX Performance</span>
          <span className="text-[10px] tracking-[0.28em] gold-text uppercase mt-1">Cardiff &middot; UK</span>
        </div>
      )}
    </Link>
  );
}
