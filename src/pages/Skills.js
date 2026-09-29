import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { skills } from "../data/Data";
import { useAuth } from "../context/AuthContext";
import { percentComplete } from "../utils/progressStore";
import ProgressBar from "../components/ProgressBar";
import EmptyState from "../components/EmptyState";
import Icon from "../components/Icon";

export default function Skills() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => ["All", ...new Set(skills.map((s) => s.category))], []);

  const filtered = skills.filter((s) => {
    const matchesQuery = s.name.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = category === "All" || s.category === category;
    return matchesQuery && matchesCategory;
  });

  return (
    <div>
      <div className="page-header">
        <div className="container">
          <h1>Skills &amp; roadmaps</h1>
          <p>Choose a skill and follow its roadmap lesson by lesson. Your progress is saved as you go.</p>
        </div>
      </div>

      <div className="page-body">
        <div className="container">
          <div className="filter-bar">
            <div className="search-input-wrap">
              <Icon name="search" size={16} />
              <input
                className="form-input"
                placeholder="Search skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select className="form-select" style={{ width: "auto" }} value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              icon="search"
              title="No skills match your search"
              message="Try a different keyword or clear the category filter."
            />
          ) : (
            <div className="grid grid-3">
              {filtered.map((skill) => {
                const percent = user ? percentComplete(user.id, skill) : 0;
                return (
                  <Link to={`/roadmap/${skill.id}`} key={skill.id} className="card-link">
                    <div className="card">
                      <div className="tag-row">
                        <span className="tag">{skill.category}</span>
                        <span className="tag tag-gray">{skill.level}</span>
                      </div>
                      <h3>{skill.name}</h3>
                      <p className="card-desc">{skill.description}</p>
                      {user && percent > 0 ? (
                        <ProgressBar percent={percent} label="Your progress" />
                      ) : (
                        <p className="text-sm text-muted">{skill.roadmap.length} lessons</p>
                      )}
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
