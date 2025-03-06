import { env } from "../config/env";

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
  cache?: RequestCache;
  responseType?: string;
};

function buildUrlWithParams(
  url: string,
  params?: RequestOptions["params"]
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(
      ([, value]) => value !== undefined && value !== null
    )
  );
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(
    filteredParams as Record<string, string>
  ).toString();
  return `${url}?${queryString}`;
}

async function fetchApi<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const {
    method = "GET",
    headers = {},
    body,
    cookie,
    params,
    cache = "no-store",
    responseType,
  } = options;
  const accessToken = localStorage.getItem("access_token");

  const fullUrl = buildUrlWithParams(`${env.API_URL}${url}`, params);

  const requestHeaders: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...headers,
    ...(cookie ? { Cookie: cookie } : {}),
    ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}), // Add the token if present
  };

  const response = await fetch(fullUrl, {
    method,
    headers: requestHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include",
    cache,
  });

  if (!response.ok) {
    if (response.status === 401) {
      localStorage.clear();
      window.location.replace("/login");
    } else {
      const message = (await response.json()).message || response.statusText;

      throw new Error(message);
    }
  }

  if (responseType === "blob") {
    return response.blob() as unknown as T;
  }

  return response.json();
}

export const api = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "GET" });
  },
  getBlob<T>(url: string): Promise<T> {
    return fetchApi<T>(url, { responseType: "blob" }).then(
      (response) => response
    );
  },
  post<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "POST", body });
  },
  put<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PUT", body });
  },
  patch<T>(url: string, body?: any, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "PATCH", body });
  },
  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return fetchApi<T>(url, { ...options, method: "DELETE" });
  },
};
