const PAYSTACK_PUBLIC_KEY = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || '';

export function isPaystackConfigured() {
  return !!PAYSTACK_PUBLIC_KEY;
}

export function initializePayment({ email, amount, onSuccess, onCancel, metadata = {} }) {
  return new Promise((resolve, reject) => {
    if (!window.PaystackPop) {
      const script = document.createElement('script');
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      script.onload = () => proceed();
      script.onerror = () => reject(new Error('Failed to load Paystack SDK'));
      document.body.appendChild(script);
    } else {
      proceed();
    }

    function proceed() {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: Math.round(amount * 100),
        currency: 'NGN',
        ref: `JAY-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
        metadata,
        callback: (response) => {
          onSuccess?.(response);
          resolve(response);
        },
        onClose: () => {
          onCancel?.();
          resolve(null);
        },
      });
      handler.openIframe();
    }
  });
}
