import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCompletedProjectIds } from "../utils/projectStore";
import { getAllProgress, percentComplete } from "../utils/progressStore";
import { skills } from "../data/Data";
import Icon from "../components/Icon";

export default function Profile() {
  const { user } = useAuth();
  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();

  const completedProjects = getCompletedProjectIds(user.id).length;
  const allProgress = getAllProgress(user.id);
  const skillsStarted = skills.filter((s) => allProgress[s.id]);
  const skillsCompleted = skillsStarted.filter((s) => percentComplete(user.id, s) === 100).length;

  return (
    <div className="page-body">
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="showcase-header">
          <div className="avatar-circle">{initials}</div>
          <div>
            <h1>{user.name}</h1>
            <p className="text-muted">{user.email}</p>
          </div>
        </div>

        {user.bio && <p className="mb-16">{user.bio}</p>}
        {user.location && (
          <p className="flex-row text-sm text-muted mb-16">
            <Icon name="mapPin" size={14} /> {user.location}
          </p>
        )}

        <div className="stat-row">
          <div className="stat-card">
            <div className="stat-value">{skillsStarted.length}</div>
            <div className="stat-label">Skills started</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{skillsCompleted}</div>
            <div className="stat-label">Skills completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{completedProjects}</div>
            <div className="stat-label">Projects completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{new Date(user.createdAt).getFullYear()}</div>
            <div className="stat-label">Member since</div>
          </div>
        </div>

        <div className="flex-row mt-24">
          <Link to="/portfolio" className="btn btn-primary">
            <Icon name="showcase" size={16} /> View my showcase
          </Link>
          <Link to="/progress" className="btn btn-secondary">
            <Icon name="book" size={16} /> View learning progress
          </Link>
          <Link to="/settings" className="btn btn-secondary">
            <Icon name="settings" size={16} /> Edit profile
          </Link>
        </div>
      </div>
    </div>
  );
}
