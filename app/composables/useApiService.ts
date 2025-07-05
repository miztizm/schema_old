// composables/useApiService.ts

//import { useAuthStore } from '@/base/stores/auth'; // Adjust the path based on your project structure
import { useFetch, useRuntimeConfig } from '#imports'; // Ensure you import useFetch correctly based on your project setup
import type { FetchResponse } from 'ofetch'; // If you still need to handle raw responses

interface ApiServiceError {
  message: string;
  // You can extend this interface with more properties if needed
}
export function useApiService() {
  const error = ref<string | null>(null);
  const toast = useToast();
  const authStore = useAuthStore();
  const config = useRuntimeConfig(); // Access runtime configuration

  /**
   * Handles errors related to the API request.
   * @param error - The error object.
   */
  function onRequestError(err: any): void {
    if (import.meta.server) return; // Skip handling on server-side

    if (err.name === 'AbortError') return; // Ignore aborted requests

  /*   toast.add({
      icon: 'i-heroicons-exclamation-circle-solid',
      color: 'red',
      title: err.message ?? 'Something went wrong',
    }); */
    throw new Error(err.message ?? 'Something went wrong');
  }

  /**
   * Handles errors related to the API response.
   * @param response - The response object.
   */
  function onResponseError(response: FetchResponse<any>): void {
    if (response.status === 401) { // Unauthorized
      if (authStore.isAuthenticated) {
        authStore.logout();
        authStore.user = {} as any; // Reset user data
      }

      if (import.meta.client) {
        toast.add({
          title: 'Please log in to continue',
          icon: 'i-heroicons-exclamation-circle-solid',
          color: 'primary',
        });
      }
    } else if (response.status === 429) { // Too many requests
      if (import.meta.client) {
        toast.add({
          icon: 'i-heroicons-exclamation-circle-solid',
          color: 'red',
          title: 'Too many attempts. Please try again later.',
        });
      }
    } else if (response.status !== 422) { // Unprocessable Entity
      if (import.meta.client) {
        toast.add({
          icon: 'i-heroicons-exclamation-circle-solid',
          color: 'red',
          title: response._data?.message ?? response.statusText ?? 'Something went wrong',
        });
      }
    }
  }

  /**
   * Unified API service function to handle different HTTP methods.
   * @param method - The HTTP method ('GET', 'POST', 'PUT', 'DELETE').
   * @param endpoint - The API endpoint.
   * @param stateRef - A reactive reference to store the response data or update existing data.
   * @param payload - The query parameters or request body.
   * @param loadingRef - A reactive reference to indicate loading state.
   * @param errorMessage - A custom error message for the toast.
   * @param expectArray - Indicates if the expected response is an array.
   * @param headers - Additional headers to include in the request.
   * @returns The response data or null if an error occurs.
   */
  async function useApi<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    stateRef: Ref<T | null> | null,
    payload: Record<string, any> = {},
    loadingRef: Ref<boolean>,
    errorMessage: string = 'data',
    expectArray: boolean = false,
    headers: Record<string, string> = {}
  ): Promise<T | null> {
    loadingRef.value = true;
    error.value = null;

    try {
      const fetchOptions: Record<string, any> = {
        method,
        headers: buildHeaders(headers),
        credentials: 'include', // Add this line
        [method === 'GET' ? 'query' : 'body']: payload,
      };

      const responseData = await $fetch<T>(`${config.public.apiBaseUrl + config.public.apiPrefix}${endpoint}`, fetchOptions);

      if (!responseData) {
        throw new Error('No API data received from server');
      }

      const data = responseData;

      if (stateRef !== null) {
        if (expectArray) {
          stateRef.value = (Array.isArray(data) ? data : []) as T;
        } else {
          stateRef.value = (typeof data === 'object' && data !== null) ? { ...data } as T : data as T;
        }
      }

      return data as T;
    } catch (err: any) {
      onRequestError(err);
      if (err.response) onResponseError(err.response);
      handleError(err, `Error ${method}ing ${errorMessage}`, errorMessage);
      return null;
    } finally {
      loadingRef.value = false;
    }
  }

  /**
   * Builds the headers for the API requests.
   * @param additionalHeaders - Additional headers to include.
   * @returns The complete headers object.
   */
  function buildHeaders(additionalHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value || '',
      ...additionalHeaders,
    };

    // Add server-side cookie headers if executing on the server.
    if (import.meta.server) {
      const serverHeaders = useRequestHeaders(['cookie']);
      if (serverHeaders.cookie) {
        headers.cookie = serverHeaders.cookie;
      }
    }

    // Add Authorization header with the token from the auth store.
    headers.Authorization = `Bearer ${authStore.token}`;

    return headers;
  }
  /**
   * Handles authentication errors.
   */
  function handleAuthError(): void {
    authStore.logout();
    toast.add({
      title: 'Authorization Error',
      description: 'No authorization token available. Please log in.',
      color: 'red',
      icon: 'ph:warning-octagon',
      timeout: 3000,
    });
  }

  /**
   * Handles errors from API responses.
   * @param err - The error object.
   * @param logMessage - The message to log.
   * @param toastMessage - The message to display in the toast.
   */
  function handleError(err: any, logMessage: string, toastMessage: string): void {
    console.error(logMessage, err);
    toast.add({
      title: toastMessage,
      description: err.message || 'Something went wrong',
      color: 'red',
      icon: 'ph:warning-octagon',
      timeout: 5000,
    });
    error.value = logMessage;
  }

  return {
    useApi,
    error,
  };
}
