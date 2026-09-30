import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  getSubscription,
  initializePremium,
  confirmPayment,
  PREMIUM_PRICE_NGN,
  PREMIUM_DURATION_MONTHS,
} from "../utils/subscriptionStore";

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

  const [payment, setPayment] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

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

  async function handleStartPayment() {
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

    try {
      setProcessing(true);

      const result = await initializePremium();

      if (!result?.reference) {
        throw new Error(
          "The server did not return a payment reference."
        );
      }

      setPayment(result);
      setConfirmed(false);

      setMessage(
        "Transfer exactly ₦20,000 using the bank details below. After transferring, click \"I've made the payment\"."
      );
    } catch (err) {
      console.error(
        "Unable to create payment request:",
        err
      );

      setError(
        err.message ||
          "Unable to create the payment request. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  }

  async function handleConfirmPayment() {
    if (!payment?.reference) {
      setError(
        "Payment reference is missing. Please start the payment again."
      );

      return;
    }

    setError("");
    setMessage("");

    try {
      setProcessing(true);

      const result = await confirmPayment(
        payment.reference
      );

      setConfirmed(true);

      setMessage(
        result?.message ||
          "Payment submitted for verification. Premium will be activated after your payment is verified."
      );
    } catch (err) {
      console.error(
        "Unable to confirm payment:",
        err
      );

      setError(
        err.message ||
          "Unable to submit your payment confirmation. Please try again."
      );
    } finally {
      setProcessing(false);
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
              Premium is currently paid by bank
              transfer. Your payment is manually
              verified before Premium access is
              activated.
            </span>
          </div>

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
                One-time payment for{" "}
                {PREMIUM_DURATION_MONTHS} months
                of Premium access.
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
              ) : payment ? (
                <div className="mt-16">
                  <div
                    className="card"
                    style={{
                      background:
                        "var(--gray-50)",
                    }}
                  >
                    <h3>
                      Bank transfer details
                    </h3>

                    <p className="text-sm text-muted">
                      Transfer exactly{" "}
                      <strong>
                        ₦20,000
                      </strong>{" "}
                      to the account below.
                    </p>

                    <div className="mt-16">
                      <p className="text-sm">
                        <strong>
                          Bank
                        </strong>
                        <br />
                        {payment.bankDetails
                          ?.bankName ||
                          "Bank details unavailable"}
                      </p>

                      <p className="text-sm mt-8">
                        <strong>
                          Account name
                        </strong>
                        <br />
                        {payment.bankDetails
                          ?.accountName ||
                          "Account details unavailable"}
                      </p>

                      <p className="text-sm mt-8">
                        <strong>
                          Account number
                        </strong>
                        <br />
                        {payment.bankDetails
                          ?.accountNumber ||
                          "Account details unavailable"}
                      </p>

                      <p className="text-sm mt-8">
                        <strong>
                          Payment reference
                        </strong>
                        <br />
                        {payment.reference}
                      </p>
                    </div>

                    <p className="text-sm text-muted mt-16">
                      After making the transfer,
                      click the button below. Your
                      payment will remain pending until
                      it is manually verified.
                    </p>

                    {!confirmed ? (
                      <button
                        className="btn btn-accent btn-block mt-16"
                        onClick={
                          handleConfirmPayment
                        }
                        disabled={processing}
                      >
                        <Icon
                          name="check"
                          size={16}
                        />

                        {processing
                          ? "Submitting..."
                          : "I've made the payment"}
                      </button>
                    ) : (
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
                        Payment submitted for
                        verification.
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-accent btn-block mt-16"
                  onClick={handleStartPayment}
                  disabled={processing}
                >
                  <Icon
                    name="lock"
                    size={16}
                  />

                  {processing
                    ? "Preparing payment..."
                    : `Pay ${formattedPrice} by bank transfer`}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}