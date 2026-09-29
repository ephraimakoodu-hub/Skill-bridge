// Thin wrapper around localStorage so the rest of the app never touches
// window.localStorage directly. This is the seam to swap in a real API
// later: every function here would become a network call, and nothing
// outside this file would need to change.

const PREFIX = "sbng_";

export function readJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

export function writeJSON(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
    return true;
  } catch (err) {
    return false;
  }
}

export function removeKey(key) {
  window.localStorage.removeItem(PREFIX + key);
}
