export function addQueryParams(
  url: URL,
  params: Record<string, unknown>
): void {
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      url.searchParams.set(key, value.join(","));
      return;
    }

    url.searchParams.set(key, String(value));
  });
}
