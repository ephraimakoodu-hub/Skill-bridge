import React from "react";
import { Link } from "react-router-dom";
import { skills, projects, opportunities } from "../data/Data";
import { useAuth } from "../context/AuthContext";
import Icon from "../components/Icon";

export default function Home() {
  const { user } = useAuth();
  const featuredSkills = skills.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <span className="hero-eyebrow">SkillBridge NG</span>
            <h1>Learn a practical skill, then prove you can use it.</h1>
            <p className="lead">
              Follow a step-by-step roadmap in a skill like web development or UI/UX design,
              build a real project from your progress, showcase the finished work in a
              portfolio, and discover internships and roles looking for people at your level.
            </p>
            <div className="hero-actions">
              <Link to={user ? "/skills" : "/register"} className="btn btn-accent btn-lg">
                {user ? "Continue learning" : "Create your free account"}
              </Link>
              <Link to="/skills" className="btn btn-secondary btn-lg" style={{ background: "transparent", borderColor: "rgba(255,255,255,0.4)", color: "#fff" }}>
                Browse skills
              </Link>
            </div>
            <div className="hero-stats">
              <div>
                <div className="hero-stat-value">{skills.length} skill roadmaps</div>
                <div className="hero-stat-label">from beginner to project-ready</div>
              </div>
              <div>
                <div className="hero-stat-value">{projects.length} guided projects</div>
                <div className="hero-stat-label">to build and showcase</div>
              </div>
              <div>
                <div className="hero-stat-value">{opportunities.length} open opportunities</div>
                <div className="hero-stat-label">to apply what you learn</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="tag">How it works</span>
            <h2 className="mt-16">One path, four steps</h2>
            <p>SkillBridge NG is built around a single loop: learn, build, showcase, grow.</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3>Learn</h3>
              <p>Work through a structured roadmap for one skill, one lesson at a time.</p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h3>Build</h3>
              <p>Start a real project tied to that skill and track each requirement as you finish it.</p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h3>Showcase</h3>
              <p>Completed projects appear automatically in your public showcase page.</p>
            </div>
            <div className="step-card">
              <span className="step-number">4</span>
              <h3>Grow</h3>
              <p>Browse and save opportunities that match the skills you have been building.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-title-row">
            <h2>Popular skills</h2>
            <Link to="/skills" className="btn btn-ghost">
              View all skills <Icon name="arrowRight" size={16} />
            </Link>
          </div>
          <div className="grid grid-3">
            {featuredSkills.map((skill) => (
              <Link to={`/roadmap/${skill.id}`} key={skill.id} className="card-link">
                <div className="card">
                  <div className="tag-row">
                    <span className="tag">{skill.category}</span>
                    <span className="tag tag-gray">{skill.level}</span>
                  </div>
                  <h3>{skill.name}</h3>
                  <p className="card-desc">{skill.description}</p>
                  <div className="card-footer">
                    <span>{skill.roadmap.length} lessons</span>
                    <Icon name="arrowRight" size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ padding: "40px", textAlign: "center", background: "var(--teal-100)", border: "none" }}>
            <h2>Ready to start with your first skill?</h2>
            <p style={{ maxWidth: 480, margin: "10px auto 22px" }}>
              Pick a roadmap, complete the first lesson today, and start a project as soon as you are ready.
            </p>
            <Link to={user ? "/skills" : "/register"} className="btn btn-primary btn-lg">
              {user ? "Go to skills" : "Get started for free"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
