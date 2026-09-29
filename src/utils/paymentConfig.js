
// -----------------------------------------------------------------------
// Paystack configuration
//
// Set REACT_APP_PAYSTACK_PUBLIC_KEY in a .env file at the project root.
//
// Example:
// REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxx
//
// The public key is safe to expose in frontend code. Never put the
// Paystack secret key in this file or anywhere in the frontend.
// -----------------------------------------------------------------------

export const PAYSTACK_PUBLIC_KEY =
  process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || "";

export function isPaystackConfigured() {
  return (
    !!PAYSTACK_PUBLIC_KEY &&
    PAYSTACK_PUBLIC_KEY.startsWith("pk_")
  );
}

export function isPaystackScriptLoaded() {
  return (
    typeof window !== "undefined" &&
    !!window.PaystackPop
  );
}
