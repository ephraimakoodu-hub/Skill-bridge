import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import usePremium from "../utils/usePremium";
import Icon from "./Icon";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { premium } = usePremium();

  function handleLogout() {
    logout();
    setOpen(false);
    navigate("/");
  }

  const navLink = ({ isActive }) => "nav-link" + (isActive ? " nav-link-active" : "");

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <NavLink to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-mark" aria-hidden="true">
            <Icon name="bridge" size={18} />
          </span>
          <span className="brand-name">SkillBridge <span className="brand-ng">NG</span></span>
        </NavLink>

        <button
          className="navbar-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>

        <nav className={"navbar-links" + (open ? " navbar-links-open" : "")}>
          <NavLink to="/skills" className={navLink} onClick={() => setOpen(false)}>Learn</NavLink>
          <NavLink to="/projects" className={navLink} onClick={() => setOpen(false)}>Build</NavLink>
          <NavLink to="/opportunities" className={navLink} onClick={() => setOpen(false)}>Opportunities</NavLink>
          <NavLink to="/about" className={navLink} onClick={() => setOpen(false)}>About</NavLink>

          <div className="navbar-divider" />

          {user ? (
            <>
              <NavLink to="/dashboard" className={navLink} onClick={() => setOpen(false)}>Dashboard</NavLink>
              <NavLink to="/profile" className={navLink} onClick={() => setOpen(false)}>Profile</NavLink>
              <NavLink
                to="/subscribe"
                className="btn btn-accent btn-sm navbar-cta"
                onClick={() => setOpen(false)}
              >
                <Icon name="checkCircle" size={14} /> {premium ? "Premium" : "Upgrade"}
              </NavLink>
              <button className="btn btn-ghost navbar-logout" onClick={handleLogout}>
                <Icon name="logout" size={16} /> Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={navLink} onClick={() => setOpen(false)}>Log in</NavLink>
              <NavLink to="/register" className="btn btn-primary btn-sm navbar-cta" onClick={() => setOpen(false)}>
                Get started
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
