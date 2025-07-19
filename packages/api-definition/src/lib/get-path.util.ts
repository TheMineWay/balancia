import type { Path } from "@ts-types/path/path.type";

/**
 * Given a 'path' object and parameters, returns the full path as a string.
 * You can provide controllers or endpoints.
 */
export function getPath<P extends Record<string, string>>(
  path: Path<P>,
  params: P
) {
  const p = path.getPath(params);
  return p.length === 0 ? "" : p.join("/");
}
