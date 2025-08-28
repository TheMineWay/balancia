import {
	ACCOUNT_SCHEMA,
	CATEGORY_SCHEMA,
	getPaginatedResponse,
	PAGINATED_QUERY_SCHEMA,
	TRANSACTION_CREATE_SCHEMA,
	TRANSACTION_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const GET_TRANSACTIONS_LIST_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	queryDto: z.object({
		...PAGINATED_QUERY_SCHEMA.shape,
		filters: z
			.object({
				accountId: z.preprocess((val) => Number(val), z.number()).optional(),
			})
			.optional(),
	}),
	responseDto: getPaginatedResponse(
		z.object({
			...TRANSACTION_SCHEMA.shape,
			account: ACCOUNT_SCHEMA,
			category: CATEGORY_SCHEMA.nullable(),
		}),
	),
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
		getTransactionsList: GET_TRANSACTIONS_LIST_ENDPOINT,
		createTransaction: CREATE_TRANSACTION,
		deleteTransaction: DELETE_TRANSACTION_ENDPOINT,
		updateTransaction: UPDATE_TRANSACTION,
	},
} satisfies ControllerDefinition;
