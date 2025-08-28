import {
	ACCOUNT_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
} from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import z from "zod";

// Endpoints

export const GET_ACCOUNTS_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	responseDto: getPaginatedResponse(ACCOUNT_SCHEMA),
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

export const GET_ACCOUNT = {
	getPath: (params) => [params.id],
	paramsMapping: {
		id: "accountId",
	},
	responseDto: z.object({
		...ACCOUNT_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

// Controller

export const MY_ACCOUNTS_CONTROLLER = {
	getPath: () => ["my-accounts"],
	paramsMapping: {},
	endpoints: {
		getAccounts: GET_ACCOUNTS_ENDPOINT,
		getAccount: GET_ACCOUNT,
	},
} satisfies ControllerDefinition;
