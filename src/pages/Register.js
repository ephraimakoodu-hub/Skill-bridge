import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Banner from "../components/Banner";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "", agree: false });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Fill in all fields to continue.");
      return;
    }
    if (!form.agree) {
      setError("You need to agree to the Terms and Privacy Policy to create an account.");
      return;
    }

    setSubmitting(true);
    const result = await register(form);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }
    navigate("/dashboard", { replace: true });
  }

  return (
    <div className="auth-shell">
      <div className="form-card">
        <h1>Create your account</h1>
        <p className="text-muted mt-8">It takes less than a minute, and it is free.</p>

        <div className="mt-24">
          <Banner type="error">{error}</Banner>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label className="form-label" htmlFor="name">Full name</label>
            <input
              id="name"
              type="text"
              className="form-input"
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              className="form-input"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="form-input"
              autoComplete="new-password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
            />
            <p className="form-hint">At least 8 characters. Your password is securely handled by SkillBridge.</p>
          </div>

          <div className="form-group checkbox-row">
            <input
              id="agree"
              type="checkbox"
              checked={form.agree}
              onChange={(e) => update("agree", e.target.checked)}
            />
            <label htmlFor="agree" className="text-sm">
              I agree to the <Link to="/terms">Terms &amp; Conditions</Link> and <Link to="/privacy">Privacy Policy</Link>.
            </label>
          </div>

          <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={submitting}>
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="form-footer-text">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
