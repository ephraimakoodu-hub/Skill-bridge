const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:4000/api";

export const PREMIUM_PRICE_NGN = 20000;
export const PREMIUM_DURATION_MONTHS = 6;

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || "Unable to process payment."
    );
  }

  return data;
}

function normalizeSubscription(subscription) {
  return {
    active: subscription?.status === "ACTIVE",
    status: subscription?.status || "INACTIVE",
    plan: subscription?.plan || "premium",
    reference: subscription?.reference || null,
    paymentId: subscription?.paymentId || null,
    activatedAt: subscription?.activatedAt || null,
  };
}

export async function getSubscription() {
  const data = await request(
    "/payments/subscription"
  );

  return normalizeSubscription(
    data.subscription
  );
}

// Start a manual bank-transfer payment.
export async function initializePremium() {
  return request("/payments/initialize", {
    method: "POST",
  });
}

// Tell the backend that the user has made the bank transfer.
// This does NOT activate Premium. Admin verification is required.
export async function confirmPayment(reference) {
  return request("/payments/confirm", {
    method: "POST",
    body: JSON.stringify({
      reference,
    }),
  });
}

// Check the current payment status.
export async function verifyPayment(reference) {
  const data = await request(
    `/payments/verify/${encodeURIComponent(reference)}`
  );

  return {
    paid: !!data.paid,
    paymentStatus: data.paymentStatus || null,
    reference: data.reference || reference,
    subscription: normalizeSubscription(
      data.subscription
    ),
  };
}