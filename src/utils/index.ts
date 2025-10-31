export function addQueryParams(
  url: URL,
  params: Record<string, unknown>
): void {
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });
}
