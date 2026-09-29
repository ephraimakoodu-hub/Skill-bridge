const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:4000/api";

async function request(path, options = {}) {
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
    throw new Error(data.error || "Unable to load project data.");
  }

  return data;
}

export const STATUS = {
  NOT_STARTED: "NOT_STARTED",
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETED: "COMPLETED",
};

export async function getMyProjects() {
  const data = await request("/projects/mine");
  return data.projects || [];
}

export async function getProjectState(projectId) {
  const projects = await getMyProjects();

  const found = projects.find(
    (item) => String(item.projectId) === String(projectId)
  );

  if (!found) {
    return {
      status: STATUS.NOT_STARTED,
      checklist: {},
      notes: "",
      startedAt: null,
      completedAt: null,
    };
  }

  return found;
}

export async function startProject(projectId) {
  const current = await getProjectState(projectId);

  if (current.status !== STATUS.NOT_STARTED) {
    return current;
  }

  const data = await request(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify({
      status: STATUS.IN_PROGRESS,
      checklist: current.checklist || {},
      notes: current.notes || "",
    }),
  });

  return data.project;
}

export async function saveProjectWork(
  projectId,
  { checklist, notes }
) {
  const data = await request(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify({
      checklist,
      notes,
    }),
  });

  return data.project;
}

export async function completeProject(
  projectId,
  { checklist, notes }
) {
  const data = await request(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify({
      status: STATUS.COMPLETED,
      checklist,
      notes,
    }),
  });

  return data.project;
}

export async function reopenProject(projectId) {
  const data = await request(`/projects/${projectId}`, {
    method: "PUT",
    body: JSON.stringify({
      status: STATUS.IN_PROGRESS,
    }),
  });

  return data.project;
}