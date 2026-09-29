import React, {
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";

import { opportunities } from "../data/Data";
import { useAuth } from "../context/AuthContext";

import {
  getSavedOpportunityIds,
  toggleSavedOpportunity,
} from "../utils/opportunityStore";

import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";

export default function Opportunities() {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [savedOnly, setSavedOnly] = useState(false);

  const [savedIds, setSavedIds] = useState([]);
  const [loadingSaved, setLoadingSaved] = useState(false);
  const [savingId, setSavingId] = useState(null);

  const categories = useMemo(() => {
    return [
      "All",
      ...new Set(
        opportunities.map((opportunity) => opportunity.category)
      ),
    ];
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadSavedOpportunities() {
      if (!user) {
        setSavedIds([]);
        setLoadingSaved(false);
        return;
      }

      try {
        setLoadingSaved(true);

        const ids = await getSavedOpportunityIds();

        if (!cancelled) {
          setSavedIds(Array.isArray(ids) ? ids : []);
        }
      } catch (error) {
        console.error(
          "Failed to load saved opportunities:",
          error
        );

        if (!cancelled) {
          setSavedIds([]);
        }
      } finally {
        if (!cancelled) {
          setLoadingSaved(false);
        }
      }
    }

    loadSavedOpportunities();

    return () => {
      cancelled = true;
    };
  }, [user]);

  async function handleToggleSave(opportunityId) {
    if (!user || savingId !== null) {
      return;
    }

    try {
      setSavingId(opportunityId);

      const nextIds = await toggleSavedOpportunity(
        opportunityId
      );

      setSavedIds(
        Array.isArray(nextIds) ? nextIds : []
      );
    } catch (error) {
      console.error(
        "Failed to update saved opportunity:",
        error
      );

      alert(
        error.message ||
          "Unable to update saved opportunity."
      );
    } finally {
      setSavingId(null);
    }
  }

  const filtered = opportunities.filter((opportunity) => {
    const search = query.trim().toLowerCase();

    const matchesQuery =
      opportunity.title
        .toLowerCase()
        .includes(search) ||
      opportunity.organization
        .toLowerCase()
        .includes(search);

    const matchesCategory =
      category === "All" ||
      opportunity.category === category;

    const matchesSaved =
      !savedOnly ||
      savedIds.includes(opportunity.id);

    return (
      matchesQuery &&
      matchesCategory &&
      matchesSaved
    );
  });

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Opportunities</h1>

          <p>
            Internships, junior roles and traineeships
            that match the skills on this platform.
          </p>
        </div>
      </div>

      <div className="page-body">
        <div className="container">
          <div className="filter-bar">
            <div className="search-input-wrap">
              <Icon name="search" size={16} />

              <input
                className="form-input"
                placeholder="Search by title or organization..."
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
              />
            </div>

            <select
              className="form-select"
              style={{ width: "auto" }}
              value={category}
              onChange={(event) =>
                setCategory(event.target.value)
              }
            >
              {categories.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>

            {user && (
              <button
                type="button"
                className={
                  "btn " +
                  (savedOnly
                    ? "btn-primary"
                    : "btn-secondary") +
                  " btn-sm"
                }
                onClick={() =>
                  setSavedOnly(
                    (current) => !current
                  )
                }
              >
                <Icon
                  name="bookmark"
                  size={15}
                />

                Saved only
              </button>
            )}
          </div>

          {!user && (
            <div className="mb-16">
              <div className="banner banner-info">
                <Icon
                  name="checkCircle"
                  size={18}
                />

                <span>
                  <Link to="/register">
                    Create an account
                  </Link>{" "}
                  to save opportunities and come back
                  to them later.
                </span>
              </div>
            </div>
          )}

          {user && loadingSaved && (
            <p className="text-sm text-muted mb-16">
              Loading your saved opportunities...
            </p>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              icon="briefcase"
              title="No opportunities match this filter"
              message="Try a different search term, category, or turn off Saved only."
            />
          ) : (
            <div className="grid grid-2">
              {filtered.map((opportunity) => {
                const isSaved = savedIds.includes(
                  opportunity.id
                );

                const isSaving =
                  savingId === opportunity.id;

                return (
                  <div
                    className="card"
                    key={opportunity.id}
                  >
                    <div className="flex-between">
                      <div
                        className="tag-row"
                        style={{
                          marginBottom: 6,
                        }}
                      >
                        <span className="tag">
                          {opportunity.category}
                        </span>

                        <span className="tag tag-gray">
                          {opportunity.type}
                        </span>
                      </div>

                      {user && (
                        <button
                          type="button"
                          className="btn btn-ghost btn-sm"
                          aria-label={
                            isSaved
                              ? "Remove from saved"
                              : "Save opportunity"
                          }
                          title={
                            isSaved
                              ? "Remove from saved"
                              : "Save opportunity"
                          }
                          onClick={() =>
                            handleToggleSave(
                              opportunity.id
                            )
                          }
                          disabled={
                            isSaving ||
                            loadingSaved
                          }
                        >
                          <Icon
                            name={
                              isSaved
                                ? "bookmarkFilled"
                                : "bookmark"
                            }
                            size={18}
                            style={{
                              color: isSaved
                                ? "var(--amber-600)"
                                : "var(--ink-500)",
                            }}
                          />
                        </button>
                      )}
                    </div>

                    <h3>{opportunity.title}</h3>

                    <p className="text-sm text-muted mt-8">
                      {opportunity.organization}
                    </p>

                    <div className="flex-row text-sm text-muted mt-8">
                      <Icon
                        name="mapPin"
                        size={14}
                      />

                      {opportunity.location}
                    </div>

                    <p className="card-desc mt-16">
                      {opportunity.description}
                    </p>

                    <div className="tag-row">
                      {opportunity.skills.map(
                        (skill) => (
                          <span
                            key={skill}
                            className="tag tag-gray"
                          >
                            {skill}
                          </span>
                        )
                      )}
                    </div>

                    <div className="card-footer">
                      <span>
                        Posted{" "}
                        {opportunity.postedAt}
                      </span>

                     {opportunity.applyUrl ? (
  <a
    href={opportunity.applyUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="btn btn-primary btn-sm"
  >
    Apply

    <Icon
      name="arrowRight"
      size={14}
    />
  </a>
) : (
  <span
    className="btn btn-secondary btn-sm"
    title="Application link is currently unavailable"
  >
    Application link unavailable
  </span>
)}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
