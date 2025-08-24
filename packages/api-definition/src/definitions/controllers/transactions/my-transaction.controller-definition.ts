import {
	getPaginatedResponse,
	PAGINATED_QUERY_SCHEMA,
	TRANSACTION_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import z from "zod";

const GET_MY_TRANSACTIONS_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	queryDto: z.object({
		...PAGINATED_QUERY_SCHEMA.shape,
	}),
	responseDto: getPaginatedResponse(TRANSACTION_SCHEMA),
} satisfies EndpointDefinition;

// Controller

export const MY_TRANSACTION_CONTROLLER = {
	getPath: () => ["my-transactions"],
	paramsMapping: {},
	endpoints: {
		getMyTransactions: GET_MY_TRANSACTIONS_ENDPOINT,
	},
} satisfies ControllerDefinition;
