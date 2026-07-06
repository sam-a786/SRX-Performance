import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';

export const metadata = { title: 'Terms & Conditions' };

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <span className="section-eyebrow">Legal</span>
          <h1 className="font-display text-5xl font-medium mt-5">Terms &amp; Conditions</h1>
          <div className="prose prose-neutral mt-8 text-neutral-700 leading-relaxed space-y-6">
            <h2 className="text-xl font-semibold text-neutral-900">1. Services</h2>
            <p>SRX Performance provides ECU remapping, performance calibration and diagnostic services. All work is performed to industry standards. Estimated performance figures displayed on this website are indicative and may vary based on hardware, condition and driving style.</p>
            <h2 className="text-xl font-semibold text-neutral-900">2. Off-Road Solutions</h2>
            <p>DPF, EGR, AdBlue delete and similar solutions are strictly for off-road, motorsport or export vehicles. It is the customer&rsquo;s responsibility to ensure legal compliance in their jurisdiction.</p>
            <h2 className="text-xl font-semibold text-neutral-900">3. Insurance</h2>
            <p>Modifications must be declared to your insurer. SRX Performance is not liable for insurance-related consequences.</p>
            <h2 className="text-xl font-semibold text-neutral-900">4. Warranty</h2>
            <p>Our calibrations do not affect the mechanical warranty of your vehicle. Manufacturer warranties may be affected — please consult your vehicle manufacturer.</p>
            <h2 className="text-xl font-semibold text-neutral-900">5. Liability</h2>
            <p>Our liability is limited to the value of the service provided. We do not accept liability for consequential loss, including insurance claims or third-party damage.</p>
            <h2 className="text-xl font-semibold text-neutral-900">6. Cancellations</h2>
            <p>Appointments cancelled with less than 24 hours notice may be subject to a fee. Please contact us as early as possible to reschedule.</p>
            <h2 className="text-xl font-semibold text-neutral-900">7. Contact</h2>
            <p>Questions? Email <a href="mailto:performance.srx@gmail.com" className="gold-text">performance.srx@gmail.com</a>.</p>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
