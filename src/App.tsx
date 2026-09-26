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
import { AlreadyActive } from '@/components/auth/AlreadyActive';

import { validateSellerAuth } from '@/lib/sellerAuth';

function App() {
  const [checkoutOpen, setCheckoutOpen] =
    useState(false);

  const [activePopupOpen, setActivePopupOpen] = useState(false);

  const [isSellerLoggedIn, setIsSellerLoggedIn] =
    useState(false);

  const [hasActive999Package, setHasActive999Package] =
    useState(false);

  const [checkingSellerStatus, setCheckingSellerStatus] =
    useState(true);

  const checkSellerStatus = useCallback(async () => {
    setCheckingSellerStatus(true);

    try {
      console.log(
        '🔎 App: validating seller session...'
      );

      const result = await validateSellerAuth();

      console.log(
        '👤 App: seller authenticated:',
        result.authenticated
      );

      console.log(
        '📦 App: ₹999 package active:',
        result.packageActive
      );

      setIsSellerLoggedIn(
        result.authenticated
      );

      setHasActive999Package(
        result.packageActive
      );
    } catch (error) {
      console.error(
        '❌ App: seller session check failed:',
        error
      );

      setIsSellerLoggedIn(false);
      setHasActive999Package(false);
    } finally {
      setCheckingSellerStatus(false);
    }
  }, []);

  const getLoggedInSellerName = useCallback(() => {
  try {
    const savedSeller = localStorage.getItem(
      'globpulse_seller'
    );

    if (!savedSeller) {
      return 'there';
    }

    const seller = JSON.parse(savedSeller);

    return (
      seller?.fullName ||
      seller?.name ||
      seller?.businessName ||
      'there'
    );
  } catch {
    return 'there';
  }
}, []);

const handleSellerDashboardClick = useCallback(() => {
  if (checkingSellerStatus) {
    return;
  }

  if (
    isSellerLoggedIn &&
    hasActive999Package
  ) {
    setActivePopupOpen(true);
    return;
  }

  // If the package is not active,
  // open the normal checkout flow.
  setCheckoutOpen(true);
}, [
  checkingSellerStatus,
  isSellerLoggedIn,
  hasActive999Package,
]);

  /*
   * Initial server-side session check
   */
  useEffect(() => {
    checkSellerStatus();
  }, [checkSellerStatus]);

  /*
   * React to login/logout changes
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
   * Re-check when user returns to landing page
   */
  useEffect(() => {
    const handleFocus = () => {
      checkSellerStatus();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        checkSellerStatus();
      }
    };

    window.addEventListener(
      'focus',
      handleFocus
    );

    document.addEventListener(
      'visibilitychange',
      handleVisibilityChange
    );

    return () => {
      window.removeEventListener(
        'focus',
        handleFocus
      );

      document.removeEventListener(
        'visibilitychange',
        handleVisibilityChange
      );
    };
  }, [checkSellerStatus]);

  /*
   * Background session check every 30 seconds
   */
  useEffect(() => {
    const interval = window.setInterval(() => {
      checkSellerStatus();
    }, 30000);

    return () => {
      window.clearInterval(interval);
    };
  }, [checkSellerStatus]);

const goToSellerDashboard = useCallback(async () => {
  const apiUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
  const token = localStorage.getItem('globpulse_seller_token');

  if (!apiUrl) {
    console.error('VITE_API_URL is not configured.');
    return;
  }

  if (!token) {
    console.error('Seller API token is missing.');
    window.location.href = `${apiUrl}/seller/login`;
    return;
  }

  try {
    console.log('🔐 Creating Laravel seller web session...');

    const response = await fetch(`${apiUrl}/seller/session-bridge`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    console.log('🔐 Session bridge response:', data);

    if (!response.ok || !data.status) {
      console.error('❌ Session bridge failed:', data);
      return;
    }

    console.log('✅ Laravel web session created.');
    console.log('➡️ Redirecting to:', data.redirect);

    window.location.href = data.redirect || `${apiUrl}/seller/dashboard`;
  } catch (error) {
    console.error('❌ Session bridge error:', error);
  }
}, []);

const handleGetStarted = useCallback(() => {
  setCheckoutOpen(true);
}, []);

  const handleCheckoutClose = useCallback(() => {
    setCheckoutOpen(false);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
     <Header
  onGetStarted={handleGetStarted}
  onDashboardClick={handleSellerDashboardClick}
/>

      <main>
        <BannerSection />

      <HeroSection
  onGetStarted={handleGetStarted}
  onDashboardClick={handleSellerDashboardClick}
  hasActive999Package={hasActive999Package}
/>

 {/* <PlatformVideo /> */}

        <BenefitsSection
          onGetStarted={handleGetStarted}
           onDashboardClick={handleSellerDashboardClick}
          hasActive999Package={
            hasActive999Package
          }
        />

        <AudienceSection />

        <WhyPlanSection />

        <WhyGlobPulseSection />

       

        {/* <PlatformScreenshots /> */}

        <TestimonialsSection />

        <TrustSection />

        <HowItWorksSection />

        <PlanSummary
          onGetStarted={handleGetStarted}
          onDashboardClick={handleSellerDashboardClick}
          hasActive999Package={
            hasActive999Package
          }
        />

        <FAQSection />

        <FinalCTA
          onGetStarted={handleGetStarted}
           onDashboardClick={handleSellerDashboardClick}
          hasActive999Package={
            hasActive999Package
          }
        />
      </main>

      <Footer
        onGetStarted={handleGetStarted}
         onDashboardClick={handleSellerDashboardClick}
        hasActive999Package={
          hasActive999Package
        }
      />

      <MobileStickyCTA
        onGetStarted={handleGetStarted}
         onDashboardClick={handleSellerDashboardClick}
        hasActive999Package={
          hasActive999Package
        }
      />

      {activePopupOpen && (
  <div
    className="
      fixed
      inset-0
      z-[100]
      flex
      items-center
      justify-center
      bg-black/60
      px-4
    "
    onClick={() => setActivePopupOpen(false)}
  >
    <div
  className="
    w-full
    max-w-md
    rounded-2xl
    bg-white
    p-6
    shadow-2xl
    sm:p-7
  "
  onClick={(event) => {
    event.stopPropagation();
  }}
>
   <AlreadyActive
  sellerName={getLoggedInSellerName()}
  onContinue={goToSellerDashboard}
/>
    </div>
  </div>
)}

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={handleCheckoutClose}
      />
    </div>
  );
}

export default App;