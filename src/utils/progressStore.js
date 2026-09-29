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
    throw new Error(data.error || "Unable to load progress.");
  }

  return data;
}

export function getLessonId(skillId, stepId) {
  return `${skillId}-${stepId}`;
}

export async function getAllProgress() {
  const data = await request("/progress");

  const progress = {};

  for (const row of data.progress || []) {
    progress[row.lessonId] = {
      completed: row.completed,
      completedAt: row.completedAt,
    };
  }

  return progress;
}

/*
 * Compatibility helper for pages that still expect:
 *
 * {
 *   completedStepIds: [],
 *   lastStepId: null
 * }
 */
export async function getSkillProgress(skillId) {
  const progress = await getAllProgress();

  const prefix = `${skillId}-`;

  const completedStepIds = Object.entries(progress)
    .filter(
      ([lessonId, value]) =>
        lessonId.startsWith(prefix) && value.completed
    )
    .map(([lessonId]) => {
      const stepId = lessonId.slice(prefix.length);

      return Number.isNaN(Number(stepId))
        ? stepId
        : Number(stepId);
    });

  const lastCompleted = Object.entries(progress)
    .filter(
      ([lessonId, value]) =>
        lessonId.startsWith(prefix) &&
        value.completed &&
        value.completedAt
    )
    .sort(
      (a, b) =>
        new Date(b[1].completedAt) -
        new Date(a[1].completedAt)
    )[0];

  const lastStepId = lastCompleted
    ? (() => {
        const stepId = lastCompleted[0].slice(prefix.length);

        return Number.isNaN(Number(stepId))
          ? stepId
          : Number(stepId);
      })()
    : null;

  return {
    completedStepIds,
    lastStepId,
  };
}

export function isLessonComplete(
  progress,
  skillId,
  stepId
) {
  const lessonId = getLessonId(skillId, stepId);

  return !!progress?.[lessonId]?.completed;
}

export async function markStepComplete(
  skillId,
  stepId
) {
  const lessonId = getLessonId(skillId, stepId);

  const data = await request(`/progress/${lessonId}`, {
    method: "PUT",
    body: JSON.stringify({
      completed: true,
    }),
  });

  return data.progress;
}

export async function markStepIncomplete(
  skillId,
  stepId
) {
  const lessonId = getLessonId(skillId, stepId);

  const data = await request(`/progress/${lessonId}`, {
    method: "PUT",
    body: JSON.stringify({
      completed: false,
    }),
  });

  return data.progress;
}

export function percentComplete(skill, progress) {
  if (!skill?.roadmap?.length) return 0;

  const completed = skill.roadmap.filter((step) =>
    isLessonComplete(progress, skill.id, step.id)
  ).length;

  return Math.round(
    (completed / skill.roadmap.length) * 100
  );
}