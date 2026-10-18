import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

async function request<T>(
  method: string,
  endpoint: string,
  body?: any,
): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `API Error: ${res.status}`);
  }

  if (res.status === 204 || res.headers.get("content-length") === "0") {
    return null as unknown as T;
  }

  return res.json();
}

const FAST_QUERY_DEFAULTS = {
  staleTime: Infinity,
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

function useGet<T>(
  key: string,
  endpoint: string,
  options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">,
) {
  return useQuery<T, Error>({
    queryKey: [key, endpoint],
    queryFn: () => request<T>("GET", endpoint),
    ...FAST_QUERY_DEFAULTS,
    ...options,
  });
}

function createMutation<T, B>(
  key: string,
  endpoint: string,
  method: "POST" | "PATCH" | "DELETE",
  options?: Omit<
    UseMutationOptions<T, Error, B, unknown>,
    "mutationFn" | "onSuccess" | "onError"
  > & {
    onSuccess?: (data: T, variables: B, context: unknown) => void;
    onError?: (error: Error, variables: B, context: unknown) => void;
  },
) {
  const queryClient = useQueryClient();

  return useMutation<T, Error, B, unknown>({
    mutationFn: (body: B) => request<T>(method, endpoint, body),

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({
        queryKey: [key],
        exact: false,
      });

      options?.onSuccess?.(data, variables, context);
    },

    onError: (error, variables, context) => {
      options?.onError?.(error, variables, context);
    },

    retry: false,
    ...options,
  });
}

export const useApi = {
  get: <T = any>(
    key: string,
    endpoint: string,
    options?: Omit<UseQueryOptions<T, Error>, "queryKey" | "queryFn">,
  ) => useGet<T>(key, endpoint, options),

  post: <T = any, B = any>(
    key: string,
    endpoint: string,
    options?: Omit<
      UseMutationOptions<T, Error, B, unknown>,
      "mutationFn" | "onSuccess" | "onError"
    > & {
      onSuccess?: (data: T, variables: B, context: unknown) => void;
      onError?: (error: Error, variables: B, context: unknown) => void;
    },
  ) => createMutation<T, B>(key, endpoint, "POST", options),

  patch: <T = any, B = any>(
    key: string,
    endpoint: string,
    options?: Omit<
      UseMutationOptions<T, Error, B, unknown>,
      "mutationFn" | "onSuccess" | "onError"
    > & {
      onSuccess?: (data: T, variables: B, context: unknown) => void;
      onError?: (error: Error, variables: B, context: unknown) => void;
    },
  ) => createMutation<T, B>(key, endpoint, "PATCH", options),

  delete: <T = any, B = any>(
    key: string,
    endpoint: string,
    options?: Omit<
      UseMutationOptions<T, Error, B, unknown>,
      "mutationFn" | "onSuccess" | "onError"
    > & {
      onSuccess?: (data: T, variables: B, context: unknown) => void;
      onError?: (error: Error, variables: B, context: unknown) => void;
    },
  ) => createMutation<T, B>(key, endpoint, "DELETE", options),
};
