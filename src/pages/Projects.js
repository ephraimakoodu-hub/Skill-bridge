import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data/Data";
import { useAuth } from "../context/AuthContext";
import { getMyProjects, STATUS } from "../utils/projectApi";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";

const statusLabel = {
  [STATUS.NOT_STARTED]: "Not started",
  [STATUS.IN_PROGRESS]: "In progress",
  [STATUS.COMPLETED]: "Completed",
};

const statusClass = {
  [STATUS.NOT_STARTED]: "status-not-started",
  [STATUS.IN_PROGRESS]: "status-in-progress",
  [STATUS.COMPLETED]: "status-completed",
};

export default function Projects() {
  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [difficulty, setDifficulty] = useState("All");
  const [projectStates, setProjectStates] = useState({});
  const [loading, setLoading] = useState(false);

  const difficulties = useMemo(
    () => ["All", ...new Set(projects.map((p) => p.difficulty))],
    []
  );

  useEffect(() => {
    let cancelled = false;

    async function loadProjectStates() {
      if (!user) {
        setProjectStates({});
        return;
      }

      try {
        setLoading(true);

        const rows = await getMyProjects();

        if (cancelled) return;

        const states = {};

        for (const row of rows) {
          states[row.projectId] = row;
        }

        setProjectStates(states);
      } catch (error) {
        console.error("Failed to load project progress:", error);

        if (!cancelled) {
          setProjectStates({});
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProjectStates();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const filtered = projects.filter((project) => {
    const matchesQuery = project.title
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesDifficulty =
      difficulty === "All" ||
      project.difficulty === difficulty;

    return matchesQuery && matchesDifficulty;
  });

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Projects</h1>
          <p>
            Build something real. Each project has a clear checklist so
            you always know what is left to do.
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
                placeholder="Search projects..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <select
              className="form-select"
              style={{ width: "auto" }}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {difficulties.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {loading && user && (
            <p className="text-sm text-muted mb-16">
              Loading your project progress...
            </p>
          )}

          {filtered.length === 0 ? (
            <EmptyState
              icon="search"
              title="No projects match your search"
              message="Try a different keyword or difficulty."
            />
          ) : (
            <div className="grid grid-3">
              {filtered.map((project) => {
                const state = projectStates[project.id];

                return (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="card-link"
                  >
                    <div className="card">
                      <div className="tag-row">
                        <span className="tag">
                          {project.category}
                        </span>

                        <span className="tag tag-gray">
                          {project.difficulty}
                        </span>

                        {project.premium && (
                          <span className="tag tag-amber">
                            Premium
                          </span>
                        )}
                      </div>

                      <h3>{project.title}</h3>

                      <p className="card-desc">
                        {project.description}
                      </p>

                      <div className="card-footer">
                        <span>
                          {project.skills.slice(0, 2).join(", ")}
                          {project.skills.length > 2 ? "..." : ""}
                        </span>

                        {state &&
                        state.status !== STATUS.NOT_STARTED ? (
                          <span
                            className={
                              "status-pill " +
                              statusClass[state.status]
                            }
                          >
                            {statusLabel[state.status]}
                          </span>
                        ) : (
                          <Icon
                            name="arrowRight"
                            size={16}
                          />
                        )}
                      </div>
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