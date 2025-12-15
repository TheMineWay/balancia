import {
	CREATE_DEBT_PAYMENT_SCHEMA,
	DEBT_CREATE_SCHEMA,
	DEBT_LIST_SCHEMA,
	DEBT_ORIGIN_SCHEMA,
	DEBT_PAYMENT_SCHEMA,
	DEBT_STATUS_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
	TRANSACTION_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

// CRUD

const GET_LIST = {
	getPath: () => ["list"],
	paramsMapping: {},
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
		filters: z
			.object({
				status: DEBT_STATUS_SCHEMA.optional(),
				debtorId: z.coerce.number().optional(),
			})
			.optional(),
	}),
	responseDto: getPaginatedResponse(DEBT_LIST_SCHEMA),
} satisfies EndpointDefinition;

const CREATE = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...DEBT_CREATE_SCHEMA.omit({ userId: true }).shape,
	}),
} satisfies EndpointDefinition;

const UPDATE = {
	getPath: (options) => ["debt", options.id],
	paramsMapping: { id: "debtId" },
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...DEBT_CREATE_SCHEMA.omit({ userId: true }).shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const DELETE = {
	getPath: (params) => ["debt", params.debtId],
	paramsMapping: { debtId: "debtId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ debtId: string }>;

// Assign transactions

const ASSIGN_ORIGIN_TRANSACTIONS = {
	getPath: (params) => ["debt", params.debtId, "origin-transactions"],
	paramsMapping: { debtId: "debtId" },
	method: EndpointMethod.POST,
	bodyDto: z.object({
		transactions: z.array(DEBT_ORIGIN_SCHEMA),
	}),
} satisfies EndpointDefinition<{ debtId: string }>;

const GET_ASSIGNED_ORIGIN_TRANSACTIONS = {
	getPath: (params) => ["debt", params.debtId, "origin-transactions"],
	paramsMapping: { debtId: "debtId" },
	method: EndpointMethod.GET,
	responseDto: z.object({
		transactions: z.array(
			z.object({
				...DEBT_ORIGIN_SCHEMA.shape,
				transaction: TRANSACTION_SCHEMA.nullable(),
			}),
		),
	}),
} satisfies EndpointDefinition<{ debtId: string }>;

const ASSIGN_PAYMENT_TRANSACTIONS = {
	getPath: (params) => ["debt", params.debtId, "payment-transactions"],
	paramsMapping: { debtId: "debtId" },
	method: EndpointMethod.POST,
	bodyDto: z.object({
		transactions: z.array(CREATE_DEBT_PAYMENT_SCHEMA.omit({ debtId: true })),
	}),
} satisfies EndpointDefinition<{ debtId: string }>;

const GET_ASSIGNED_PAYMENT_TRANSACTIONS = {
	getPath: (params) => ["debt", params.debtId, "payment-transactions"],
	paramsMapping: { debtId: "debtId" },
	method: EndpointMethod.GET,
	responseDto: z.object({
		transactions: z.array(
			z.object({
				...DEBT_PAYMENT_SCHEMA.shape,
				transaction: TRANSACTION_SCHEMA.nullable(),
			}),
		),
	}),
} satisfies EndpointDefinition<{ debtId: string }>;

/* Controller */

export const MY_DEBTS_CONTROLLER = {
	getPath: () => ["my-debts"],
	paramsMapping: {},
	endpoints: {
		getDebts: GET_LIST,
		createDebt: CREATE,
		updateDebt: UPDATE,
		deleteDebt: DELETE,

		// Assign origin transactions
		assignOriginTransactions: ASSIGN_ORIGIN_TRANSACTIONS,
		getAssignedOriginTransactions: GET_ASSIGNED_ORIGIN_TRANSACTIONS,

		// Assign payment transactions
		assignPaymentTransactions: ASSIGN_PAYMENT_TRANSACTIONS,
		getAssignedPaymentTransactions: GET_ASSIGNED_PAYMENT_TRANSACTIONS,
	},
} satisfies ControllerDefinition;
