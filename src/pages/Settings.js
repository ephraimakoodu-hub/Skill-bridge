import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import {
  getSubscription,
  PREMIUM_PRICE_NGN,
} from "../utils/subscriptionStore";

import Banner from "../components/Banner";
import Icon from "../components/Icon";

export default function Settings() {
  const { user, refreshProfile, removeAccount } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user.name,
    bio: user.bio || "",
    location: user.location || "",
  });

  const [success, setSuccess] = useState("");
  const [subscription, setSubscription] = useState({
    active: false,
    status: "INACTIVE",
    plan: "premium",
    activatedAt: null,
  });

  const [loadingSubscription, setLoadingSubscription] =
    useState(true);

  const [confirmingDelete, setConfirmingDelete] =
    useState(false);

  useEffect(() => {
    let cancelled = false;

    async function loadSubscription() {
      try {
        setLoadingSubscription(true);

        const current = await getSubscription();

        if (!cancelled) {
          setSubscription(current);
        }
      } catch (error) {
        console.error(
          "Failed to load subscription:",
          error
        );
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
  }, []);

  function update(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function handleSave(event) {
    event.preventDefault();

    refreshProfile(form);
    setSuccess("Profile updated.");
  }

  function handleDelete() {
    removeAccount();
    navigate("/");
  }

  return (
    <div className="page-body">
      <div
        className="container"
        style={{ maxWidth: 640 }}
      >
        <h1>Settings</h1>

        <p className="text-muted mt-8">
          Manage your profile and account.
        </p>

        {/* PROFILE */}
        <div className="form-card mt-24">
          <h3>Profile information</h3>

          {success && (
            <div className="mt-16">
              <Banner type="success">
                {success}
              </Banner>
            </div>
          )}

          <form
            onSubmit={handleSave}
            className="mt-16"
          >
            <div className="form-group">
              <label
                className="form-label"
                htmlFor="name"
              >
                Full name
              </label>

              <input
                id="name"
                className="form-input"
                value={form.name}
                onChange={(event) =>
                  update(
                    "name",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label
                className="form-label"
                htmlFor="location"
              >
                Location
              </label>

              <input
                id="location"
                className="form-input"
                placeholder="e.g. Lagos, Nigeria"
                value={form.location}
                onChange={(event) =>
                  update(
                    "location",
                    event.target.value
                  )
                }
              />
            </div>

            <div className="form-group">
              <label
                className="form-label"
                htmlFor="bio"
              >
                Short bio
              </label>

              <textarea
                id="bio"
                className="form-textarea"
                rows={3}
                value={form.bio}
                onChange={(event) =>
                  update(
                    "bio",
                    event.target.value
                  )
                }
                placeholder="A sentence or two about what you are learning or building."
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary"
            >
              Save changes
            </button>
          </form>
        </div>

        {/* ACCOUNT */}
        <div className="form-card mt-24">
          <h3>Account</h3>

          <p className="text-sm text-muted mt-8">
            Email: {user.email}
          </p>

          <div className="flex-row mt-16">
            <Link
              to="/change-password"
              className="btn btn-secondary"
            >
              <Icon
                name="lock"
                size={16}
              />
              Change password
            </Link>
          </div>
        </div>

        {/* SUBSCRIPTION */}
        <div className="form-card mt-24">
          <h3>Subscription</h3>

          {loadingSubscription ? (
            <p className="text-sm text-muted mt-8">
              Checking your subscription...
            </p>
          ) : subscription.active ? (
            <>
              <p
                className="text-sm mt-8"
                style={{
                  color: "var(--success)",
                  fontWeight: 600,
                }}
              >
                <Icon
                  name="checkCircle"
                  size={15}
                />{" "}
                Premium active
              </p>

              {subscription.activatedAt && (
                <p className="text-sm text-muted mt-8">
                  Activated on{" "}
                  {new Date(
                    subscription.activatedAt
                  ).toLocaleDateString("en-NG")}
                  .
                </p>
              )}

              <p className="text-sm text-muted mt-8">
                You have access to Advanced lessons,
                Premium projects and completion
                certificates.
              </p>

              <p className="text-sm text-muted mt-8">
                Your Premium access is stored securely
                on your SkillBridge NG account.
              </p>
            </>
          ) : (
            <>
              <p className="text-sm text-muted mt-8">
                You are on the Free plan. Upgrade for{" "}
                {"\u20a6" +
                  PREMIUM_PRICE_NGN.toLocaleString(
                    "en-NG"
                  )}{" "}
                to unlock Advanced lessons, Premium
                projects and completion certificates.
              </p>

              <Link
                to="/subscribe"
                className="btn btn-accent mt-16"
              >
                View Premium
              </Link>
            </>
          )}
        </div>

        {/* DELETE ACCOUNT */}
        <div
          className="form-card mt-24"
          style={{
            borderColor: "var(--error)",
          }}
        >
          <h3
            style={{
              color: "var(--error)",
            }}
          >
            Delete account
          </h3>

          <p className="text-sm text-muted mt-8">
            This permanently removes your account and
            all associated data. This cannot be undone.
          </p>

          {!confirmingDelete ? (
            <button
              className="btn btn-danger mt-16"
              onClick={() =>
                setConfirmingDelete(true)
              }
            >
              <Icon
                name="trash"
                size={16}
              />
              Delete my account
            </button>
          ) : (
            <div className="mt-16">
              <Banner type="error">
                Are you sure? This cannot be undone.
              </Banner>

              <div className="flex-row">
                <button
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Yes, delete permanently
                </button>

                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    setConfirmingDelete(false)
                  }
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
