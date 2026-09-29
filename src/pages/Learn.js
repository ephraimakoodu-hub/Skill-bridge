import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { skills } from "../data/Data";
import { deepDives } from "../data/deepDives";
import { useAuth } from "../context/AuthContext";

import {
  getAllProgress,
  markStepComplete,
  percentComplete,
  isLessonComplete,
} from "../utils/progressStore";

import usePremium from "../utils/usePremium";

import ProgressBar from "../components/ProgressBar";
import Banner from "../components/Banner";
import Icon from "../components/Icon";
import NotFound from "./NotFound";

export default function Learn() {
  const { skillId, stepId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Hooks must always run in the same order.
  const { premium } = usePremium();

  const [progress, setProgress] = useState({});
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [saving, setSaving] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const [progressError, setProgressError] = useState("");

  const skill = skills.find(
    (s) => String(s.id) === skillId
  );

  const stepIndex = skill
    ? skill.roadmap.findIndex(
        (s) => String(s.id) === stepId
      )
    : -1;

  const step = skill
    ? skill.roadmap[stepIndex]
    : null;

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      if (!user) {
        setProgress({});
        setLoadingProgress(false);
        return;
      }

      try {
        setLoadingProgress(true);
        setProgressError("");

        const data = await getAllProgress();

        if (!cancelled) {
          setProgress(data);
        }
      } catch (error) {
        console.error(
          "Failed to load progress:",
          error
        );

        if (!cancelled) {
          setProgressError(
            "We couldn't load your progress. Please refresh and try again."
          );
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

  if (!skill || !step) {
    return <NotFound />;
  }

  const lesson = step.lesson;

  const isDone = isLessonComplete(
    progress,
    skill.id,
    step.id
  );

  const percent = user
    ? percentComplete(skill, progress)
    : 0;

  const locked = !!step.premium && !premium;

  const deepDive =
    deepDives[skill.id] &&
    deepDives[skill.id][step.id];

  const prevStep =
    skill.roadmap[stepIndex - 1];

  const nextStep =
    skill.roadmap[stepIndex + 1];

  async function handleComplete() {
    if (!user) {
      navigate("/login", {
        state: {
          from: `/learn/${skill.id}/${step.id}`,
        },
      });

      return;
    }

    try {
      setSaving(true);
      setProgressError("");

      const savedProgress =
        await markStepComplete(
          skill.id,
          step.id
        );

      const lessonId = `${skill.id}-${step.id}`;

      setProgress((current) => ({
        ...current,
        [lessonId]: {
          completed:
            savedProgress.completed,
          completedAt:
            savedProgress.completedAt,
        },
      }));

      setJustCompleted(true);
    } catch (error) {
      console.error(
        "Failed to save lesson progress:",
        error
      );

      setProgressError(
        "We couldn't save your progress. Please try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-body">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/skills">
            Skills
          </Link>

          <Icon
            name="arrowRight"
            size={14}
          />

          <Link
            to={`/roadmap/${skill.id}`}
          >
            {skill.name}
          </Link>

          <Icon
            name="arrowRight"
            size={14}
          />

          <span>{step.title}</span>
        </div>

        {!user && (
          <Banner type="info">
            You are viewing this lesson without an
            account.{" "}
            <Link to="/register">
              Register
            </Link>{" "}
            to save your progress.
          </Banner>
        )}

        {progressError && (
          <Banner type="error">
            {progressError}
          </Banner>
        )}

        {justCompleted && (
          <Banner type="success">
            Lesson marked complete.
          </Banner>
        )}

        <div className="lesson-layout">
          <article className="lesson-content">
            <div
              className="flex-row"
              style={{
                justifyContent:
                  "space-between",
              }}
            >
              <h1>{step.title}</h1>

              {step.premium && (
                <span className="tag tag-amber">
                  Premium
                </span>
              )}
            </div>

            <p className="text-muted mt-8 mb-16">
              {lesson.introduction}
            </p>

            {locked ? (
              <div
                className="task-box"
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
                  Premium lesson
                </span>

                <h3 className="mt-16">
                  Unlock this deep-dive to
                  keep going
                </h3>

                <p className="mt-8">
                  This is one of the Advanced
                  lessons included with Premium.
                </p>

                <Link
                  to="/subscribe"
                  className="btn btn-accent mt-16"
                >
                  <Icon
                    name="checkCircle"
                    size={16}
                  />
                  Unlock Premium
                </Link>
              </div>
            ) : (
              <>
                <section>
                  <h2>
                    What you will learn
                  </h2>

                  <ul className="bullet-list">
                    {lesson.whatYouWillLearn.map(
                      (item, i) => (
                        <li key={i}>
                          <Icon
                            name="check"
                            size={16}
                            style={{
                              marginTop: 3,
                              color:
                                "var(--teal-700)",
                            }}
                          />

                          {item}
                        </li>
                      )
                    )}
                  </ul>
                </section>

                {lesson.whyItMatters && (
                  <section>
                    <h2>
                      Why this matters
                    </h2>

                    <p>
                      {lesson.whyItMatters}
                    </p>
                  </section>
                )}

                {lesson.sections.map(
                  (section, i) => (
                    <section key={i}>
                      <h2>
                        {section.title}
                      </h2>

                      <p>
                        {section.content}
                      </p>
                    </section>
                  )
                )}

                {lesson.example && (
                  <section>
                    <h2>
                      {lesson.example.title}
                    </h2>

                    <pre className="code-block">
                      <code>
                        {lesson.example.code}
                      </code>
                    </pre>
                  </section>
                )}

                {lesson.task && (
                  <section>
                    <div className="task-box">
                      <span className="tag tag-amber">
                        Practice task
                      </span>

                      <h3 className="mt-8">
                        {lesson.task.title}
                      </h3>

                      <p className="mt-8">
                        {lesson.task.description}
                      </p>

                      <ul className="bullet-list mt-8">
                        {lesson.task.requirements.map(
                          (r, i) => (
                            <li key={i}>
                              <Icon
                                name="circle"
                                size={14}
                                style={{
                                  marginTop: 4,
                                  color:
                                    "var(--amber-600)",
                                }}
                              />

                              {r}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </section>
                )}

                {lesson.commonMistakes && (
                  <section>
                    <h2>
                      Common mistakes
                    </h2>

                    <ul className="bullet-list">
                      {lesson.commonMistakes.map(
                        (m, i) => (
                          <li key={i}>
                            <Icon
                              name="alert"
                              size={15}
                              style={{
                                marginTop: 3,
                                color:
                                  "var(--amber-600)",
                              }}
                            />

                            {m}
                          </li>
                        )
                      )}
                    </ul>
                  </section>
                )}

                {lesson.keyTakeaways && (
                  <section>
                    <h2>
                      Key takeaways
                    </h2>

                    <ul className="bullet-list">
                      {lesson.keyTakeaways.map(
                        (k, i) => (
                          <li key={i}>
                            <Icon
                              name="check"
                              size={16}
                              style={{
                                marginTop: 3,
                                color:
                                  "var(--teal-700)",
                              }}
                            />

                            {k}
                          </li>
                        )
                      )}
                    </ul>
                  </section>
                )}

                {deepDive && (
                  <section>
                    {premium ? (
                      <div
                        className="task-box"
                        style={{
                          borderColor:
                            "var(--amber-500)",
                        }}
                      >
                        <span className="tag tag-amber">
                          <Icon
                            name="sparkle"
                            size={13}
                          />
                          Go deeper (Premium)
                        </span>

                        <h3 className="mt-16">
                          {deepDive.heading}
                        </h3>

                        <p className="mt-8">
                          {deepDive.paragraph}
                        </p>

                        <h4 className="mt-16 text-sm">
                          Watch out for
                        </h4>

                        <ul className="bullet-list mt-8">
                          {deepDive.proTips.map(
                            (tip, i) => (
                              <li key={i}>
                                <Icon
                                  name="alert"
                                  size={15}
                                  style={{
                                    marginTop: 3,
                                    color:
                                      "var(--amber-600)",
                                  }}
                                />

                                {tip}
                              </li>
                            )
                          )}
                        </ul>

                        <div
                          className="mt-16"
                          style={{
                            borderTop:
                              "1px solid var(--gray-200)",
                            paddingTop: 14,
                          }}
                        >
                          <span className="tag tag-gray">
                            Harder challenge
                          </span>

                          <p className="mt-8">
                            {deepDive.challenge}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="task-box"
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
                          />
                          Go deeper (Premium)
                        </span>

                        <h3 className="mt-16">
                          {deepDive.heading}
                        </h3>

                        <p className="mt-8">
                          Premium members get a
                          deeper layer on every
                          lesson in every skill.
                        </p>

                        <Link
                          to="/subscribe"
                          className="btn btn-accent mt-16"
                        >
                          <Icon
                            name="checkCircle"
                            size={16}
                          />
                          Unlock Premium
                        </Link>
                      </div>
                    )}
                  </section>
                )}
              </>
            )}

            <div className="lesson-nav">
              <div>
                {prevStep ? (
                  <Link
                    to={`/learn/${skill.id}/${prevStep.id}`}
                    className="btn btn-secondary"
                  >
                    <Icon
                      name="arrowLeft"
                      size={16}
                    />
                    {prevStep.title}
                  </Link>
                ) : (
                  <Link
                    to={`/roadmap/${skill.id}`}
                    className="btn btn-secondary"
                  >
                    <Icon
                      name="arrowLeft"
                      size={16}
                    />
                    Back to roadmap
                  </Link>
                )}
              </div>

              <div className="flex-row">
                {!locked && !isDone && (
                  <button
                    className="btn btn-primary"
                    onClick={handleComplete}
                    disabled={
                      saving ||
                      loadingProgress
                    }
                  >
                    <Icon
                      name="check"
                      size={16}
                    />

                    {saving
                      ? "Saving..."
                      : "Mark lesson complete"}
                  </button>
                )}

                {nextStep ? (
                  <Link
                    to={`/learn/${skill.id}/${nextStep.id}`}
                    className="btn btn-accent"
                  >
                    Next lesson
                    <Icon
                      name="arrowRight"
                      size={16}
                    />
                  </Link>
                ) : (
                  <Link
                    to="/projects"
                    className="btn btn-accent"
                  >
                    Start a project
                    <Icon
                      name="arrowRight"
                      size={16}
                    />
                  </Link>
                )}
              </div>
            </div>
          </article>

          <aside className="lesson-sidebar">
            <h4>{skill.name}</h4>

            {user ? (
              <ProgressBar
                percent={percent}
                label="Roadmap progress"
              />
            ) : (
              <p className="text-sm text-muted">
                Log in to track your progress.
              </p>
            )}

            <ul
              className="mt-16"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 6,
              }}
            >
              {skill.roadmap.map((s, i) => {
                const done =
                  isLessonComplete(
                    progress,
                    skill.id,
                    s.id
                  );

                const active =
                  String(s.id) === stepId;

                const stepLocked =
                  !!s.premium && !premium;

                return (
                  <li key={s.id}>
                    <Link
                      to={`/learn/${skill.id}/${s.id}`}
                      className="nav-link"
                      style={{
                        display: "flex",
                        alignItems:
                          "center",
                        gap: 8,
                        background: active
                          ? "var(--teal-100)"
                          : "transparent",
                        color: active
                          ? "var(--teal-900)"
                          : "var(--ink-700)",
                      }}
                    >
                      {done ? (
                        <Icon
                          name="checkCircle"
                          size={15}
                          style={{
                            color:
                              "var(--success)",
                          }}
                        />
                      ) : stepLocked ? (
                        <Icon
                          name="lock"
                          size={14}
                          style={{
                            color:
                              "var(--amber-600)",
                          }}
                        />
                      ) : (
                        <Icon
                          name="circle"
                          size={15}
                        />
                      )}

                      <span className="text-sm">
                        {i + 1}. {s.title}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}
