import React from "react";

// A small hand-built icon set (no emoji, no external icon library) so the
// UI has consistent, crisp line icons at any size.

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

const paths = {
  book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></>,
  hammer: <><path d="M14.5 3.5l6 6-2 2-6-6z"/><path d="M9 8l6 6-7 7-3-3z"/><path d="M2 22l3-3"/></>,
  showcase: <><rect x="3" y="4" width="18" height="14" rx="2"/><path d="M8 20h8"/><path d="M12 18v2"/></>,
  compass: <><circle cx="12" cy="12" r="10"/><path d="M16 8l-2 6-6 2 2-6z"/></>,
  check: <path d="M20 6L9 17l-5-5"/>,
  checkCircle: <><circle cx="12" cy="12" r="9"/><path d="M8.5 12.5l2.5 2.5 5-5"/></>,
  circle: <circle cx="12" cy="12" r="9"/>,
  lock: <><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
  arrowRight: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
  arrowLeft: <><path d="M19 12H5"/><path d="M11 18l-6-6 6-6"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.5-6 8-6s8 2 8 6"/></>,
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></>,
  bookmark: <path d="M6 3h12v18l-6-4-6 4z"/>,
  bookmarkFilled: <path d="M6 3h12v18l-6-4-6 4z" fill="currentColor"/>,
  search: <><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></>,
  menu: <><path d="M3 6h18"/><path d="M3 12h18"/><path d="M3 18h18"/></>,
  close: <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.6V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.6 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.6 1z"/></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></>,
  trash: <><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></>,
  plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></>,
  mapPin: <><path d="M12 21s-7-6.5-7-11a7 7 0 0 1 14 0c0 4.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/></>,
  bridge: <><path d="M3 17V9"/><path d="M21 17V9"/><path d="M3 13h18"/><path d="M7 13V9"/><path d="M12 13V9"/><path d="M17 13V9"/><path d="M2 17h20"/></>,
  alert: <><path d="M12 9v4"/><circle cx="12" cy="16.5" r="0.5" fill="currentColor"/><path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/></>,
  chevronDown: <path d="M6 9l6 6 6-6"/>,
  star: <path d="M12 2l2.9 6.3 6.9.6-5.2 4.6 1.6 6.8L12 16.9 5.8 20.3l1.6-6.8L2.2 8.9l6.9-.6z" fill="currentColor" stroke="none"/>,
  lockFilled: <><rect x="4" y="11" width="16" height="9" rx="2" fill="currentColor" stroke="none"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
  sparkle: <><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="M6 6l2.5 2.5"/><path d="M15.5 15.5L18 18"/><path d="M6 18l2.5-2.5"/><path d="M15.5 8.5L18 6"/></>,
};

export default function Icon({ name, size = 20, className = "", style }) {
  const content = paths[name];
  if (!content) return null;
  return (
    <svg
      {...base}
      width={size}
      height={size}
      className={"icon " + className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      {content}
    </svg>
  );
}
