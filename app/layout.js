import './globals.css';
import Script from 'next/script';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://srxperformance.co.uk';
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || '';
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID || '';
const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID || '';
// The first available Google tag ID is used to load gtag.js. Any additional
// IDs are registered via gtag('config', ...) so all three can co-exist.
const PRIMARY_GTAG = GADS_ID || GA4_ID || '';

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SRX Performance | Premium ECU Remapping & Performance Software – Cardiff',
    template: '%s | SRX Performance',
  },
  description: 'Professional ECU Remapping, Stage 1, Stage 2 & Stage 3 tuning, DPF, EGR & AdBlue solutions in Cardiff. Unlock your vehicle\'s true performance with SRX Performance.',
  keywords: ['ECU Remapping', 'Stage 1 Remap', 'Stage 2 Remap', 'Stage 3 Remap', 'Performance Remapping', 'DPF Delete', 'EGR Delete', 'AdBlue Delete', 'Vehicle Diagnostics', 'Car Remapping Cardiff', 'Car Remapping Near Me', 'SRX Performance'],
  openGraph: {
    title: 'SRX Performance | Premium ECU Remapping',
    description: 'Unlock your vehicle\'s true performance with professional ECU remapping and performance software in Cardiff.',
    url: SITE_URL,
    siteName: 'SRX Performance',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SRX Performance | Premium ECU Remapping',
    description: 'Professional ECU Remapping and Performance Software in Cardiff.',
  },
  robots: { index: true, follow: true },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'AutomotiveBusiness',
  name: 'SRX Performance',
  image: `${SITE_URL}/logo.png`,
  telephone: '+44 7919 012892',
  email: 'performance.srx@gmail.com',
  url: SITE_URL,
  address: { '@type': 'PostalAddress', addressLocality: 'Cardiff', addressCountry: 'GB' },
  openingHours: 'Mo-Su By Appointment',
  priceRange: '££',
  sameAs: ['https://instagram.com/srx.performance'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">{`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');
          `}</Script>
        )}
        {PRIMARY_GTAG && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${PRIMARY_GTAG}`} strategy="afterInteractive" />
            <Script id="gtag-base" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              ${GA4_ID ? `gtag('config', '${GA4_ID}');` : ''}
              ${GADS_ID ? `gtag('config', '${GADS_ID}');` : ''}
            `}</Script>
          </>
        )}
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {GTM_ID && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
          </noscript>
        )}
        {children}
      </body>
    </html>
  );
}
