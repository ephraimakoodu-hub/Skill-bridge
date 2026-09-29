import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { changePassword } from "../utils/auth";
import Banner from "../components/Banner";

export default function ChangePassword() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ current: "", next: "", confirm: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (form.next !== form.confirm) {
      setError("New password and confirmation do not match.");
      return;
    }

    setSubmitting(true);
    const result = await changePassword(user.id, form.current, form.next);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    setSuccess("Password updated.");
    setForm({ current: "", next: "", confirm: "" });
  }

  return (
    <div className="auth-shell">
      <div className="form-card">
        <h1>Change password</h1>
        <p className="text-muted mt-8">Choose a new password for your account.</p>

        <div className="mt-24">
          <Banner type="error">{error}</Banner>
          <Banner type="success">{success}</Banner>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="current">Current password</label>
            <input id="current" type="password" className="form-input" value={form.current} onChange={(e) => update("current", e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="next">New password</label>
            <input id="next" type="password" className="form-input" value={form.next} onChange={(e) => update("next", e.target.value)} />
            <p className="form-hint">At least 8 characters.</p>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="confirm">Confirm new password</label>
            <input id="confirm" type="password" className="form-input" value={form.confirm} onChange={(e) => update("confirm", e.target.value)} />
          </div>

          <div className="flex-row">
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Saving..." : "Update password"}
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/settings")}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
