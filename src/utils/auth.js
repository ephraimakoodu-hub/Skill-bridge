const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        ok: false,
        error: data.error || "Something went wrong.",
        status: response.status,
      };
    }

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error("SkillBridge API error:", error);

    return {
      ok: false,
      error:
        "Unable to connect to SkillBridge. Make sure the backend is running.",
    };
  }
}

/**
 * Get the currently authenticated user.
 */
export async function getCurrentUser() {
  const result = await request("/auth/me");

  return result.ok ? result.user : null;
}

/**
 * Register a new user.
 */
export async function registerUser({ name, email, password }) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    }),
  });
}

/**
 * Login.
 */
export async function loginUser({ email, password }) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password,
    }),
  });
}

/**
 * Logout.
 */
export async function logoutUser() {
  return request("/auth/logout", {
    method: "POST",
  });
}

/**
 * Update the authenticated user's profile.
 */
export async function updateProfile(updates) {
  return request("/auth/me", {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

/**
 * Change the authenticated user's password.
 *
 * userId is kept in the function signature because the existing
 * ChangePassword page expects it. The backend identifies the user
 * from the secure session cookie.
 */
export async function changePassword(
  userId,
  currentPassword,
  newPassword
) {
  return request("/auth/change-password", {
    method: "POST",
    body: JSON.stringify({
      currentPassword,
      newPassword,
    }),
  });
}

/**
 * Get a user by ID.
 *
 * The old frontend expects this function.
 * Public user/portfolio lookup will be connected to the database
 * API when we migrate the portfolio functionality.
 */
export async function getUserById(id) {
  if (!id) {
    return null;
  }

  return null;
}

/**
 * Account deletion.
 *
 * Backend account deletion has not been implemented yet.
 */
export async function deleteAccount() {
  return {
    ok: false,
    error: "Account deletion is not available yet.",
  };
}