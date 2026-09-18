export type UserInfo = {
  name: string;
  email: string;
  phone: string;
};

const API_URL = import.meta.env.VITE_API_URL;
const RAZORPAY_KEY_ID = import.meta.env.VITE_RAZORPAY_KEY_ID;

export async function startRazorpayPayment(
  userInfo: UserInfo,
  onSuccess: () => void,
  onFailure: (msg: string) => void
): Promise<void> {
  try {
    const orderRes = await fetch(`${API_URL}/api/payment/create-order`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!orderRes.ok) {
      onFailure('Could not reach payment server');
      return;
    }

    const order = await orderRes.json();

    if (!order.id) {
      onFailure('Could not create order');
      return;
    }

    const rzp = new window.Razorpay({
      key: RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'GlobPulse',
      description: 'Seller Plan — ₹999',
      order_id: order.id,
      prefill: {
        name: userInfo.name,
        email: userInfo.email,
        contact: userInfo.phone,
      },
      theme: { color: '#0a1f44' },
      handler: async (response) => {
        try {
          const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(response),
          });
          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            onSuccess();
          } else {
            onFailure('Payment verification failed');
          }
        } catch {
          onFailure('Verification request failed');
        }
      },
      modal: {
        ondismiss: () => onFailure('Payment cancelled'),
      },
    });

    rzp.open();
  } catch (err) {
    console.error(err);
    onFailure('Something went wrong');
  }
}