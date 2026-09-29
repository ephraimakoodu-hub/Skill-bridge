import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { skills } from "../data/Data";
import { useAuth } from "../context/AuthContext";
import {
  getSkillProgress,
  percentComplete,
} from "../utils/progressStore";
import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";

export default function Skills() {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [progress, setProgress] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(false);

  const categories = useMemo(
    () => [
      "All",
      ...new Set(
        skills
          .map((skill) => skill.category)
          .filter(Boolean)
      ),
    ],
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      if (!user) {
        setProgress({});
        return;
      }

      try {
        setLoadingProgress(true);

        const results = await Promise.all(
          skills.map(async (skill) => {
            try {
              const skillProgress = await getSkillProgress(
                user.id,
                skill
              );

              const percent = await percentComplete(
                user.id,
                skill
              );

              return [
                String(skill.id),
                {
                  ...skillProgress,
                  percent,
                },
              ];
            } catch (error) {
              console.error(
                `Failed to load progress for ${skill.name}:`,
                error
              );

              return [
                String(skill.id),
                {
                  completedStepIds: [],
                  percent: 0,
                },
              ];
            }
          })
        );

        if (!cancelled) {
          setProgress(Object.fromEntries(results));
        }
      } catch (error) {
        console.error(
          "Failed to load skills progress:",
          error
        );

        if (!cancelled) {
          setProgress({});
        }
      } finally {
        if (!cancelled) {
          setLoadingProgress(false);
        }
      }
    }

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();

    return skills.filter((skill) => {
      const matchesQuery =
        !search ||
        skill.name.toLowerCase().includes(search);

      const matchesCategory =
        category === "All" ||
        skill.category === category;

      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Skills &amp; roadmaps</h1>

          <p>
            Choose a skill and follow its roadmap lesson by
            lesson. Your progress is saved as you go.
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
                placeholder="Search skills..."
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
              />
            </div>

            <select
              className="form-select"
              style={{ width: "auto" }}
              value={category}
              onChange={(e) =>
                setCategory(e.target.value)
              }
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="search"
              title="No skills match your search"
              message="Try a different keyword or clear the category filter."
            />
          ) : (
            <div className="grid grid-3">
              {filtered.map((skill) => {
                const skillProgress =
                  progress[String(skill.id)];

                const percent =
                  skillProgress?.percent || 0;

                const lessonCount =
                  Array.isArray(skill.roadmap)
                    ? skill.roadmap.length
                    : 0;

                return (
                  <Link
                    to={`/roadmap/${skill.id}`}
                    key={skill.id}
                    className="card-link"
                  >
                    <div className="card">
                      <div className="tag-row">
                        <span className="tag">
                          {skill.category}
                        </span>

                        <span className="tag tag-gray">
                          {skill.level}
                        </span>
                      </div>

                      <h3>{skill.name}</h3>

                      <p className="card-desc">
                        {skill.description}
                      </p>

                      {user && percent > 0 ? (
                        <ProgressBar
                          percent={percent}
                          label="Your progress"
                        />
                      ) : (
                        <p className="text-sm text-muted">
                          {loadingProgress
                            ? "Loading progress..."
                            : `${lessonCount} lessons`}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}