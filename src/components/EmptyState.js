import React from "react";
import Icon from "./Icon";

export default function EmptyState({ icon = "compass", title, message, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state-icon"><Icon name={icon} size={28} /></div>
      <h3>{title}</h3>
      {message && <p>{message}</p>}
      {action}
    </div>
  );
}
