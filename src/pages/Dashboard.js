import React, { useEffect, useMemo, useState } from "react";

import { Link } from "react-router-dom";

import { skills, projects, opportunities } from "../data/Data";

import { useAuth } from "../context/AuthContext";

import {
  percentComplete,
  getAllProgress,
} from "../utils/progressStore";

import { getMyProjects } from "../utils/projectApi";

import { getSavedOpportunityIds } from "../utils/opportunityStore";

import { PREMIUM_PRICE_NGN } from "../utils/subscriptionStore";

import usePremium from "../utils/usePremium";

import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";

export default function Dashboard() {
  const { user } = useAuth();

  const [allProgress, setAllProgress] = useState({});
  const [projectStates, setProjectStates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const [savedOpportunityIds, setSavedOpportunityIds] =
    useState([]);

  const { premium } = usePremium();

  useEffect(() => {
    let cancelled = false;

    async function loadDashboard() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setErrorMessage("");

       const [progress, dbProjects, savedIds] =
  await Promise.all([
    getAllProgress(),
    getMyProjects(),
    getSavedOpportunityIds(),
  ]);

        if (cancelled) {
          return;
        }

        setAllProgress(progress || {});
        setProjectStates(dbProjects || []);
        setSavedOpportunityIds(savedIds || []);
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );

        if (!cancelled) {
          setErrorMessage(
            error.message ||
              "Unable to load your dashboard."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadDashboard();

    return () => {
      cancelled = true;
    };
  }, [user]);

  const skillsStarted = useMemo(() => {
    if (!skills.length) {
      return [];
    }

    return skills.filter((skill) => {
      return skill.roadmap?.some((step) => {
        const lessonId = `${skill.id}-${step.id}`;

        return !!allProgress?.[lessonId]?.completed;
      });
    });
  }, [allProgress]);

  const skillsInProgress = useMemo(() => {
    return skillsStarted.filter((skill) => {
      return percentComplete(skill, allProgress) < 100;
    });
  }, [skillsStarted, allProgress]);

  const completedProjectIds = useMemo(() => {
    return projectStates
      .filter(
        (state) =>
          state.status === "COMPLETED"
      )
      .map((state) => String(state.projectId));
  }, [projectStates]);

  const inProgressProjectIds = useMemo(() => {
    return projectStates
      .filter(
        (state) =>
          state.status === "IN_PROGRESS"
      )
      .map((state) => String(state.projectId));
  }, [projectStates]);

  const inProgressProjects = useMemo(() => {
    return projects.filter((project) =>
      inProgressProjectIds.includes(
        String(project.id)
      )
    );
  }, [inProgressProjectIds]);

  
  const savedOpportunities = opportunities.filter((opportunity) =>
    savedOpportunityIds.includes(opportunity.id)
  );

  if (!user) {
    return null;
  }

  return (
    <div className="page-body">
      <div className="container">
        <h1>
          Welcome back,{" "}
          {user.name.split(" ")[0]}
        </h1>

        <p className="text-muted mt-8">
          Here is where things stand across your
          learning, projects and saved opportunities.
        </p>

        {loading && (
          <div className="mt-24">
            <p className="text-muted">
              Loading your dashboard...
            </p>
          </div>
        )}

        {errorMessage && !loading && (
          <div className="mt-24">
            <div className="task-box">
              <p className="text-muted">
                {errorMessage}
              </p>
            </div>
          </div>
        )}

        <div className="stat-row mt-32">
          <div className="stat-card">
            <div className="stat-value">
              {skillsStarted.length}
            </div>

            <div className="stat-label">
              Skills started
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">
              {inProgressProjectIds.length}
            </div>

            <div className="stat-label">
              Projects in progress
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">
              {completedProjectIds.length}
            </div>

            <div className="stat-label">
              Projects completed
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-value">
              {savedOpportunityIds.length}
            </div>

            <div className="stat-label">
              Opportunities saved
            </div>
          </div>
        </div>

        <div className="dashboard-grid">
          <div>
            <div className="section-title-row">
              <h2>Continue learning</h2>

              <Link
                to="/skills"
                className="btn btn-ghost btn-sm"
              >
                Browse all skills
              </Link>
            </div>

            {skillsInProgress.length === 0 ? (
              <EmptyState
                icon="book"
                title="No skill in progress yet"
                message="Pick a roadmap and complete your first lesson to see it here."
                action={
                  <Link
                    to="/skills"
                    className="btn btn-primary"
                  >
                    Browse skills
                  </Link>
                }
              />
            ) : (
              <div className="grid grid-2">
                {skillsInProgress
                  .slice(0, 4)
                  .map((skill) => (
                    <Link
                      to={`/roadmap/${skill.id}`}
                      key={skill.id}
                      className="card-link"
                    >
                      <div className="card">
                        <h3>{skill.name}</h3>

                        <div className="mt-16">
                          <ProgressBar
                            percent={percentComplete(
                              skill,
                              allProgress
                            )}
                          />
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            )}

            <div className="section-title-row mt-32">
              <h2>Projects in progress</h2>

              <Link
                to="/projects"
                className="btn btn-ghost btn-sm"
              >
                Browse all projects
              </Link>
            </div>

            {inProgressProjects.length === 0 ? (
              <EmptyState
                icon="hammer"
                title="No project started yet"
                message="Start a project connected to a skill you are learning."
                action={
                  <Link
                    to="/projects"
                    className="btn btn-primary"
                  >
                    Browse projects
                  </Link>
                }
              />
            ) : (
              <div className="grid grid-2">
                {inProgressProjects.map((project) => (
                  <Link
                    to={`/projects/${project.id}/build`}
                    key={project.id}
                    className="card-link"
                  >
                    <div className="card">
                      <span className="status-pill status-in-progress">
                        In progress
                      </span>

                      <h3 className="mt-16">
                        {project.title}
                      </h3>

                      <p className="card-desc">
                        {project.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <aside>
            <div className="lesson-sidebar">
              <h4>Saved opportunities</h4>

              {savedOpportunities.length === 0 ? (
                <p className="text-sm text-muted mt-8">
                  Nothing saved yet. Browse opportunities
                  and tap the bookmark icon to keep track
                  of ones you like.
                </p>
              ) : (
                <ul
                  className="mt-8"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                  }}
                >
                  {savedOpportunities
                    .slice(0, 4)
                    .map((opportunity) => (
                      <li
                        key={opportunity.id}
                        className="list-item-row"
                      >
                        <div>
                          <div
                            className="text-sm"
                            style={{
                              fontWeight: 600,
                            }}
                          >
                            {opportunity.title}
                          </div>

                          <div className="text-sm text-muted">
                            {opportunity.organization}
                          </div>
                        </div>
                      </li>
                    ))}
                </ul>
              )}

              <Link
                to="/opportunities"
                className="btn btn-secondary btn-block mt-16"
              >
                <Icon
                  name="briefcase"
                  size={16}
                />

                View opportunities
              </Link>
            </div>

            <div className="lesson-sidebar mt-24">
              <h4>Your showcase</h4>

              <p className="text-sm text-muted mt-8">
                {completedProjectIds.length === 0
                  ? "Complete a project to start building your showcase."
                  : `${completedProjectIds.length} completed project${
                      completedProjectIds.length === 1
                        ? ""
                        : "s"
                    } ready to share.`}
              </p>

              <Link
                to="/portfolio"
                className="btn btn-primary btn-block mt-16"
              >
                <Icon
                  name="showcase"
                  size={16}
                />

                View your showcase
              </Link>
            </div>

            {!premium && (
              <div
                className="lesson-sidebar mt-24"
                style={{
                  borderColor: "var(--amber-500)",
                }}
              >
                <span className="tag tag-amber">
                  Premium
                </span>

                <h4 className="mt-8">
                  Get more from SkillBridge NG
                </h4>

                <p className="text-sm text-muted mt-8">
                  Advanced deep-dive lessons, two
                  Premium-only projects and printable
                  certificates for{" "}
                  {"\u20a6"}
                  {PREMIUM_PRICE_NGN.toLocaleString(
                    "en-NG"
                  )}
                  , a one-time payment.
                </p>

                <Link
                  to="/subscribe"
                  className="btn btn-accent btn-block mt-16"
                >
                  <Icon
                    name="checkCircle"
                    size={16}
                  />

                  View Premium
                </Link>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}