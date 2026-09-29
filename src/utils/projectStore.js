import { readJSON, writeJSON } from "./storage";

// Shape per user: { [projectId]: { status, checklist: {reqIndex:boolean}, notes, startedAt, completedAt } }

const STATUS = {
  NOT_STARTED: "not_started",
  IN_PROGRESS: "in_progress",
  COMPLETED: "completed",
};

export { STATUS };

function key(userId) {
  return "projects_" + userId;
}

export function getAllProjectStates(userId) {
  return readJSON(key(userId), {});
}

export function getProjectState(userId, projectId) {
  const all = getAllProjectStates(userId);
  return (
    all[projectId] || {
      status: STATUS.NOT_STARTED,
      checklist: {},
      notes: "",
      startedAt: null,
      completedAt: null,
    }
  );
}

export function startProject(userId, projectId) {
  const all = getAllProjectStates(userId);
  const existing = all[projectId];
  if (existing && existing.status !== STATUS.NOT_STARTED) return existing;
  const next = {
    status: STATUS.IN_PROGRESS,
    checklist: {},
    notes: "",
    startedAt: new Date().toISOString(),
    completedAt: null,
  };
  all[projectId] = next;
  writeJSON(key(userId), all);
  return next;
}

export function saveProjectWork(userId, projectId, { checklist, notes }) {
  const all = getAllProjectStates(userId);
  const current = all[projectId] || getProjectState(userId, projectId);
  all[projectId] = {
    ...current,
    checklist: checklist !== undefined ? checklist : current.checklist,
    notes: notes !== undefined ? notes : current.notes,
  };
  writeJSON(key(userId), all);
  return all[projectId];
}

export function completeProject(userId, projectId) {
  const all = getAllProjectStates(userId);
  const current = all[projectId] || getProjectState(userId, projectId);
  all[projectId] = {
    ...current,
    status: STATUS.COMPLETED,
    completedAt: new Date().toISOString(),
  };
  writeJSON(key(userId), all);
  return all[projectId];
}

export function reopenProject(userId, projectId) {
  const all = getAllProjectStates(userId);
  const current = all[projectId] || getProjectState(userId, projectId);
  all[projectId] = { ...current, status: STATUS.IN_PROGRESS, completedAt: null };
  writeJSON(key(userId), all);
  return all[projectId];
}

export function getCompletedProjectIds(userId) {
  const all = getAllProjectStates(userId);
  return Object.keys(all)
    .filter((id) => all[id].status === STATUS.COMPLETED)
    .map((id) => Number(id));
}

export function getInProgressProjectIds(userId) {
  const all = getAllProjectStates(userId);
  return Object.keys(all)
    .filter((id) => all[id].status === STATUS.IN_PROGRESS)
    .map((id) => Number(id));
}
