export type EndpointDefinition = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  getPath: (params: any) => string;
};
