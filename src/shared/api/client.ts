// API client: the ShopBoard API address and the one typed client every module uses.

// The ShopBoard API address. It is written only here: modules pass only the path (for example "/api/products").
const API_BASE_URL = "https://shopboard-api.vercel.app";

// The status used when there is no HTTP response (offline, blocked, bad URL, or an unexpected error).
const NO_RESPONSE_STATUS = 0;

// An error for a failed API call, with the HTTP status.
export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

// The four states of a request as one value the UI can switch on:
// loading (waiting), error (failed), empty (worked but nothing to show), success (has data).
export type ApiState<T> =
  | { status: "loading" }
  | { status: "error"; error: ApiError }
  | { status: "empty" }
  | { status: "success"; data: T };

// A client for one API. Data is returned only after a type guard has checked it.
export type ApiClient = {
  // Returns the data, or throws an ApiError.
  get: <T>(path: string, isValid: (value: unknown) => value is T) => Promise<T>;
  // Never throws. Calls onState with "loading" first, then with "success", "empty" or "error".
  load: <T>(
    path: string,
    isValid: (value: unknown) => value is T,
    isEmpty: (data: T) => boolean,
    onState: (state: ApiState<T>) => void,
  ) => Promise<void>;
};

// Turns anything that was thrown into an ApiError.
function toApiError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;
  return new ApiError("Unexpected error while loading data", NO_RESPONSE_STATUS);
}

// Makes a client for one API address. The type guard means no `as` and no `any` are needed.
function createApiClient(baseUrl: string): ApiClient {
  async function get<T>(path: string, isValid: (value: unknown) => value is T): Promise<T> {
    let response: Response;
    try {
      response = await fetch(`${baseUrl}${path}`);
    } catch {
      throw new ApiError("Network error: the request did not reach the server", NO_RESPONSE_STATUS);
    }
    if (!response.ok) {
      throw new ApiError(`Request failed with status ${response.status}`, response.status);
    }
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      throw new ApiError("The API response is not valid JSON", response.status);
    }
    if (!isValid(data)) {
      throw new ApiError("The API response has an unexpected shape", response.status);
    }
    return data;
  }

  async function load<T>(
    path: string,
    isValid: (value: unknown) => value is T,
    isEmpty: (data: T) => boolean,
    onState: (state: ApiState<T>) => void,
  ): Promise<void> {
    onState({ status: "loading" });
    let state: ApiState<T>;
    try {
      const data = await get(path, isValid);
      state = isEmpty(data) ? { status: "empty" } : { status: "success", data };
    } catch (error) {
      state = { status: "error", error: toApiError(error) };
    }
    onState(state);
  }

  return { get, load };
}

// The client for the ShopBoard API. Every request in the project goes through it.
export const api: ApiClient = createApiClient(API_BASE_URL);
