import { addQueryParams } from "~/utils";

type QueryParams = Record<string, string | number | boolean>;

const responseHandlerMap = {
  json: async (response: Response) => {
    const json: unknown = await response.json();
    const status = response.status;
    return { json, status } as const;
  },
  ndjson: async (response: Response) => response,
  "chess-pgn": async (response: Response) => response,
} as const satisfies Record<string, (response: Response) => Promise<unknown>>;

type ResponseHandler = "json" | "ndjson" | "chess-pgn";

type ResponseHandlerMap = typeof responseHandlerMap;

type RequestHandlerParams<TQueryParams extends QueryParams> = {
  path: string;
  baseUrl?: string;
  query?: TQueryParams;
};

type RequestMethod = "GET" | "POST" | "HEAD" | "PUT" | "DELETE";

export class Requestor<T extends string> {
  private readonly headers: { readonly Authorization: `Bearer ${string}` };
  private readonly baseUrl: T;

  constructor({ token, baseUrl }: { token: string; baseUrl: T }) {
    this.headers = { Authorization: `Bearer ${token}` } as const;
    this.baseUrl = baseUrl;
  }

  private buildRequest<
    TReequestMethod extends RequestMethod,
    TQueryParams extends QueryParams,
  >({
    method,
    path,
    baseUrl,
    query,
  }: {
    method: TReequestMethod;
    path: string;
    baseUrl?: string;
    query?: TQueryParams;
  }) {
    const url = new URL(path, baseUrl ?? this.baseUrl);
    if (query) {
      addQueryParams(url, query);
    }
    const request = new Request(url, { method, headers: this.headers });
    return request;
  }

  private async makeAndHandleRequest(request: Request) {
    const response = await fetch(request);
    const status = response.status;
    return { response, status } as const;
  }

  processResponse<THandler extends ResponseHandler>(
    response: Response,
    handler: THandler
  ): ReturnType<ResponseHandlerMap[THandler]> {
    return responseHandlerMap[handler](response) as ReturnType<
      ResponseHandlerMap[THandler]
    >;
  }

  async get<TQueryParams extends QueryParams>({
    path,
    baseUrl,
    query,
  }: RequestHandlerParams<TQueryParams>) {
    const request = this.buildRequest({ method: "GET", path, baseUrl, query });
    return this.makeAndHandleRequest(request);
  }

  async post<TQueryParams extends QueryParams>({
    path,
    baseUrl,
    query,
  }: RequestHandlerParams<TQueryParams>) {
    const request = this.buildRequest({ method: "POST", path, baseUrl, query });
    return this.makeAndHandleRequest(request);
  }

  async head<TQueryParams extends QueryParams>({
    path,
    baseUrl,
    query,
  }: RequestHandlerParams<TQueryParams>) {
    const request = this.buildRequest({ method: "HEAD", path, baseUrl, query });
    return this.makeAndHandleRequest(request);
  }

  async delete<TQueryParams extends QueryParams>({
    path,
    baseUrl,
    query,
  }: RequestHandlerParams<TQueryParams>) {
    const request = this.buildRequest({
      method: "DELETE",
      path,
      baseUrl,
      query,
    });
    return this.makeAndHandleRequest(request);
  }

  async put<TQueryParams extends QueryParams>({
    path,
    baseUrl,
    query,
  }: RequestHandlerParams<TQueryParams>) {
    const request = this.buildRequest({ method: "PUT", path, baseUrl, query });
    return this.makeAndHandleRequest(request);
  }
}
