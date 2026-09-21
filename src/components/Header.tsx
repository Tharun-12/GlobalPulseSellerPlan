import { useState, useEffect, useCallback } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { Menu, X } from 'lucide-react';

import { navLinks } from '@/data/content';

import { CTAButton } from '@/components/ui/CTAButton';

import {
  getSellerPackage,
  is999PlanActive,
} from '@/lib/sellerApi';

type HeaderProps = {
  onGetStarted: () => void;
  onDashboardClick: () => void;
};

const SELLER_TOKEN_KEY = 'globpulse_seller_token';

const API_URL =
  (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

export function Header({
  onGetStarted,
  onDashboardClick,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  const [mobileOpen, setMobileOpen] = useState(false);

  /*
   * =============================================================
   * SELLER AUTH / PACKAGE STATE
   * =============================================================
   */

  const [isSellerLoggedIn, setIsSellerLoggedIn] =
    useState(() => {
      return Boolean(
        localStorage.getItem(SELLER_TOKEN_KEY)
      );
    });

  const [hasActive999Package, setHasActive999Package] =
    useState(false);

  const [checkingSellerStatus, setCheckingSellerStatus] =
    useState(() => {
      return Boolean(
        localStorage.getItem(SELLER_TOKEN_KEY)
      );
    });


  /*
   * =============================================================
   * CHECK SELLER + PACKAGE STATUS
   * =============================================================
   */

  const checkSellerStatus = useCallback(async () => {
    const token =
      localStorage.getItem(SELLER_TOKEN_KEY);

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
        '🔎 Header: checking seller package...'
      );

      const packageResponse =
        await getSellerPackage();

      const packageActive =
        is999PlanActive(packageResponse);

      console.log(
        '📦 Header: ₹999 package active:',
        packageActive
      );

      setHasActive999Package(packageActive);
    } catch (error) {
      /*
       * 404 "Package not found" means the seller
       * does not have a package yet.
       *
       * Any other package error is also treated
       * conservatively as "not active", so we
       * never incorrectly show dashboard access.
       */
      console.log(
        'ℹ️ Header: seller has no active ₹999 package.',
        error
      );

      setHasActive999Package(false);
    } finally {
      setCheckingSellerStatus(false);
    }
  }, []);


  /*
   * =============================================================
   * INITIAL SELLER STATUS CHECK
   * =============================================================
   */

  useEffect(() => {
    checkSellerStatus();
  }, [checkSellerStatus]);


  /*
   * =============================================================
   * LISTEN FOR LOGIN / LOGOUT
   * =============================================================
   */

  useEffect(() => {
    const handleAuthChanged = () => {
      checkSellerStatus();
    };

    /*
     * Same-tab login/logout event
     */
    window.addEventListener(
      'globpulse-auth-changed',
      handleAuthChanged
    );

    /*
     * Another browser tab
     */
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
   * SCROLL
   * =============================================================
   */

  useEffect(() => {
    const handleScroll = () =>
      setScrolled(window.scrollY > 20);

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, []);


  /*
   * =============================================================
   * NAVIGATION
   * =============================================================
   */

  const handleNavClick = (href: string) => {
    setMobileOpen(false);

    const el = document.querySelector(href);

    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
      });
    }
  };





  /*
   * =============================================================
   * CTA
   *
   * Show dashboard ONLY when:
   *
   * Seller logged in
   * AND
   * ₹999 package is active
   * =============================================================
   */

  const showDashboardButton =
    isSellerLoggedIn &&
    hasActive999Package &&
    !checkingSellerStatus;


  return (
    <>
      {/* =========================================================
          HEADER
      ========================================================== */}

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-md shadow-lg shadow-navy-950/20 py-2'
            : 'bg-navy-900 py-4'
        }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

          {/* =====================================================
              LOGO
          ====================================================== */}

          <a
            href="#top"
            className="flex items-center gap-2 group"
            aria-label="GlobPulse home"
          >
            <img
              src="/GFEPLUSE1.png"
              alt="GlobPulse — The pulse of global trade"
              className="h-10 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </a>


          {/* =====================================================
              DESKTOP NAVIGATION
          ====================================================== */}

          <nav className="hidden lg:flex items-center gap-8">

            {navLinks.map((link) => (

              <button
                key={link.href}
                onClick={() =>
                  handleNavClick(link.href)
                }
                className="text-sm font-medium text-navy-100 hover:text-white transition-colors relative group"
              >

                {link.label}

                <span
                  className="
                    absolute
                    -bottom-1
                    left-0
                    w-0
                    h-0.5
                    bg-gold-400
                    group-hover:w-full
                    transition-all
                    duration-300
                  "
                />

              </button>

            ))}

          </nav>


          {/* =====================================================
              DESKTOP CTA
          ====================================================== */}

          <div className="hidden lg:block">

            {showDashboardButton ? (

            <CTAButton
  onClick={onDashboardClick}
  size="md"
  variant="gold"
>
  View My Plan
</CTAButton>

            ) : (

              <CTAButton
                onClick={onGetStarted}
                size="md"
                variant="gold"
              >
                Get Started ₹999
              </CTAButton>

            )}

          </div>


          {/* =====================================================
              MOBILE MENU BUTTON
          ====================================================== */}

          <button
            className="
              lg:hidden
              text-white
              p-2
              -mr-2
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-gold-400
              rounded-lg
            "
            onClick={() =>
              setMobileOpen(true)
            }
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>

        </div>

      </motion.header>


      {/* =========================================================
          MOBILE MENU
      ========================================================== */}

      <AnimatePresence>

        {mobileOpen && (

          <>

            {/* BACKDROP */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
                fixed
                inset-0
                bg-navy-950/60
                backdrop-blur-sm
                z-50
                lg:hidden
              "
              onClick={() =>
                setMobileOpen(false)
              }
            />


            {/* MOBILE DRAWER */}

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                damping: 30,
                stiffness: 300,
              }}
              className="
                fixed
                top-0
                right-0
                bottom-0
                w-[85%]
                max-w-sm
                bg-navy-900
                z-50
                lg:hidden
                shadow-2xl
                flex
                flex-col
              "
            >

              {/* =================================================
                  MOBILE HEADER
              ================================================== */}

              <div
                className="
                  flex
                  items-center
                  justify-between
                  p-6
                  border-b
                  border-navy-700
                "
              >

                <img
                  src="/GFEPLUSE1.png"
                  alt="GlobPulse — The pulse of global trade"
                  className="
                    h-9
                    w-auto
                    object-contain
                  "
                />

                <button
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="
                    text-white
                    p-2
                    -mr-2
                    focus:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-gold-400
                    rounded-lg
                  "
                  aria-label="Close navigation menu"
                >
                  <X className="w-6 h-6" />
                </button>

              </div>


              {/* =================================================
                  MOBILE NAVIGATION
              ================================================== */}

              <nav
                className="
                  flex
                  flex-col
                  gap-1
                  p-6
                  flex-1
                "
              >

                {navLinks.map((link) => (

                  <button
                    key={link.href}
                    onClick={() =>
                      handleNavClick(
                        link.href
                      )
                    }
                    className="
                      text-left
                      text-lg
                      font-medium
                      text-navy-100
                      hover:text-white
                      py-3
                      px-4
                      rounded-lg
                      hover:bg-navy-800
                      transition-colors
                    "
                  >
                    {link.label}
                  </button>

                ))}

              </nav>


              {/* =================================================
                  MOBILE CTA
              ================================================== */}

              <div
                className="
                  p-6
                  border-t
                  border-navy-700
                "
              >

                {showDashboardButton ? (

               <CTAButton
  onClick={() => {
    setMobileOpen(false);
    onDashboardClick();
  }}
  variant="gold"
  className="w-full"
>
  View My Plan
</CTAButton>

                ) : (

                  <CTAButton
                    onClick={() => {
                      setMobileOpen(false);
                      onGetStarted();
                    }}
                    variant="gold"
                    className="w-full"
                  >
                    Get Started ₹999
                  </CTAButton>

                )}

              </div>

            </motion.div>

          </>

        )}

      </AnimatePresence>
    </>
  );
}