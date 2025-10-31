import { addQueryParams } from "~/utils";

type QueryParams = Record<string, string | number | boolean>;

export class Requestor<T extends string> {
  private readonly headers: { readonly Authorization: `Bearer ${string}` };
  private readonly baseUrl: T;

  constructor({ token, baseUrl }: { token: string; baseUrl: T }) {
    this.headers = { Authorization: `Bearer ${token}` } as const;
    this.baseUrl = baseUrl;
  }

  async get({ path, baseUrl }: { path: string; baseUrl?: string }) {
    const url = new URL(path, baseUrl ?? this.baseUrl);
    const request = new Request(url, { method: "GET", headers: this.headers });
    const response = await fetch(request);
    return response;
  }

  async post<TQueryParams extends QueryParams>({
    path,
    baseUrl,
    query,
  }: {
    path: string;
    baseUrl?: string;
    query?: TQueryParams;
  }) {
    const url = new URL(path, baseUrl ?? this.baseUrl);
    if (query) {
      addQueryParams(url, query);
    }
    const request = new Request(url, { method: "POST" });
    const response = await fetch(request);
    return response;
  }
}
