const API_URL =
  process.env.REACT_APP_API_URL ||
  "http://localhost:4000/api";

async function request(path, options = {}) {
  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
    }
  );

  const data = await response
    .json()
    .catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.error || "Unable to update saved opportunities."
    );
  }

  return data;
}

// Get IDs of saved opportunities
export async function getSavedOpportunityIds() {
  const data = await request(
    "/opportunities/saved"
  );

  return Array.isArray(data.ids)
    ? data.ids
    : [];
}

// Check whether an opportunity is saved
export async function isOpportunitySaved(
  opportunityId
) {
  const savedIds =
    await getSavedOpportunityIds();

  return savedIds.includes(opportunityId);
}

// Save an opportunity
export async function saveOpportunity(
  opportunityId
) {
  return request(
    `/opportunities/${opportunityId}/save`,
    {
      method: "POST",
    }
  );
}

// Remove an opportunity from saved
export async function unsaveOpportunity(
  opportunityId
) {
  return request(
    `/opportunities/${opportunityId}/save`,
    {
      method: "DELETE",
    }
  );
}

// Toggle saved state
export async function toggleSavedOpportunity(
  opportunityId
) {
  const savedIds =
    await getSavedOpportunityIds();

  if (savedIds.includes(opportunityId)) {
    await unsaveOpportunity(
      opportunityId
    );

    return savedIds.filter(
      (id) => id !== opportunityId
    );
  }

  await saveOpportunity(
    opportunityId
  );

  return [
    ...savedIds,
    opportunityId,
  ];
}
