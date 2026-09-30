import React, { useEffect, useState } from "react";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000/api";

function AdminDashboard() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadPayments() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/admin/payments`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to load admin payments."
        );
      }

      setPayments(data.payments || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPayments();
  }, []);

  async function handleApprove(paymentId) {
    const confirmed = window.confirm(
      "Have you verified this ₦20,000 bank transfer? Approving will activate Premium for 6 months."
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(paymentId);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/admin/payments/${paymentId}/approve`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to approve payment."
        );
      }

      setMessage(
        "Payment approved. Premium has been activated for 6 months."
      );

      await loadPayments();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionId(null);
    }
  }

  async function handleReject(paymentId) {
    const confirmed = window.confirm(
      "Are you sure you want to reject this payment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(paymentId);
      setError("");
      setMessage("");

      const response = await fetch(
        `${API_URL}/admin/payments/${paymentId}/reject`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to reject payment."
        );
      }

      setMessage("Payment rejected.");

      await loadPayments();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionId(null);
    }
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading">
          <p className="eyebrow">Administration</p>
          <h1>Admin Dashboard</h1>
          <p>
            Review and verify SkillBridge Premium bank-transfer
            payments.
          </p>
        </div>

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}

        <div className="admin-dashboard-card">
          <div className="admin-dashboard-header">
            <div>
              <h2>Pending Payments</h2>
              <p>
                Verify the bank transfer before approving Premium.
              </p>
            </div>

            <button
              type="button"
              onClick={loadPayments}
              disabled={loading}
              className="button button-secondary"
            >
              {loading ? "Refreshing..." : "Refresh"}
            </button>
          </div>

          {loading ? (
            <p>Loading payments...</p>
          ) : payments.length === 0 ? (
            <div className="admin-empty-state">
              <h3>No pending payments</h3>
              <p>
                There are currently no payments waiting for
                verification.
              </p>
            </div>
          ) : (
            <div className="admin-payment-list">
              {payments.map((payment) => (
                <article
                  key={payment.id}
                  className="admin-payment-card"
                >
                  <div className="admin-payment-main">
                    <div>
                      <h3>
                        {payment.user?.name || "Unknown user"}
                      </h3>

                      <p>{payment.user?.email || "No email"}</p>
                    </div>

                    <strong>
                      ₦{(payment.amountKobo / 100).toLocaleString()}
                    </strong>
                  </div>

                  <div className="admin-payment-details">
                    <div>
                      <span>Reference</span>
                      <strong>{payment.reference}</strong>
                    </div>

                    <div>
                      <span>Status</span>
                      <strong>{payment.status}</strong>
                    </div>

                    <div>
                      <span>Submitted</span>
                      <strong>
                        {new Date(
                          payment.createdAt
                        ).toLocaleString()}
                      </strong>
                    </div>

                    {payment.metadata?.customerConfirmedAt && (
                      <div>
                        <span>Customer confirmed</span>
                        <strong>
                          {new Date(
                            payment.metadata.customerConfirmedAt
                          ).toLocaleString()}
                        </strong>
                      </div>
                    )}
                  </div>

                  <div className="admin-payment-actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleApprove(payment.id)
                      }
                      disabled={actionId === payment.id}
                      className="button button-primary"
                    >
                      {actionId === payment.id
                        ? "Processing..."
                        : "Approve Payment"}
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleReject(payment.id)
                      }
                      disabled={actionId === payment.id}
                      className="button button-secondary"
                    >
                      Reject
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminDashboard;