import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

export const metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <span className="section-eyebrow">Legal</span>
          <h1 className="font-display text-5xl font-medium mt-5">Privacy Policy</h1>
          <div className="prose prose-neutral mt-8 text-neutral-700 leading-relaxed space-y-6">
            <p>SRX Performance (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;) is committed to protecting your privacy. This policy explains how we collect, use and safeguard your information when you use our website.</p>
            <h2 className="text-xl font-semibold text-neutral-900">Information We Collect</h2>
            <p>We collect information you provide directly to us, such as when you complete our enquiry form (name, email, telephone, vehicle registration, vehicle make/model, requested service and your message). We also collect standard analytics data such as page views and interactions via Google Analytics.</p>
            <h2 className="text-xl font-semibold text-neutral-900">How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2"><li>To respond to your enquiries and provide quotes.</li><li>To improve our website and services.</li><li>To comply with legal obligations.</li></ul>
            <h2 className="text-xl font-semibold text-neutral-900">Cookies & Analytics</h2>
            <p>Our site uses Google Tag Manager, Google Analytics and Google Ads to measure performance and improve marketing. You can opt out via your browser settings.</p>
            <h2 className="text-xl font-semibold text-neutral-900">Data Retention</h2>
            <p>We retain enquiry data only for as long as necessary to respond to and fulfil your request, and for legitimate business records.</p>
            <h2 className="text-xl font-semibold text-neutral-900">Your Rights</h2>
            <p>Under UK GDPR you have the right to access, correct or request deletion of your personal data. To exercise these rights, email <a href="mailto:performance.srx@gmail.com" className="gold-text">performance.srx@gmail.com</a>.</p>
            <h2 className="text-xl font-semibold text-neutral-900">Contact</h2>
            <p>SRX Performance, Cardiff, United Kingdom — <a href="mailto:performance.srx@gmail.com" className="gold-text">performance.srx@gmail.com</a></p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
