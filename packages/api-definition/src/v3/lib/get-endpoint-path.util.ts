import {
  EndpointDefinition,
  ParametrizedEndpointDefinition,
} from "@/v3/types/endpoint-definition.type";

export function getEndpointPath(endpoint: EndpointDefinition) {
  return endpoint.getPath().join("/");
}

export function getEndpointPathWithParams<P extends Record<string, string>>(
  endpoint: ParametrizedEndpointDefinition<P>,
  params: P
) {
  return endpoint.getPath(params).join("/");
}
