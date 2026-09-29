import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page-body">
      <div className="container" style={{ maxWidth: 760 }}>
        <h1>About SkillBridge NG</h1>
        <p className="mt-16">
          SkillBridge NG exists to close the gap between learning a skill and proving you can use it.
          Many learners can finish tutorials but still struggle to show an employer or client what
          they can actually do. This platform ties learning directly to a project, and the project
          directly to a showcase you can share.
        </p>

        <h2 className="mt-32">What you can do here</h2>
        <p>
          Register an account, choose a skill, and follow its roadmap one lesson at a time. Each
          lesson includes an explanation, a worked example, and a small task. When you are ready,
          start a guided project connected to that skill, work through its requirements, and mark it
          complete. Completed projects appear in your showcase page automatically. From there, you
          can browse and save opportunities that match the skills you have been building.
        </p>

        <h2 className="mt-32">Where this stands today</h2>
        <p>
          This is an MVP. There is no backend server yet: accounts, lesson progress, project work
          and saved opportunities are all stored in your browser using localStorage. That keeps the
          product fast to build and easy to try, but it also means your data will not follow you to
          a different browser or device, and clearing your browser storage will remove it. A future
          version would move this data to a real account system.
        </p>

        <h2 className="mt-32">Get in touch</h2>
        <p>
          Questions about the platform, or interested in listing opportunities for learners? See our{" "}
          <Link to="/terms">Terms &amp; Conditions</Link> and <Link to="/privacy">Privacy Policy</Link> for
          more on how SkillBridge NG works.
        </p>
      </div>
    </div>
  );
}
