import { getPath } from "@/lib/get-path.util";
import type { ApiRequest } from "@ts-types/api-request.type";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import { Path } from "@ts-types/path/path.type";
import z from "zod";

type Params<P extends Path, D = Parameters<P["getPath"]>[0]> = D extends object
	? D
	: {};

export type GetEndpointRequestOptions<
	E extends EndpointDefinition<any> = EndpointDefinition<any>,
> = Body<E> & Query<E>;

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
	C extends ControllerDefinition<any>,
	K extends keyof C["endpoints"] = keyof C["endpoints"],
>(
	apiUrl: string,
	controller: C,
	endpointKey: K,
	params: Params<C> & Params<C["endpoints"][K]>,
	options: GetEndpointRequestOptions<C["endpoints"][K]>,
): ApiRequest<z.infer<C["endpoints"][K]["responseDto"]>> => {
	const endpoint =
		controller.endpoints[endpointKey as keyof typeof controller.endpoints];

	if (!endpoint)
		throw new Error(
			`Endpoint ${String(endpointKey)} not found in controller ${controller?.getPath({}) ?? ""}`,
		);

	return {
		request: {
			url: [apiUrl, getPath(controller, params), getPath(endpoint, params)]
				.filter((p) => p !== "")
				.join("/"),
			data: options.body,
			params: options.query ?? undefined,
			method: endpoint.method ?? EndpointMethod.GET,
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
	NK extends string,
> = E[K] extends z.ZodTypeAny
	? {
			[P in NK]: z.infer<E[K]>;
		}
	: { [P in NK]?: never };

// Extracts the body type from the defined DTO. If there is no DTO, it does not include a body.
type Body<E extends EndpointDefinition<any>> = PartialDto<E, "bodyDto", "body">;

// Extracts the query type from the defined DTO. If there is no DTO, it does not include a query.
type Query<E extends EndpointDefinition<any>> = PartialDto<
	E,
	"queryDto",
	"query"
>;
