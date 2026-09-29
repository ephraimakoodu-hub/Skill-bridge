import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  getSubscription,
  initializePremium,
  verifyPayment,
  PREMIUM_PRICE_NGN,
} from "../utils/subscriptionStore";

import {
  PAYSTACK_PUBLIC_KEY,
  isPaystackConfigured,
  isPaystackScriptLoaded,
} from "../utils/paymentConfig";

import Banner from "../components/Banner";
import Icon from "../components/Icon";

const formattedPrice =
  "\u20a6" +
  PREMIUM_PRICE_NGN.toLocaleString("en-NG");

const freeFeatures = [
  "Full access to every core lesson in all 6 skill roadmaps",
  "Unlimited standard projects, from beginner to advanced difficulty",
  "A public showcase page for every project you complete",
  "Save and browse opportunity listings",
];

const premiumFeatures = [
  "Everything in Free",
  'A "Go Deeper" section on all 48 lessons across every skill - the reasoning, common mistakes and a harder challenge a free tutorial leaves out',
  "The Advanced capstone lesson unlocked for every skill roadmap",
  "Access to premium-only projects (currently Student Result Portal and AI Chat Assistant)",
  "A printable completion certificate for each skill you finish",
  "A Premium badge on your public showcase profile",
];

export default function Subscribe() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [subscription, setSubscription] = useState({
    active: false,
    status: "INACTIVE",
    plan: "premium",
    reference: null,
    activatedAt: null,
  });

  const [loadingSubscription, setLoadingSubscription] =
    useState(true);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const configured = isPaystackConfigured();

  useEffect(() => {
    let cancelled = false;

    async function loadSubscription() {
      if (!user) {
        setLoadingSubscription(false);
        return;
      }

      try {
        setLoadingSubscription(true);

        const current = await getSubscription();

        if (!cancelled) {
          setSubscription(current);
        }
      } catch (err) {
        console.error(
          "Failed to load subscription:",
          err
        );

        if (!cancelled) {
          setError(
            "Unable to load your subscription status. Please refresh and try again."
          );
        }
      } finally {
        if (!cancelled) {
          setLoadingSubscription(false);
        }
      }
    }

    loadSubscription();

    return () => {
      cancelled = true;
    };
  }, [user]);

  async function handlePay() {
    setError("");
    setMessage("");

    if (!user) {
      navigate("/login", {
        state: {
          from: "/subscribe",
        },
      });

      return;
    }

    if (subscription.active) {
      setMessage(
        "Premium is already active on your account."
      );

      return;
    }

    if (!configured) {
      setError(
        "This deployment has not been configured with a real Paystack public key yet, so checkout cannot be started."
      );

      return;
    }

    if (!isPaystackScriptLoaded()) {
      setError(
        "The Paystack payment widget has not loaded yet. Refresh the page and try again."
      );

      return;
    }

    if (
      !window.PaystackPop ||
      typeof window.PaystackPop.setup !==
        "function"
    ) {
      setError(
        "The Paystack payment widget is unavailable. Please refresh the page and try again."
      );

      return;
    }

    try {
      setProcessing(true);

      /*
       * Ask our backend to create the Paystack transaction.
       * The backend owns the secret key and creates the
       * transaction reference.
       */
      const payment =
        await initializePremium();

      if (!payment?.reference) {
        throw new Error(
          "The server did not return a payment reference."
        );
      }

      /*
       * Keep the callback as a normal, named function.
       * Paystack requires callback to be a real function.
       */
      const handlePaystackCallback =
        function (response) {
          verifyCompletedPayment(
            response?.reference
          );
        };

      /*
       * Paystack calls this when the checkout window
       * is closed.
       */
      const handlePaystackClose =
        function () {
          setProcessing(false);

          setMessage(
            "Checkout was closed before payment completed."
          );
        };

      const handler =
        window.PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: user.email,
          amount: PREMIUM_PRICE_NGN * 100,
          currency: "NGN",
          ref: payment.reference,
          callback: handlePaystackCallback,
          onClose: handlePaystackClose,
        });

      if (
        !handler ||
        typeof handler.openIframe !==
          "function"
      ) {
        throw new Error(
          "Paystack could not create the checkout window."
        );
      }

      handler.openIframe();
    } catch (err) {
      console.error(
        "Unable to initialize payment:",
        err
      );

      setProcessing(false);

      setError(
        err.message ||
          "Unable to start payment. Please try again."
      );
    }
  }

  async function verifyCompletedPayment(
    reference
  ) {
    if (!reference) {
      setProcessing(false);

      setError(
        "Paystack did not return a payment reference."
      );

      return;
    }

    try {
      setMessage(
        "Payment received. Verifying your transaction..."
      );

      setError("");

      /*
       * The browser only sends the reference.
       *
       * Our backend contacts Paystack using the
       * secret key and decides whether payment succeeded.
       */
      const verification =
        await verifyPayment(reference);

      if (!verification.paid) {
        setProcessing(false);

        setError(
          "Payment could not be verified. Premium has not been activated."
        );

        return;
      }

      setSubscription(
        verification.subscription
      );

      setProcessing(false);

      setMessage(
        "Payment verified successfully. Premium is now active on your account."
      );
    } catch (err) {
      console.error(
        "Payment verification failed:",
        err
      );

      setProcessing(false);

      setError(
        err.message ||
          "Payment was received but could not be verified yet. Please contact support if the problem continues."
      );
    }
  }

  if (!user) {
    return (
      <div>
        <div className="page-header">
          <div className="container">
            <h1>Premium access</h1>

            <p>
              One plan, one price, full access to
              the deeper content and features on
              SkillBridge NG.
            </p>
          </div>
        </div>

        <div className="page-body">
          <div className="container">
            <div
              className="card"
              style={{ maxWidth: 760 }}
            >
              <span className="tag tag-gray">
                Free account required
              </span>

              <h2 className="mt-16">
                Log in to subscribe
              </h2>

              <p className="text-muted">
                Create a free SkillBridge NG account
                or log in before purchasing Premium.
              </p>

              <div className="flex-row mt-16">
                <Link
                  to="/login"
                  state={{
                    from: "/subscribe",
                  }}
                  className="btn btn-primary"
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="btn btn-secondary"
                >
                  Create account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Premium access</h1>

          <p>
            One plan, one price, full access to the
            deeper content and features on
            SkillBridge NG.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="container">
          <div
            className="banner banner-info"
            style={{
              maxWidth: 760,
              alignItems: "flex-start",
            }}
          >
            <Icon
              name="lock"
              size={18}
              style={{
                marginTop: 2,
                flexShrink: 0,
              }}
            />

            <span>
              Payments are processed securely through
              Paystack. SkillBridge NG verifies the
              transaction on the server before Premium
              access is activated.
            </span>
          </div>

          {!configured && (
            <div
              className="mt-16"
              style={{ maxWidth: 760 }}
            >
              <Banner type="error">
                No live Paystack public key is
                configured for this deployment.
                Checkout is disabled until one is
                configured.
              </Banner>
            </div>
          )}

          {message && (
            <div
              className="mt-16"
              style={{ maxWidth: 760 }}
            >
              <Banner type="success">
                {message}
              </Banner>
            </div>
          )}

          {error && (
            <div
              className="mt-16"
              style={{ maxWidth: 760 }}
            >
              <Banner type="error">
                {error}
              </Banner>
            </div>
          )}

          <div
            className="grid grid-2 mt-24"
            style={{ maxWidth: 820 }}
          >
            <div className="card">
              <span className="tag tag-gray">
                Free
              </span>

              <h2 className="mt-16">
                ₦0
              </h2>

              <p className="text-sm text-muted mb-16">
                Everything you need to learn and build.
              </p>

              <ul className="bullet-list">
                {freeFeatures.map(
                  (feature, index) => (
                    <li key={index}>
                      <Icon
                        name="check"
                        size={16}
                        style={{
                          marginTop: 3,
                          color:
                            "var(--teal-700)",
                        }}
                      />

                      {feature}
                    </li>
                  )
                )}
              </ul>

              {!loadingSubscription &&
                !subscription.active && (
                  <p className="text-sm text-muted mt-16">
                    This is your current plan.
                  </p>
                )}
            </div>

            <div
              className="card"
              style={{
                borderColor:
                  "var(--amber-500)",
                borderWidth: 2,
              }}
            >
              <span className="tag tag-amber">
                Premium
              </span>

              <h2 className="mt-16">
                {formattedPrice}
              </h2>

              <p className="text-sm text-muted mb-16">
                One-time payment via Paystack.
                Lifetime access on this account.
              </p>

              <ul className="bullet-list">
                {premiumFeatures.map(
                  (feature, index) => (
                    <li key={index}>
                      <Icon
                        name="check"
                        size={16}
                        style={{
                          marginTop: 3,
                          color:
                            "var(--teal-700)",
                        }}
                      />

                      {feature}
                    </li>
                  )
                )}
              </ul>

              {loadingSubscription ? (
                <p className="text-sm text-muted mt-16">
                  Checking your subscription...
                </p>
              ) : subscription.active ? (
                <>
                  <p
                    className="text-sm mt-16"
                    style={{
                      color:
                        "var(--success)",
                      fontWeight: 600,
                    }}
                  >
                    <Icon
                      name="checkCircle"
                      size={15}
                    />{" "}
                    You have Premium access.
                  </p>

                  {subscription.activatedAt && (
                    <p className="text-sm text-muted">
                      Activated{" "}
                      {new Date(
                        subscription.activatedAt
                      ).toLocaleDateString(
                        "en-NG"
                      )}
                    </p>
                  )}

                  <p className="text-sm text-muted mt-8">
                    Your Premium access is stored
                    securely on your SkillBridge NG
                    account.
                  </p>
                </>
              ) : (
                <button
                  className="btn btn-accent btn-block mt-16"
                  onClick={handlePay}
                  disabled={processing}
                >
                  <Icon
                    name="lock"
                    size={16}
                  />

                  {processing
                    ? "Processing payment..."
                    : `Pay ${formattedPrice} with Paystack`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
