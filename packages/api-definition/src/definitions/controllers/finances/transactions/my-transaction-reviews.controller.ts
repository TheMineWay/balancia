import {
	getPaginatedResponse,
	PAGINATED_QUERY_SCHEMA,
	TRANSACTION_REVIEW_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

/* Endpoints */

const GET_LIST = {
	getPath: () => ["list"],
	paramsMapping: {},
	method: EndpointMethod.GET,
	responseDto: z.object({
		...getPaginatedResponse(TRANSACTION_REVIEW_SCHEMA).shape,
	}),
	queryDto: z.object({
		...PAGINATED_QUERY_SCHEMA.shape,
		filters: TRANSACTION_REVIEW_SCHEMA.optional(),
	}),
} satisfies EndpointDefinition;

/* Controller */

export const MY_TRANSACTION_REVIEWS_CONTROLLER = {
	getPath: () => ["my-transaction-reviews"],
	paramsMapping: {},
	endpoints: {
		list: GET_LIST,
	},
} satisfies ControllerDefinition;
