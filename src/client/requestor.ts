import { addQueryParams } from "~/utils";

type QueryParams = Record<
  string,
  string | number | boolean | string[] | number[] | null | undefined
>;

type RequestHandlerParams<TQueryParams extends QueryParams, TBody> = {
  path: string;
  baseUrl?: string;
  query?: TQueryParams;
  body?: TBody;
};

type RequestMethod = "GET" | "POST" | "HEAD" | "PUT" | "DELETE";

export class Requestor {
  readonly #headers: { readonly Authorization: `Bearer ${string}` } | undefined;
  readonly #baseUrl: string;

  constructor({ token, baseUrl }: { token: string | null; baseUrl: string }) {
    this.#headers = token
      ? ({ Authorization: `Bearer ${token}` } as const)
      : undefined;
    this.#baseUrl = baseUrl;
  }

  #buildRequest<
    TReequestMethod extends RequestMethod,
    TQueryParams extends QueryParams,
    TBody,
  >({
    method,
    path,
    baseUrl,
    query,
    body,
  }: {
    method: TReequestMethod;
    path: string;
    baseUrl?: string;
    query?: TQueryParams;
    body?: TBody;
  }) {
    const url = new URL(path, baseUrl ?? this.#baseUrl);
    if (query) {
      addQueryParams(url, query);
    }
    const request = new Request(url, {
      method,
      headers: this.#headers,
      body: JSON.stringify(body),
    });
    return request;
  }

  async #makeRequest(request: Request) {
    const response = await fetch(request);
    const status = response.status;
    return { response, status } as const;
  }

  async get<TQueryParams extends QueryParams>(
    params: RequestHandlerParams<TQueryParams, never>,
  ) {
    const request = this.#buildRequest({ method: "GET", ...params });
    return this.#makeRequest(request);
  }

  async post<TQueryParams extends QueryParams, TBody>(
    params: RequestHandlerParams<TQueryParams, TBody>,
  ) {
    const request = this.#buildRequest({ method: "POST", ...params });
    return this.#makeRequest(request);
  }

  async head<TQueryParams extends QueryParams>(
    params: RequestHandlerParams<TQueryParams, never>,
  ) {
    const request = this.#buildRequest({ method: "HEAD", ...params });
    return this.#makeRequest(request);
  }

  async delete<TQueryParams extends QueryParams>(
    params: RequestHandlerParams<TQueryParams, never>,
  ) {
    const request = this.#buildRequest({ method: "DELETE", ...params });
    return this.#makeRequest(request);
  }

  async put<TQueryParams extends QueryParams, TBody>(
    params: RequestHandlerParams<TQueryParams, TBody>,
  ) {
    const request = this.#buildRequest({ method: "PUT", ...params });
    return this.#makeRequest(request);
  }
}
