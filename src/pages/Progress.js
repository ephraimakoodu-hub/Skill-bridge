import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { skills } from "../data/Data";
import { useAuth } from "../context/AuthContext";
import {
  getAllProgress,
  isLessonComplete,
  percentComplete,
} from "../utils/progressStore";
import usePremium from "../utils/usePremium";
import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";

export default function Progress() {
  const { user } = useAuth();
  const { premium } = usePremium();

  const [progress, setProgress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadProgress() {
      try {
        setLoading(true);

        const data = await getAllProgress();

        if (!cancelled) {
          setProgress(data || {});
        }
      } catch (error) {
        console.error("Failed to load learning progress:", error);

        if (!cancelled) {
          setProgress({});
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    if (user) {
      loadProgress();
    } else {
      setLoading(false);
    }

    return () => {
      cancelled = true;
    };
  }, [user]);

  const started = skills.filter((skill) => {
    if (!skill.roadmap || skill.roadmap.length === 0) {
      return false;
    }

    return skill.roadmap.some((lesson) =>
      isLessonComplete(progress, skill.id, lesson.id)
    );
  });

  if (loading) {
    return (
      <div className="page-body">
        <div className="container">
          <h1>Your learning progress</h1>
          <p className="text-muted mt-8">
            Loading your learning progress...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-body">
      <div className="container">
        <h1>Your learning progress</h1>

        <p className="text-muted mt-8">
          A detailed view of every skill you have started.
        </p>

        {started.length === 0 ? (
          <EmptyState
            icon="book"
            title="You have not started a skill yet"
            message="Pick a roadmap and complete your first lesson to see your progress here."
            action={
              <Link to="/skills" className="btn btn-primary">
                Browse skills
              </Link>
            }
          />
        ) : (
          <div
            className="mt-24"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            {started.map((skill) => {
              const completedLessons = skill.roadmap.filter((lesson) =>
                isLessonComplete(progress, skill.id, lesson.id)
              ).length;

              const percent = percentComplete(skill, progress);
              const finished = percent === 100;

              return (
                <div className="card" key={skill.id}>
                  <div className="flex-between">
                    <div>
                      <h3>{skill.name}</h3>

                      <p className="text-sm text-muted">
                        {completedLessons} of {skill.roadmap.length} lessons
                        complete
                      </p>
                    </div>

                    <div className="flex-row">
                      {finished && (
                        <Link
                          to={`/certificate/${skill.id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          <Icon
                            name={premium ? "checkCircle" : "lock"}
                            size={14}
                          />
                          Certificate
                        </Link>
                      )}

                      <Link
                        to={`/roadmap/${skill.id}`}
                        className="btn btn-secondary btn-sm"
                      >
                        Continue
                        <Icon name="arrowRight" size={14} />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-16">
                    <ProgressBar percent={percent} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}