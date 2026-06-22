// src/api/client.js
// Central fetch wrapper for TheMealDB. Every service file routes through
// this so the base URL and error handling only live in one place.

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request(path) {
  const url = `${BASE_URL}${path}`;

  let response;
  try {
    response = await fetch(url);
  } catch (networkErr) {
    throw new ApiError("Network error — check your connection.", 0);
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status
    );
  }

  return response.json();
}

export const apiClient = {
  get: (path) => request(path),
};

export { ApiError };
