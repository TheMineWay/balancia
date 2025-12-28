import {
	ACCOUNT_SCHEMA,
	CATEGORY_SCHEMA,
	getPaginatedResponse,
	PAGINATED_QUERY_SCHEMA,
	SEARCH_SCHEMA,
	TRANSACTION_CREATE_SCHEMA,
	TRANSACTION_FILTERS_SCHEMA,
	TRANSACTION_POPULATED_SCHEMA,
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
		search: SEARCH_SCHEMA.optional(),
		filters: TRANSACTION_FILTERS_SCHEMA.optional(),
	}),
	responseDto: getPaginatedResponse(
		z.object({
			...TRANSACTION_POPULATED_SCHEMA.shape,
		}),
	),
} satisfies EndpointDefinition;

const GET_BY_ID = {
	getPath: (params) => ["transaction", params.id],
	paramsMapping: { id: "transactionId" },
	method: EndpointMethod.GET,
	responseDto: z.object({
		...TRANSACTION_SCHEMA.shape,
		account: ACCOUNT_SCHEMA,
		category: CATEGORY_SCHEMA.nullable(),
	}),
} satisfies EndpointDefinition<{ id: string }>;

const CREATE_TRANSACTION = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...TRANSACTION_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const DELETE_TRANSACTION_ENDPOINT = {
	getPath: (params) => ["transaction", params.id],
	paramsMapping: { id: "transactionId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ id: string }>;

const UPDATE_TRANSACTION = {
	getPath: (options) => ["transaction", options.id],
	paramsMapping: { id: "transactionId" },
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...TRANSACTION_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

// Import
const BULK_CREATE_TRANSACTIONS = {
	getPath: (options) => ["bulk", options.accountId],
	paramsMapping: { accountId: "accountId" },
	method: EndpointMethod.POST,
	bodyDto: z.object({
		transactions: z.array(TRANSACTION_CREATE_SCHEMA.omit({ accountId: true })),
	}),
} satisfies EndpointDefinition<{ accountId: string }>;

// Controller

export const MY_TRANSACTION_CONTROLLER = {
	getPath: () => ["my-transactions"],
	paramsMapping: {},
	endpoints: {
		getTransactionsList: GET_TRANSACTIONS_LIST_ENDPOINT,
		getById: GET_BY_ID,
		createTransaction: CREATE_TRANSACTION,
		deleteTransaction: DELETE_TRANSACTION_ENDPOINT,
		updateTransaction: UPDATE_TRANSACTION,

		// Import
		bulkCreateTransactions: BULK_CREATE_TRANSACTIONS,
	},
} satisfies ControllerDefinition;
