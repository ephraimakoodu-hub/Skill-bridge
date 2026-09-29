import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { skills } from "../data/Data";
import { useAuth } from "../context/AuthContext";
import {
  getAllProgress,
  isLessonComplete,
  percentComplete,
} from "../utils/progressStore";
import usePremium from "../utils/usePremium";

import ProgressBar from "../components/ProgressBar";
import Icon from "../components/Icon";
import NotFound from "./NotFound";

export default function Roadmap() {
  const { skillId } = useParams();
  const { user } = useAuth();

  // Hooks must always run in the same order.
  const { premium } = usePremium();

  const skill = skills.find(
    (s) => String(s.id) === skillId
  );

  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      if (!user) {
        setProgress({});
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const data = await getAllProgress();

        if (!cancelled) {
          setProgress(data || {});
        }
      } catch (error) {
        console.error(
          "Failed to load roadmap progress:",
          error
        );

        if (!cancelled) {
          setProgress({});
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProgress();

    return () => {
      cancelled = true;
    };
  }, [user]);

  if (!skill) return <NotFound />;

  const percent = user
    ? percentComplete(skill, progress)
    : 0;

  const relatedProjectIds =
    skill.projects || [];

  const coreStepCount =
    skill.roadmap.filter(
      (s) => !s.premium
    ).length;

  const completedCount = user
    ? skill.roadmap.filter((step) =>
        isLessonComplete(
          progress,
          skill.id,
          step.id
        )
      ).length
    : 0;

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <div className="breadcrumb">
            <Link to="/skills">
              Skills
            </Link>

            <Icon
              name="arrowRight"
              size={14}
            />

            <span>{skill.name}</span>
          </div>

          <div className="tag-row">
            <span className="tag">
              {skill.category}
            </span>

            <span className="tag tag-gray">
              {skill.level}
            </span>
          </div>

          <h1>{skill.name}</h1>

          <p>{skill.description}</p>
        </div>
      </div>

      <div className="page-body">
        <div className="container">
          <div className="dashboard-grid">
            <div>
              <div className="section-title-row">
                <h2>Roadmap</h2>

                <span className="text-muted text-sm">
                  {skill.roadmap.length} lessons
                </span>
              </div>

              {loading && user ? (
                <p className="text-sm text-muted">
                  Loading your progress...
                </p>
              ) : (
                <div className="roadmap-list">
                  {skill.roadmap.map(
                    (step, index) => {
                      const done = user
                        ? isLessonComplete(
                            progress,
                            skill.id,
                            step.id
                          )
                        : false;

                      const locked =
                        step.premium &&
                        !premium;

                      return (
                        <Link
                          to={`/learn/${skill.id}/${step.id}`}
                          key={step.id}
                          className="card-link"
                        >
                          <div className="roadmap-step">
                            <div
                              className={
                                "roadmap-step-status" +
                                (done
                                  ? " done"
                                  : "")
                              }
                            >
                              {done ? (
                                <Icon
                                  name="check"
                                  size={16}
                                />
                              ) : locked ? (
                                <Icon
                                  name="lock"
                                  size={15}
                                />
                              ) : (
                                <span>
                                  {index + 1}
                                </span>
                              )}
                            </div>

                            <div className="roadmap-step-body">
                              <h4>
                                {step.title}

                                {step.premium && (
                                  <span
                                    className="tag tag-amber"
                                    style={{
                                      marginLeft: 8,
                                    }}
                                  >
                                    Premium
                                  </span>
                                )}
                              </h4>

                              <p>
                                {step.description}
                              </p>
                            </div>

                            <Icon
                              name="arrowRight"
                              size={18}
                            />
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
              )}

              <p className="text-sm text-muted mt-16">
                {coreStepCount} core lessons, free
                for every learner
                {skill.roadmap.length >
                coreStepCount
                  ? ", plus one Premium deep-dive lesson."
                  : "."}
              </p>
            </div>

            <aside>
              <div className="lesson-sidebar">
                <h4>Your progress</h4>

                {user ? (
                  <>
                    <ProgressBar
                      percent={percent}
                    />

                    <p className="text-sm text-muted mt-16">
                      {completedCount} of{" "}
                      {skill.roadmap.length}{" "}
                      lessons complete.
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-muted">
                    <Link to="/register">
                      Create an account
                    </Link>{" "}
                    to save your progress on this
                    roadmap.
                  </p>
                )}

                {relatedProjectIds.length >
                  0 && (
                  <div className="mt-24">
                    <h4>
                      Related projects
                    </h4>

                    <p className="text-sm text-muted mt-8">
                      Once you have covered a
                      few lessons, put the skill
                      into practice.
                    </p>

                    <Link
                      to="/projects"
                      className="btn btn-secondary btn-block mt-16"
                    >
                      Browse projects
                    </Link>
                  </div>
                )}

                {user && percent === 100 && (
                  <div className="mt-24">
                    <h4>
                      Completion certificate
                    </h4>

                    <p className="text-sm text-muted mt-8">
                      {premium
                        ? "You have finished this roadmap. Generate your certificate."
                        : "You have finished this roadmap. Certificates are a Premium feature."}
                    </p>

                    <Link
                      to={`/certificate/${skill.id}`}
                      className="btn btn-accent btn-block mt-16"
                    >
                      <Icon
                        name={
                          premium
                            ? "checkCircle"
                            : "lock"
                        }
                        size={16}
                      />

                      {premium
                        ? "View certificate"
                        : "Unlock certificate"}
                    </Link>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
