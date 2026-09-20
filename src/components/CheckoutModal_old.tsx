import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, CreditCard, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { planBenefits } from '@/data/content';
import { startRazorpayPayment } from '@/lib/razorpay';

type CheckoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<'register' | 'payment'>('register');

  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<PaymentStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleClose = () => {
    // Reset everything so a reopened modal starts fresh
    setStep('register');
    setFormData({ name: '', email: '', phone: '' });
    setStatus('idle');
    setErrorMsg('');
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  // const handlePayNow = () => {
  //   setStatus('processing');
  //   setErrorMsg('');
  //   startRazorpayPayment(
  //     formData,
  //     () => setStatus('success'),
  //     (msg) => {
  //       setStatus('error');
  //       setErrorMsg(msg);
  //     }
  //   );
  // };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-navy-900 px-6 py-5 flex items-center justify-between">
              <div className="flex items-center">
                <img
                  src="/GFEPLUSE1.png"
                  alt="GlobPulse — The pulse of global trade"
                  className="h-9 w-auto object-contain"
                />
              </div>
              <button
                onClick={handleClose}
                className="text-navy-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 rounded-lg"
                aria-label="Close checkout"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              {/* Step indicator — hidden once payment succeeds */}
              {status !== 'success' && (
                <div className="flex items-center gap-2 mb-6">
                  {['register', 'payment'].map((s, i) => (
                    <div key={s} className="flex items-center gap-2 flex-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          step === s
                            ? 'bg-navy-900 text-white'
                            : 'bg-navy-100 text-navy-400'
                        }`}
                      >
                        {i + 1}
                      </div>
                      <span className={`text-xs font-medium capitalize ${step === s ? 'text-navy-900' : 'text-navy-400'}`}>
                        {s === 'register' ? 'Register' : 'Payment'}
                      </span>
                      {i === 0 && <div className="flex-1 h-0.5 bg-navy-100 rounded" />}
                    </div>
                  ))}
                </div>
              )}

              {status === 'success' ? (
                /* ---------- SUCCESS SCREEN ---------- */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  className="text-center py-4"
                >
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-9 h-9 text-green-600" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-navy-900">
                    Payment Successful!
                  </h3>
                  <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                    Welcome to GlobPulse, {formData.name || 'there'}. Your Seller Plan is now
                    active — we've sent a confirmation to{' '}
                    <span className="font-medium text-navy-700">{formData.email}</span>.
                  </p>

                  <div className="mt-5 rounded-xl bg-navy-50 border border-navy-100 p-4 text-left">
                    <div className="space-y-1.5">
                      {planBenefits.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-xs text-navy-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-600 flex-shrink-0" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleClose}
                    className="mt-6 w-full py-3 rounded-lg bg-navy-900 text-white font-semibold text-sm hover:bg-navy-800 transition-colors"
                  >
                    Done
                  </button>
                </motion.div>
              ) : step === 'register' ? (
                /* ---------- REGISTER STEP ---------- */
                <>
                  <h3 className="font-display text-xl font-bold text-navy-900">
                    Create Your Seller Account
                  </h3>
                  <p className="mt-1 text-sm text-navy-500">
                    Register to activate your ₹999 Seller Plan.
                  </p>

                  <form className="mt-5 space-y-4" onSubmit={handleRegisterSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1.5">
                        Business Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your business name"
                        className="w-full px-4 py-2.5 rounded-lg border border-navy-200 text-navy-900 text-sm focus:outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-navy-700 mb-1.5">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="you@business.com"
                        className="w-full px-4 py-2.5 rounded-lg border border-navy-200 text-navy-900 text-sm focus:outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-navy-700 mb-1.5">
                        Phone Number
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-2.5 rounded-lg border border-navy-200 text-navy-900 text-sm focus:outline-none focus:border-navy-400 focus:ring-2 focus:ring-navy-100 transition-colors"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3 rounded-lg bg-navy-900 text-white font-semibold text-sm hover:bg-navy-800 transition-colors flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2"
                    >
                      Continue to Payment
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </>
              ) : (
                /* ---------- PAYMENT STEP ---------- */
                <>
                  <h3 className="font-display text-xl font-bold text-navy-900">
                    Complete Your Payment
                  </h3>
                  <p className="mt-1 text-sm text-navy-500">
                    Secure checkout through Razorpay.
                  </p>

                  {/* Plan summary */}
                  <div className="mt-5 rounded-xl bg-navy-50 border border-navy-100 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-navy-700">GlobPulse Seller Plan</span>
                      <span className="font-display text-2xl font-bold text-navy-900">₹999</span>
                    </div>
                    <div className="mt-3 space-y-1.5">
                      {planBenefits.map((b) => (
                        <div key={b} className="flex items-center gap-2 text-xs text-navy-500">
                          <span className="w-1 h-1 rounded-full bg-gold-500" />
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Razorpay trigger */}
                  <div className="mt-5 rounded-xl border border-navy-100 p-6 text-center bg-navy-50/50">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center mx-auto mb-3 shadow-sm">
                      <CreditCard className="w-6 h-6 text-navy-500" />
                    </div>
                    <p className="text-sm font-medium text-navy-700">
                      Pay securely with Razorpay
                    </p>
                    <p className="mt-1 text-xs text-navy-400 leading-relaxed">
                      Cards, UPI, net banking, and wallets accepted.
                    </p>

                    {/* <button
                      onClick={handlePayNow}
                      disabled={status === 'processing'}
                      className="mt-4 w-full py-3 rounded-lg bg-navy-900 text-white font-semibold text-sm hover:bg-navy-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'processing' ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                          Processing…
                        </>
                      ) : (
                        <>Pay ₹999 with Razorpay</>
                      )}
                    </button> */}

                    {status === 'error' && (
                      <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-red-500">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{errorMsg}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-navy-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Your payment is processed securely through Razorpay</span>
                  </div>

                  <button
                    onClick={() => setStep('register')}
                    disabled={status === 'processing'}
                    className="mt-4 w-full py-2.5 rounded-lg border border-navy-200 text-navy-600 font-medium text-sm hover:bg-navy-50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Back to Registration
                  </button>
                </>
              )}

              {/* Trust footer — hidden on success screen since it has its own CTA */}
              {status !== 'success' && (
                <div className="mt-5 pt-5 border-t border-navy-100 flex items-center justify-center gap-2 text-xs text-navy-400">
                  <ShieldCheck className="w-4 h-4 text-gold-500" />
                  <span>One-time payment | Secure checkout</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}