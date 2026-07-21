# SRX Performance

Premium ECU remapping & vehicle performance website. Built with Next.js 15 (App Router), Tailwind CSS, shadcn/ui, Framer Motion and MongoDB.

## 🚀 Deploy to Vercel

1. **Push this repo to GitHub.**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/srx-performance.git
   git push -u origin main
   ```

2. **Import into Vercel** at https://vercel.com/new. Framework preset auto-detects as **Next.js**.

3. **Add ONE environment variable in Vercel** (Project → Settings → Environment Variables):

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | your Resend key (e.g. `re_...`) |

   Everything else — Mongo URL, Google Ads IDs, conversion labels — is already in the committed `.env` file and works out of the box.

4. **Click Deploy.** ✅

### Optional overrides via Vercel env vars

If you ever want to change a value without touching the code, just add the same variable name in Vercel's dashboard — Vercel env vars override `.env` values.

Common overrides:
- `NEXT_PUBLIC_BASE_URL` → your live domain (e.g. `https://srxperformance.co.uk`)
- `MONGO_URL` → your MongoDB Atlas connection string (required for Vercel serverless)
- `RESEND_FROM_EMAIL` → verified sender once you own the domain in Resend

⚠️ `NEXT_PUBLIC_*` variables are baked at build time. If you add/change any, click **Redeploy** in Vercel for changes to take effect.

---

## 🗄 MongoDB on Vercel

Vercel is serverless — `mongodb://localhost:27017` will not work in production. Use **MongoDB Atlas** (free tier at https://www.mongodb.com/atlas):

1. Create a free cluster.
2. Whitelist Vercel's outbound IPs (or set `0.0.0.0/0` for simplicity).
3. Create a database user.
4. Copy the connection string → add it to Vercel as `MONGO_URL`.

---

## 🖥 Local development

```bash
yarn install
yarn dev     # http://localhost:3000
```

To test emails locally, add your Resend key to `.env`:
```bash
RESEND_API_KEY=re_your_key_here
```
(**Do not commit that change** — remove the value before pushing.)

Production build:
```bash
yarn build && yarn start
```

---

## 📁 Project structure

```
app/
  page.js                Home
  services/page.js       Services
  calculator/page.js     Performance calculator + lead capture
  about/page.js          About
  contact/page.js        Contact form
  privacy/page.js        Privacy Policy
  terms/page.js          Terms & Conditions
  layout.js              Root layout + Google tag
  api/[[...path]]/route.js   Backend (vehicle lookup, lead, contact)
components/site/         Navbar, Footer, Logo, Reveal
components/ui/           shadcn primitives
lib/
  analytics.js           Google Ads + GA4 event/conversion helpers
  vehicle-service.js     Pluggable UK vehicle lookup adapters
  vehicle-estimator.js   Realistic Stage 1 gain calculation
```

---

## 📊 Analytics & Conversions

Base Google tag installed on every page:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-18261047881"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'AW-18261047881');
</script>
```

Two Google Ads conversions fire automatically:

| Conversion | Label | Fires on |
|---|---|---|
| Lead / Book Appointment | `ylSRCMX6jcMcEMn0xYNE` | Successful Contact form or Calculator lead submission |
| Click to Call | `vh5rCMKO1tMcEMn0xYNE` | Any phone number click |

Engagement events for GA4/GTM: `check_my_vehicle_click`, `quote_request_click`, `phone_number_click`, `email_link_click`, `vehicle_lookup`, `contact_form_submit`, `lead_capture_submit`.

---

## 🔐 Security

- The `.env` file only contains non-secret config (Mongo URL for local dev, Google Ads IDs, etc.).
- **`RESEND_API_KEY` is intentionally blank** in `.env` — it's set only in Vercel's dashboard so it never enters the repo.
- If you ever add another secret (payment gateway, private API key), do the same: leave it blank in `.env` and set it in Vercel.
- Never prefix server-only secrets with `NEXT_PUBLIC_` — that would expose them to the browser.
