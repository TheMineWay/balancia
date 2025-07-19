import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";

export function getEndpointPath<P extends Record<string, string>>(
  endpoint: EndpointDefinition<P>,
  params: P
) {
  return endpoint.getPath(params).join("/");
}
