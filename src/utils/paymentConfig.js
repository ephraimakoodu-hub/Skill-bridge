// -----------------------------------------------------------------------
// SkillBridge payment configuration
//
// Premium is currently handled through manual bank transfer.
// Paystack can be re-enabled later when a verified live payment account
// is available.
// -----------------------------------------------------------------------

export const PREMIUM_PRICE_NGN = 20000;
export const PREMIUM_DURATION_MONTHS = 6;

export const PAYMENT_METHOD = "bank_transfer";

export function isPaymentConfigured() {
  return PAYMENT_METHOD === "bank_transfer";
}