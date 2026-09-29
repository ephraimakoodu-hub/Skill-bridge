import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="not-found">
      <h1>404</h1>
      <h2 className="mt-8">This page does not exist</h2>
      <p className="mt-16">The link may be broken, or the page may have moved.</p>
      <Link to="/" className="btn btn-primary mt-24">Back to home</Link>
    </div>
  );
}
