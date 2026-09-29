import React from "react";
import { Link } from "react-router-dom";
import Icon from "./Icon";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="brand footer-brand">
            <span className="brand-mark" aria-hidden="true"><Icon name="bridge" size={18} /></span>
            <span className="brand-name">SkillBridge <span className="brand-ng">NG</span></span>
          </div>
          <p className="footer-tagline">
            Learn a skill, build a real project, showcase it, and find your next opportunity.
          </p>
        </div>

        <div className="footer-col">
          <h4>Platform</h4>
          <Link to="/skills">Skills</Link>
          <Link to="/projects">Projects</Link>
          <Link to="/opportunities">Opportunities</Link>
          <Link to="/subscribe">Premium</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="footer-col">
          <h4>Account</h4>
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms &amp; Conditions</Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>Copyright {year} SkillBridge NG. All rights reserved.</span>
        <span className="footer-note">Built for learners in Nigeria. This is an MVP: accounts and progress are stored in your browser only.</span>
      </div>
    </footer>
  );
}
