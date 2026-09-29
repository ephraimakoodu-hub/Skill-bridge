import React from "react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import { projects } from "../data/Data";
import { useAuth } from "../context/AuthContext";
import {
  getProjectState,
  startProject,
  STATUS,
} from "../utils/projectStore";
import usePremium from "../utils/usePremium";

import Icon from "../components/Icon";
import NotFound from "./NotFound";

export default function ProjectDetails() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Hooks must always run in the same order.
  const { premium } = usePremium();

  const project = projects.find(
    (p) => String(p.id) === projectId
  );

  if (!project) return <NotFound />;

  const state = user
    ? getProjectState(user.id, project.id)
    : null;

  const locked =
    !!project.premium && !premium;

  function handleStart() {
    if (!user) {
      navigate("/login", {
        state: {
          from: `/projects/${project.id}`,
        },
      });
      return;
    }

    if (locked) {
      navigate("/subscribe");
      return;
    }

    if (state.status === STATUS.NOT_STARTED) {
      startProject(user.id, project.id);
    }

    navigate(
      `/projects/${project.id}/build`
    );
  }

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/projects">
              Projects
            </Link>

            <Icon
              name="arrowRight"
              size={14}
            />

            <span>{project.title}</span>
          </div>

          <div className="tag-row">
            <span className="tag">
              {project.category}
            </span>

            <span className="tag tag-gray">
              {project.difficulty}
            </span>

            {project.premium && (
              <span className="tag tag-amber">
                <Icon
                  name="lock"
                  size={11}
                />{" "}
                Premium
              </span>
            )}
          </div>

          <h1>{project.title}</h1>

          <p>{project.description}</p>
        </div>
      </div>

      <div className="page-body">
        <div className="container">
          <div className="dashboard-grid">
            <div>
              <h2>What you will build</h2>

              <p className="mt-8">
                This project asks you to apply{" "}
                {project.skills.join(", ")} to a
                complete, working result. Work
                through the checklist at your own
                pace and save your progress as you
                go.
              </p>

              <h3 className="mt-32">
                Checklist preview
              </h3>

              {locked ? (
                <div
                  className="task-box mt-8"
                  style={{
                    background:
                      "var(--teal-100)",
                    borderColor:
                      "var(--teal-700)",
                  }}
                >
                  <span className="tag">
                    <Icon
                      name="lock"
                      size={13}
                    />{" "}
                    Premium project
                  </span>

                  <p className="mt-16">
                    The full checklist unlocks
                    with Premium. This project
                    is one of two advanced,
                    portfolio-differentiating
                    builds included in the plan.
                  </p>

                  <Link
                    to="/subscribe"
                    className="btn btn-accent mt-16"
                  >
                    Unlock Premium
                  </Link>
                </div>
              ) : (
                <ul className="bullet-list mt-8">
                  {project.checklist.map(
                    (item, i) => (
                      <li key={i}>
                        <Icon
                          name="circle"
                          size={14}
                          style={{
                            marginTop: 4,
                            color:
                              "var(--teal-700)",
                          }}
                        />

                        {item}
                      </li>
                    )
                  )}
                </ul>
              )}
            </div>

            <aside>
              <div className="lesson-sidebar">
                <h4>Skills used</h4>

                <div className="tag-row mt-8">
                  {project.skills.map((s) => (
                    <span
                      key={s}
                      className="tag tag-gray"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <h4 className="mt-24">
                  Status
                </h4>

                <p className="text-sm text-muted mt-8">
                  {!user &&
                    "Log in to start this project."}

                  {user &&
                    locked &&
                    "This is a Premium project. Upgrade to unlock it."}

                  {user &&
                    !locked &&
                    state.status ===
                      STATUS.NOT_STARTED &&
                    "You have not started this project yet."}

                  {user &&
                    !locked &&
                    state.status ===
                      STATUS.IN_PROGRESS &&
                    "You are currently working on this project."}

                  {user &&
                    !locked &&
                    state.status ===
                      STATUS.COMPLETED &&
                    "You have completed this project. It is in your showcase."}
                </p>

                <button
                  className="btn btn-primary btn-block mt-16"
                  onClick={handleStart}
                >
                  {locked
                    ? "Unlock Premium"
                    : user &&
                        state.status !==
                          STATUS.NOT_STARTED
                    ? "Continue building"
                    : "Start this project"}

                  <Icon
                    name="arrowRight"
                    size={16}
                  />
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
