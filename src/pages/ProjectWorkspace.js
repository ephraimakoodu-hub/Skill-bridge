import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { projects } from "../data/Data";
import { useAuth } from "../context/AuthContext";

import {
  getProjectState,
  startProject,
  saveProjectWork,
  completeProject,
  reopenProject,
  STATUS,
} from "../utils/projectApi";

import usePremium from "../utils/usePremium";
import { cleanText } from "../utils/validate";

import Icon from "../components/Icon";
import Banner from "../components/Banner";
import NotFound from "./NotFound";

export default function ProjectWorkspace() {
  const { projectId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const project = projects.find(
    (p) => String(p.id) === projectId
  );

  const [checklist, setChecklist] = useState({});
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState(
    STATUS.NOT_STARTED
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [savedMessage, setSavedMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const { premium } = usePremium();

  const locked = !!(
    project &&
    project.premium &&
    !premium
  );

  /*
   * These are external tools learners can use to actually
   * build, store, and publish their projects.
   *
   * SkillBridge remains the learning/project tracker.
   * The actual coding happens in dedicated development tools.
   */
  const projectTools = useMemo(() => {
    if (!project) {
      return [];
    }

    const projectText = [
      project.title,
      ...(project.skills || []),
    ]
      .join(" ")
      .toLowerCase();

    const tools = [
      {
        name: "VS Code",
        description:
          "Write and edit your project code on your computer.",
        url: "https://code.visualstudio.com/",
        label: "Open VS Code",
      },
      {
        name: "GitHub",
        description:
          "Store your code, track changes, and keep your project portfolio-ready.",
        url: "https://github.com/",
        label: "Open GitHub",
      },
    ];

    const isWebProject =
      projectText.includes("html") ||
      projectText.includes("css") ||
      projectText.includes("javascript") ||
      projectText.includes("web") ||
      projectText.includes("react") ||
      projectText.includes("frontend") ||
      projectText.includes("portfolio");

    const isReactProject =
      projectText.includes("react");

    if (isWebProject) {
      tools.push({
        name: "CodePen",
        description:
          "Experiment with HTML, CSS, and JavaScript directly in your browser.",
        url: "https://codepen.io/",
        label: "Open CodePen",
      });
    }

    if (isReactProject) {
      tools.push({
        name: "StackBlitz",
        description:
          "Build and experiment with web applications directly in your browser.",
        url: "https://stackblitz.com/",
        label: "Open StackBlitz",
      });
    }

    if (isWebProject) {
      tools.push({
        name: "Netlify",
        description:
          "Publish a finished website and get a shareable live URL.",
        url: "https://www.netlify.com/",
        label: "Open Netlify",
      });
    }

    return tools;
  }, [project]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      if (!user || !project || locked) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setSavedMessage("");

        let state = await getProjectState(project.id);

        if (state.status === STATUS.NOT_STARTED) {
          state = await startProject(project.id);
        }

        if (cancelled) {
          return;
        }

        setChecklist(state.checklist || {});
        setNotes(state.notes || "");
        setStatus(
          state.status || STATUS.IN_PROGRESS
        );
      } catch (error) {
        console.error(
          "Failed to load project workspace:",
          error
        );

        if (!cancelled) {
          setMessageType("error");
          setSavedMessage(
            error.message ||
              "Unable to load your project workspace."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [user, project, locked]);

  if (!project) {
    return <NotFound />;
  }

  if (locked) {
    return (
      <div className="page-body">
        <div
          className="container"
          style={{ maxWidth: 640 }}
        >
          <div
            className="task-box"
            style={{
              background: "var(--teal-100)",
              borderColor: "var(--teal-700)",
            }}
          >
            <span className="tag">
              <Icon name="lock" size={13} /> Premium project
            </span>

            <h2 className="mt-16">
              This project requires Premium
            </h2>

            <p className="mt-8">
              Upgrade to unlock the {project.title} checklist
              and start building.
            </p>

            <div className="flex-row mt-16">
              <Link
                to="/subscribe"
                className="btn btn-accent"
              >
                Unlock Premium
              </Link>

              <Link
                to={`/projects/${project.id}`}
                className="btn btn-secondary"
              >
                Back to project
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="page-body">
        <div className="container">
          <p className="text-muted">
            Loading your project workspace...
          </p>
        </div>
      </div>
    );
  }

  const totalItems = Array.isArray(project.checklist)
    ? project.checklist.length
    : 0;

  const checkedCount = Object.values(checklist).filter(
    Boolean
  ).length;

  const allChecked =
    totalItems > 0 && checkedCount === totalItems;

  function showMessage(message, type = "success") {
    setMessageType(type);
    setSavedMessage(message);
  }

  function toggleItem(index) {
    setChecklist((current) => ({
      ...current,
      [index]: !current[index],
    }));

    setSavedMessage("");
  }

  async function handleSave() {
    try {
      setSaving(true);
      setSavedMessage("");

      const cleanedNotes = cleanText(notes, 4000);

      const saved = await saveProjectWork(project.id, {
        checklist,
        notes: cleanedNotes,
      });

      setChecklist(saved.checklist || {});
      setNotes(saved.notes || "");

      showMessage(
        "Progress saved to your account.",
        "success"
      );
    } catch (error) {
      console.error(
        "Failed to save project progress:",
        error
      );

      showMessage(
        error.message || "Unable to save progress.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleComplete() {
    if (!allChecked) {
      return;
    }

    try {
      setSaving(true);
      setSavedMessage("");

      const cleanedNotes = cleanText(notes, 4000);

      const saved = await completeProject(project.id, {
        checklist,
        notes: cleanedNotes,
      });

      setChecklist(saved.checklist || {});
      setNotes(saved.notes || "");
      setStatus(STATUS.COMPLETED);

      showMessage(
        "Project marked complete and added to your showcase.",
        "success"
      );
    } catch (error) {
      console.error(
        "Failed to complete project:",
        error
      );

      showMessage(
        error.message || "Unable to complete project.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleReopen() {
    try {
      setSaving(true);
      setSavedMessage("");

      const saved = await reopenProject(project.id);

      setStatus(saved.status);

      showMessage(
        "Project reopened.",
        "success"
      );
    } catch (error) {
      console.error(
        "Failed to reopen project:",
        error
      );

      showMessage(
        error.message || "Unable to reopen project.",
        "error"
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="page-body">
      <div className="container">
        <div className="breadcrumb">
          <Link to="/projects">Projects</Link>

          <Icon name="arrowRight" size={14} />

          <Link to={`/projects/${project.id}`}>
            {project.title}
          </Link>

          <Icon name="arrowRight" size={14} />

          <span>Build</span>
        </div>

        <div className="flex-between">
          <div>
            <h1>{project.title}</h1>

            <p className="text-muted">
              Follow the checklist, use the recommended
              tools to build your project, save your work,
              and mark it complete when you are finished.
            </p>
          </div>

          <span
            className={
              "status-pill " +
              (status === STATUS.COMPLETED
                ? "status-completed"
                : "status-in-progress")
            }
          >
            {status === STATUS.COMPLETED
              ? "Completed"
              : "In progress"}
          </span>
        </div>

        {savedMessage && (
          <div className="mt-16">
            <Banner type={messageType}>
              {savedMessage}
            </Banner>
          </div>
        )}

        <div className="workspace-layout mt-24">
          <div>
            <h2>Build checklist</h2>

            <p className="text-sm text-muted mt-8 mb-16">
              {checkedCount} of {totalItems} steps checked
              off.
            </p>

            <div className="checklist">
              {project.checklist.map((item, index) => (
                <label
                  key={index}
                  className={
                    "checklist-item" +
                    (checklist[index] ? " checked" : "")
                  }
                >
                  <input
                    type="checkbox"
                    checked={!!checklist[index]}
                    onChange={() => toggleItem(index)}
                    disabled={saving}
                  />

                  <span>{item}</span>
                </label>
              ))}
            </div>

            <div className="task-box mt-32">
              <h3>Build your project</h3>

              <p className="text-sm text-muted mt-8">
                SkillBridge guides you through the project,
                but you build the actual project using a
                development tool. Choose a tool below and
                work through the checklist as you build.
              </p>

              <div
                className="grid grid-2 mt-16"
                style={{ gap: 12 }}
              >
                {projectTools.map((tool) => (
                  <div
                    key={tool.name}
                    className="card"
                    style={{ margin: 0 }}
                  >
                    <h4>{tool.name}</h4>

                    <p className="text-sm text-muted mt-8">
                      {tool.description}
                    </p>

                    <a
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm mt-16"
                    >
                      {tool.label}

                      <Icon
                        name="arrowRight"
                        size={14}
                      />
                    </a>
                  </div>
                ))}
              </div>

              <div className="banner banner-info mt-16">
                <Icon
                  name="checkCircle"
                  size={18}
                />

                <span>
                  You do not need to write your code inside
                  SkillBridge. Build it with the tools above,
                  then use the notes below to save your
                  repository link, live URL, screenshots,
                  and other project details.
                </span>
              </div>
            </div>

            <h3 className="mt-32">
              Project notes
            </h3>

            <p className="text-sm text-muted mt-8 mb-8">
              This is your project notebook. Add your GitHub
              repository, live website link, screenshots,
              challenges, things you learned, or anything
              else you want to remember about the project.
            </p>

            <textarea
              className="form-textarea"
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              disabled={saving}
              maxLength={4000}
              placeholder={
                "Example:\n\nGitHub: https://github.com/username/my-project\nLive site: https://my-project.netlify.app\n\nWhat I learned:\n- Responsive CSS\n- Git and GitHub\n- Deploying a website\n\nChallenges:\n- Making the navigation work on mobile"
              }
            />

            <p className="text-sm text-muted mt-8">
              {notes.length}/4000 characters
            </p>

            <div className="flex-row mt-24">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleSave}
                disabled={saving}
              >
                <Icon name="check" size={16} />

                {saving
                  ? "Saving..."
                  : "Save progress"}
              </button>

              {status !== STATUS.COMPLETED ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleComplete}
                  disabled={saving || !allChecked}
                >
                  <Icon
                    name="checkCircle"
                    size={16}
                  />

                  Mark project complete
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={handleReopen}
                  disabled={saving}
                >
                  Reopen project
                </button>
              )}
            </div>

            {status !== STATUS.COMPLETED &&
              !allChecked && (
                <p className="text-sm text-muted mt-8">
                  Check off every requirement to mark this
                  project complete.
                </p>
              )}
          </div>

          <aside className="lesson-sidebar">
            <h4>About this project</h4>

            <p className="text-sm mt-8">
              {project.description}
            </p>

            <div className="tag-row mt-16">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="tag tag-gray"
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="task-box mt-24">
              <h4>How this works</h4>

              <p className="text-sm text-muted mt-8">
                Learn the skills in SkillBridge, build the
                project using the recommended tools, keep
                your project links and notes here, then
                complete the checklist.
              </p>
            </div>

            {status === STATUS.COMPLETED && (
              <button
                type="button"
                className="btn btn-accent btn-block mt-24"
                onClick={() => navigate("/portfolio")}
              >
                View in showcase

                <Icon
                  name="arrowRight"
                  size={16}
                />
              </button>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}