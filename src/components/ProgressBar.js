import React from "react";

export default function ProgressBar({ percent = 0, label }) {
  const clamped = Math.max(0, Math.min(100, percent));
  return (
    <div className="progress-bar-wrap">
      {label && (
        <div className="progress-bar-label">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div className="progress-bar-track" role="progressbar" aria-valuenow={clamped} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-bar-fill" style={{ width: clamped + "%" }} />
      </div>
    </div>
  );
}
