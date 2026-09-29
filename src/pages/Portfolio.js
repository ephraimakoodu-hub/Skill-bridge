import React from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getUserById } from "../utils/auth";
import {
  getAllProjectStates,
  STATUS,
} from "../utils/projectStore";
import usePremium from "../utils/usePremium";
import { projects } from "../data/Data";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";
import NotFound from "./NotFound";

export default function Portfolio() {
  const { userId } = useParams();
  const { user: currentUser } = useAuth();

  // Hooks must always run in the same order.
  const { premium } = usePremium();

  const isOwnPage = !userId;
  const profileUser = isOwnPage
    ? currentUser
    : getUserById(userId);

  if (!profileUser) return <NotFound />;

  const states = getAllProjectStates(profileUser.id);

  const completedEntries = Object.entries(states)
    .filter(
      ([, s]) => s.status === STATUS.COMPLETED
    )
    .map(([id, s]) => ({
      project: projects.find(
        (p) => p.id === Number(id)
      ),
      state: s,
    }))
    .filter((entry) => entry.project)
    .sort(
      (a, b) =>
        new Date(b.state.completedAt) -
        new Date(a.state.completedAt)
    );

  const initials = profileUser.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/portfolio/${profileUser.id}`
      : "";

  return (
    <div className="page-body">
      <div
        className="container"
        style={{ maxWidth: 820 }}
      >
        <div className="showcase-header">
          <div className="avatar-circle">
            {initials}
          </div>

          <div>
            <h1>
              {profileUser.name}'s showcase
            </h1>

            <p className="text-muted">
              {completedEntries.length} completed
              project
              {completedEntries.length === 1
                ? ""
                : "s"}
            </p>
          </div>

          {premium && (
            <span
              className="tag tag-amber"
              style={{ marginLeft: "auto" }}
            >
              <Icon
                name="checkCircle"
                size={13}
              />{" "}
              Premium
            </span>
          )}
        </div>

        {isOwnPage &&
          completedEntries.length > 0 && (
            <div className="banner banner-info">
              <Icon
                name="checkCircle"
                size={18}
              />

              <span>
                This is your public showcase. Share
                this link:{" "}
                <strong>{shareUrl}</strong>
              </span>
            </div>
          )}

        {completedEntries.length === 0 ? (
          <EmptyState
            icon="showcase"
            title="No completed projects yet"
            message={
              isOwnPage
                ? "Finish building a project and it will appear here automatically."
                : "This learner has not completed a project yet."
            }
            action={
              isOwnPage ? (
                <Link
                  to="/projects"
                  className="btn btn-primary"
                >
                  Start a project
                </Link>
              ) : null
            }
          />
        ) : (
          <div className="mt-24">
            {completedEntries.map(
              ({ project, state }) => (
                <div
                  className="showcase-project"
                  key={project.id}
                >
                  <div className="showcase-project-top">
                    <div>
                      <div
                        className="tag-row"
                        style={{
                          marginBottom: 8,
                        }}
                      >
                        <span className="tag">
                          {project.category}
                        </span>

                        <span className="tag tag-gray">
                          {project.difficulty}
                        </span>
                      </div>

                      <h3>{project.title}</h3>
                    </div>

                    <span className="tag tag-success">
                      <Icon
                        name="checkCircle"
                        size={13}
                      />{" "}
                      Completed{" "}
                      {new Date(
                        state.completedAt
                      ).toLocaleDateString()}
                    </span>
                  </div>

                  <p>{project.description}</p>

                  <div className="tag-row mt-16">
                    {project.skills.map((s) => (
                      <span
                        key={s}
                        className="tag tag-gray"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  {state.notes && (
                    <div className="mt-16">
                      <h4
                        className="text-sm"
                        style={{
                          marginBottom: 4,
                        }}
                      >
                        Notes from the builder
                      </h4>

                      <p className="text-sm">
                        {state.notes}
                      </p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}
