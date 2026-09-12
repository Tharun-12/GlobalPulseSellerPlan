import { useState, useCallback } from 'react';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { BenefitsSection } from '@/components/BenefitsSection';
import { AudienceSection } from '@/components/AudienceSection';
import { WhyPlanSection } from '@/components/WhyPlanSection';
import { WhyGlobPulseSection } from '@/components/WhyGlobPulseSection';
import { PlatformVideo } from '@/components/PlatformVideo';
import { PlatformScreenshots } from '@/components/PlatformScreenshots';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { TrustSection } from '@/components/TrustSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { PlanSummary } from '@/components/PlanSummary';
import { FAQSection } from '@/components/FAQSection';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';
import { CheckoutModal } from '@/components/CheckoutModal';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';
import BannerSection from './components/BannerSection';

function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleGetStarted = useCallback(() => {
    setCheckoutOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header onGetStarted={handleGetStarted} />
      <main>
        <BannerSection />
        <HeroSection onGetStarted={handleGetStarted} />
        <BenefitsSection onGetStarted={handleGetStarted} />
        <AudienceSection />
        <WhyPlanSection />
        <WhyGlobPulseSection />
        <PlatformVideo />
        <PlatformScreenshots />
        <TestimonialsSection />
        <TrustSection />
        <HowItWorksSection />
        <PlanSummary onGetStarted={handleGetStarted} />
        <FAQSection />
        <FinalCTA onGetStarted={handleGetStarted} />
      </main>
      <Footer onGetStarted={handleGetStarted} />
      <MobileStickyCTA onGetStarted={handleGetStarted} />
      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}

export default App;
