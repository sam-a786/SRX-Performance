# SRX-Performance
Full-stack automotive business website focused on lead generation and customer enquiries. Built with Next.js, React and Tailwind CSS, featuring Google Ads integration, SEO optimisation, contact forms and a scalable foundation for future performance and vehicle data services.

Programming Languages
Language	Where it's used
JavaScript (ES2022)	All frontend pages, React components and the backend API route
JSX	React component markup (embedded in .js files)
CSS	Global styles in globals.css — using Tailwind directives + custom design tokens
HTML5	Semantic markup rendered by Next.js
JSON	package.json, structured data (Schema.org JSON-LD), API request/response payloads

⚙️ Frameworks & Libraries
Category	Tech
Framework	Next.js 15 (App Router)
UI Library	React 18
Styling	Tailwind CSS + shadcn/ui components
Animations	Framer Motion
Icons	Lucide React
Fonts	Google Fonts — Cormorant Garamond (display serif) + Inter (body)
Database driver	MongoDB Node.js driver
Email	Resend SDK

🗄️ Data & Services
Category	Tech
Database	MongoDB (collections: enquiries, leads, vehicle_lookups)
Transactional email	Resend
Ads/Analytics	Google Ads (gtag.js) — GTM & GA4 pre-wired for later
Vehicle lookup	Modular adapter layer (currently manual-entry mode, provider-ready)
