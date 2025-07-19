import { getEndpointPath } from "@/lib/get-endpoint-path.util";
import type { ApiRequest } from "@ts-types/api-request.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import type z from "zod";

export type GetEndpointRequestOptions<
  P extends Record<string, string> = {},
  E extends EndpointDefinition<P> = EndpointDefinition<P>
> = Body<P, E> & Query<P, E>;

/**
 * Given an endpoint, it returns the Axios request config.
 *
 * @param apiUrl - The base URL of the API.
 * @param endpoint - The endpoint definition.
 * @param params - Parameters to be included in the request. If there are no parameters set to '{}'.
 *
 * @returns AxiosRequestConfig - The configuration for the request.
 */
export const getEndpointRequest = <
  P extends Record<string, string> = {},
  E extends EndpointDefinition<P> = EndpointDefinition<P>,
  R = z.infer<E["responseDto"]>
>(
  apiUrl: string,
  endpoint: E,
  params: P,
  options: GetEndpointRequestOptions<P, E>
): ApiRequest<R> => {
  return {
    request: {
      url: [apiUrl, getEndpointPath(endpoint, params)].join("/"),
      data: options.body,
      params: options.query ? {} : undefined,
    },

    // Parse response based on the response DTO if it exists. If no dto is defined, return undefined.
    onResponse: (response) => {
      if (endpoint.responseDto) {
        return endpoint.responseDto.parse(response) as any;
      }
      return null as any;
    },
  };
};

/* Internal types */

// Internal utility used to detect DTO types and extract the body type if needed.
type PartialDto<
  E extends EndpointDefinition<any>,
  K extends keyof E,
  NK extends string
> = E[K] extends z.ZodTypeAny
  ? {
      [P in NK]: z.infer<E[K]>;
    }
  : { [P in NK]?: never };

// Extracts the body type from the defined DTO. If there is no DTO, it does not include a body.
type Body<
  P extends Record<string, string>,
  E extends EndpointDefinition<P>
> = PartialDto<E, "bodyDto", "body">;

// Extracts the query type from the defined DTO. If there is no DTO, it does not include a query.
type Query<
  P extends Record<string, string>,
  E extends EndpointDefinition<P>
> = PartialDto<E, "queryDto", "query">;
