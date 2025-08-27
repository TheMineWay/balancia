import {
	getPaginatedResponse,
	PAGINATED_QUERY_SCHEMA,
	TRANSACTION_CREATE_SCHEMA,
	TRANSACTION_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const GET_TRANSACTIONS_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	queryDto: z.object({
		...PAGINATED_QUERY_SCHEMA.shape,
	}),
	responseDto: getPaginatedResponse(TRANSACTION_SCHEMA),
} satisfies EndpointDefinition;

const CREATE_TRANSACTION = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...TRANSACTION_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const DELETE_TRANSACTION_ENDPOINT = {
	getPath: (params) => [params.id],
	paramsMapping: { id: "transactionId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ id: string }>;

const UPDATE_TRANSACTION = {
	getPath: (options) => [options.id],
	paramsMapping: { id: "transactionId" },
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...TRANSACTION_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

// Controller

export const MY_TRANSACTION_CONTROLLER = {
	getPath: () => ["my-transactions"],
	paramsMapping: {},
	endpoints: {
		getTransactions: GET_TRANSACTIONS_ENDPOINT,
		createTransaction: CREATE_TRANSACTION,
		deleteTransaction: DELETE_TRANSACTION_ENDPOINT,
		updateTransaction: UPDATE_TRANSACTION,
	},
} satisfies ControllerDefinition;
