import { useState, useCallback, useEffect } from 'react';

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
import { CheckoutModal } from './components/CheckoutModal';
import { MobileStickyCTA } from '@/components/MobileStickyCTA';
import BannerSection from './components/BannerSection';

import {
  getSellerPackage,
  is999PlanActive,
} from '@/lib/sellerApi';


const SELLER_TOKEN_KEY = 'globpulse_seller_token';


function App() {
  /*
   * =============================================================
   * CHECKOUT MODAL
   * =============================================================
   */

  const [checkoutOpen, setCheckoutOpen] =
    useState(false);


  /*
   * =============================================================
   * SELLER STATUS
   * =============================================================
   */

  const [isSellerLoggedIn, setIsSellerLoggedIn] =
    useState(() => {
      return Boolean(
        localStorage.getItem(
          SELLER_TOKEN_KEY
        )
      );
    });


  const [hasActive999Package, setHasActive999Package] =
    useState(false);


  const [checkingSellerStatus, setCheckingSellerStatus] =
    useState(() => {
      return Boolean(
        localStorage.getItem(
          SELLER_TOKEN_KEY
        )
      );
    });


  /*
   * =============================================================
   * CHECK SELLER PACKAGE
   * =============================================================
   */

  const checkSellerStatus = useCallback(
    async () => {

      const token =
        localStorage.getItem(
          SELLER_TOKEN_KEY
        );


      /*
       * No seller login
       */

      if (!token) {

        setIsSellerLoggedIn(false);

        setHasActive999Package(false);

        setCheckingSellerStatus(false);

        return;
      }


      /*
       * Seller is logged in
       */

      setIsSellerLoggedIn(true);

      setCheckingSellerStatus(true);


      try {

        console.log(
          '🔎 App: checking seller package...'
        );


        const packageResponse =
          await getSellerPackage();


        const packageActive =
          is999PlanActive(
            packageResponse
          );


        console.log(
          '📦 App: ₹999 package active:',
          packageActive
        );


        setHasActive999Package(
          packageActive
        );

      } catch (error) {

        /*
         * Seller has no package yet,
         * or package is not active.
         */

        console.log(
          'ℹ️ App: seller does not have an active ₹999 package.',
          error
        );


        setHasActive999Package(false);

      } finally {

        setCheckingSellerStatus(false);

      }

    },
    []
  );


  /*
   * =============================================================
   * INITIAL STATUS CHECK
   * =============================================================
   */

  useEffect(() => {

    checkSellerStatus();

  }, [checkSellerStatus]);


  /*
   * =============================================================
   * LISTEN FOR LOGIN / LOGOUT / PACKAGE CHANGES
   * =============================================================
   */

  useEffect(() => {

    const handleAuthChanged = () => {

      checkSellerStatus();

    };


    window.addEventListener(
      'globpulse-auth-changed',
      handleAuthChanged
    );


    window.addEventListener(
      'storage',
      handleAuthChanged
    );


    return () => {

      window.removeEventListener(
        'globpulse-auth-changed',
        handleAuthChanged
      );


      window.removeEventListener(
        'storage',
        handleAuthChanged
      );

    };

  }, [checkSellerStatus]);


  /*
   * =============================================================
   * GO TO SELLER DASHBOARD
   * =============================================================
   */

  const goToSellerDashboard = useCallback(() => {

    const apiUrl =
      (import.meta.env.VITE_API_URL || '')
        .replace(/\/$/, '');


    if (!apiUrl) {

      console.error(
        'VITE_API_URL is not configured.'
      );

      return;

    }


    window.location.href =
      `${apiUrl}/seller/dashboard`;

  }, []);


  /*
   * =============================================================
   * GET STARTED / CTA ACTION
   * =============================================================
   *
   * Active seller:
   *     → Laravel dashboard
   *
   * No active package:
   *     → ₹999 checkout modal
   *
   * =============================================================
   */

  const handleGetStarted = useCallback(() => {

    if (
      isSellerLoggedIn &&
      hasActive999Package &&
      !checkingSellerStatus
    ) {

      goToSellerDashboard();

      return;

    }


    setCheckoutOpen(true);

  }, [
    isSellerLoggedIn,
    hasActive999Package,
    checkingSellerStatus,
    goToSellerDashboard,
  ]);


  /*
   * =============================================================
   * CLOSE CHECKOUT
   * =============================================================
   */

  const handleCheckoutClose = useCallback(() => {

    setCheckoutOpen(false);

  }, []);


  /*
   * =============================================================
   * RENDER
   * =============================================================
   */

  return (

    <div className="min-h-screen bg-white overflow-x-hidden">

      <Header
        onGetStarted={handleGetStarted}
      />


      <main>

        <BannerSection />


        <HeroSection
          onGetStarted={handleGetStarted}
          hasActive999Package={hasActive999Package}
        />


        <BenefitsSection
          onGetStarted={handleGetStarted}
          hasActive999Package={hasActive999Package}
        />


        <AudienceSection />


        <WhyPlanSection />


        <WhyGlobPulseSection />


        <PlatformVideo />


        <PlatformScreenshots />


        <TestimonialsSection />


        <TrustSection />


        <HowItWorksSection />


        <PlanSummary
          onGetStarted={handleGetStarted}
          hasActive999Package={hasActive999Package}
        />


        <FAQSection />


        <FinalCTA
          onGetStarted={handleGetStarted}
          hasActive999Package={hasActive999Package}
        />

      </main>


      <Footer
        onGetStarted={handleGetStarted}
        hasActive999Package={hasActive999Package}
      />


      <MobileStickyCTA
        onGetStarted={handleGetStarted}
        hasActive999Package={hasActive999Package}
      />


      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={handleCheckoutClose}
      />

    </div>

  );
}


export default App;