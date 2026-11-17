import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/site/Navbar';
import Footer from '@/components/site/Footer';
import { ReviewFullPage } from '@/components/site/ReviewWidgets';

export const metadata = {
  title: 'Customer Reviews',
  description: 'Read genuine customer reviews of SRX Performance — premium ECU remapping and performance software in Cardiff.',
  alternates: { canonical: '/reviews' },
};

const ReviewsPage = () => {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-12">
        <div className="max-w-4xl mx-auto px-6 lg:px-10 text-center">
          <span className="section-eyebrow">Testimonials</span>
          <h1 className="font-display text-5xl lg:text-6xl font-medium mt-5">What Our Customers Say</h1>
          <p className="mt-6 text-lg text-neutral-600 leading-relaxed">Genuine, verified reviews from drivers who trusted SRX Performance with their vehicle.</p>
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <ReviewFullPage className="min-h-[400px]" />
        </div>
      </section>
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <div className="luxury-card p-10 lg:p-14 text-center">
            <span className="section-eyebrow">Join Them</span>
            <h2 className="font-display text-3xl lg:text-4xl font-medium mt-4">Ready to unlock your vehicle&apos;s potential?</h2>
            <Link href="/contact" className="mt-8 btn-gold px-8 py-4 rounded-full font-semibold text-sm inline-flex items-center gap-2" data-testid="reviews-cta">Get a Free Quote <ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ReviewsPage;
