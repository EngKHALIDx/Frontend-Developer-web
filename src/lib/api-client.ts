/**
 * API Client Wrapper
 * A centralized fetch wrapper with error handling, retries, and typed responses.
 * Demonstrates REST API consumption patterns used across the monorepo.
 */

import type { ApiResponse } from '@/types';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface RequestOptions extends RequestInit {
  timeout?: number;
  retries?: number;
}

/**
 * Enhanced fetch wrapper with timeout, retry logic, and error normalization.
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeout = 10000, retries = 2, ...fetchOptions } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(endpoint, {
        ...fetchOptions,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({}));
        throw new ApiError(
          errorBody.message || `Request failed with status ${response.status}`,
          response.status,
          errorBody.code
        );
      }

      const json: ApiResponse<T> = await response.json();

      if (!json.success) {
        throw new ApiError(json.message || 'API returned unsuccessful response', 200);
      }

      return json.data;
    } catch (error) {
      lastError = error as Error;
      if (attempt < retries) {
        // Exponential backoff
        await new Promise((resolve) => setTimeout(resolve, Math.pow(2, attempt) * 500));
      }
    }
  }

  throw lastError || new Error('Unknown API error');
}

/**
 * Convenience methods for common HTTP verbs.
 */
export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'GET' }),

  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    apiClient<T>(endpoint, { ...options, method: 'DELETE' }),

  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) =>
    apiClient<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }),
};
