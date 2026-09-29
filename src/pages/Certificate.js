
import React from "react";
import { Link, useParams } from "react-router-dom";

import { skills } from "../data/Data";
import { useAuth } from "../context/AuthContext";
import { percentComplete } from "../utils/progressStore";
import usePremium from "../utils/usePremium";

import Icon from "../components/Icon";
import NotFound from "./NotFound";

export default function Certificate() {
  const { skillId } = useParams();
  const { user } = useAuth();

  // Hooks must always run before any conditional return.
  const { premium } = usePremium();

  const skill = skills.find(
    (s) => String(s.id) === skillId
  );

  if (!skill) {
    return <NotFound />;
  }

  const percent = percentComplete(user.id, skill);
  const completed = percent === 100;

  if (!premium) {
    return (
      <div className="page-body">
        <div
          className="container"
          style={{ maxWidth: 560 }}
        >
          <div
            className="task-box"
            style={{
              background: "var(--teal-100)",
              borderColor: "var(--teal-700)",
            }}
          >
            <span className="tag">
              <Icon name="lock" size={13} /> Premium
              feature
            </span>

            <h2 className="mt-16">
              Certificates are a Premium feature
            </h2>

            <p className="mt-8">
              Upgrade to generate a printable
              completion certificate for any skill
              you finish.
            </p>

            <Link
              to="/subscribe"
              className="btn btn-accent mt-16"
            >
              Unlock Premium
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!completed) {
    return (
      <div className="page-body">
        <div
          className="container"
          style={{ maxWidth: 560 }}
        >
          <div className="task-box">
            <h2>Not finished yet</h2>

            <p className="mt-8">
              You are {percent}% through{" "}
              {skill.name}. Complete every lesson in
              the roadmap, including the Advanced
              lesson, to unlock this certificate.
            </p>

            <Link
              to={`/roadmap/${skill.id}`}
              className="btn btn-primary mt-16"
            >
              Continue roadmap
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const dateStr = new Date().toLocaleDateString(
    "en-NG",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  return (
    <div className="page-body">
      <div
        className="container no-print"
        style={{
          maxWidth: 800,
          marginBottom: 20,
        }}
      >
        <div className="breadcrumb">
          <Link to="/progress">
            Progress
          </Link>

          <Icon
            name="arrowRight"
            size={14}
          />

          <span>Certificate</span>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => window.print()}
        >
          <Icon
            name="checkCircle"
            size={16}
          />{" "}
          Print or save as PDF
        </button>
      </div>

      <div
        className="container"
        style={{ maxWidth: 800 }}
      >
        <div className="certificate-card">
          <div className="certificate-mark">
            <Icon
              name="bridge"
              size={22}
            />
          </div>

          <p className="certificate-eyebrow">
            SkillBridge NG certifies that
          </p>

          <h1 className="certificate-name">
            {user.name}
          </h1>

          <p className="certificate-body">
            has completed the full roadmap for
          </p>

          <h2 className="certificate-skill">
            {skill.name}
          </h2>

          <p className="certificate-body">
            including all {skill.roadmap.length}{" "}
            lessons and the Advanced Premium module,
            demonstrating practical understanding of{" "}
            {skill.category.toLowerCase()} at a{" "}
            {skill.level.toLowerCase()} to job-ready
            level.
          </p>

          <div className="certificate-footer">
            <span>Issued {dateStr}</span>
            <span>SkillBridge NG</span>
          </div>
        </div>

        <p className="text-sm text-muted mt-16 no-print">
          This certificate reflects completion of
          SkillBridge NG's own roadmap and is not an
          accredited qualification from an external
          institution. It is best used alongside your
          showcase projects as evidence of what you
          can do.
        </p>
      </div>
    </div>
  );
}
