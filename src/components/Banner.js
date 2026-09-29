import React from "react";
import Icon from "./Icon";

export default function Banner({ type = "info", children }) {
  if (!children) return null;
  return (
    <div className={"banner banner-" + type} role={type === "error" ? "alert" : "status"}>
      <Icon name={type === "error" ? "alert" : "checkCircle"} size={18} />
      <span>{children}</span>
    </div>
  );
}
