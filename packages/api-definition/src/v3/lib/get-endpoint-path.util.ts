import { EndpointDefinition } from "@/v3/types/endpoint-definition.type";

export const getEndpointPath = <
  P extends Record<string, string>,
  E extends EndpointDefinition<P>
>(
  endpoint: E
) => {
  let path: string[];
  if (endpoint.paramsMapping) {
    path = endpoint.getPath(endpoint.paramsMapping);
  } else path = endpoint.getPath({});

  return path.join("/");
};
