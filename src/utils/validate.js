// Small, dependency-free input validation and sanitization helpers.
// These exist so user-entered text never breaks rendering or storage.

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || "").trim());
}

export function isStrongEnoughPassword(value) {
  return String(value || "").length >= 8;
}

// Strips characters that have no place in a display name and caps length.
// React already escapes everything it renders, so this is about data
// hygiene, not XSS prevention by itself.
export function cleanName(value) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 60);
}

export function cleanText(value, maxLen = 4000) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .slice(0, maxLen);
}
