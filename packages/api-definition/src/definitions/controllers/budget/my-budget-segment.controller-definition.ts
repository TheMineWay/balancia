import {
	BUDGET_SEGMENT_CREATE_SCHEMA,
	BUDGET_SEGMENT_IMPUTATION_CREATE_SCHEMA,
	BUDGET_SEGMENT_IMPUTATION_SCHEMA,
	BUDGET_SEGMENT_IMPUTATION_WITH_TRANSACTION_SCHEMA,
	BUDGET_SEGMENT_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
	TRANSACTION_FILTERS_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import type { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

/* Endpoints */

const GET_BY_BUDGET = {
	getPath: (params) => ["budget", params.budgetId, "list"],
	paramsMapping: {
		budgetId: "budgetId",
	},
	method: EndpointMethod.GET,
	responseDto: z.object({
		segments: z.array(BUDGET_SEGMENT_SCHEMA),
	}),
} satisfies EndpointDefinition<{ budgetId: string }>;

// #region CRUD
const GET = {
	getPath: (params) => ["segment", params.segmentId],
	paramsMapping: { segmentId: "segmentId" },
	method: EndpointMethod.GET,
	responseDto: z.object({
		...BUDGET_SEGMENT_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ segmentId: string }>;

const CREATE = {
	getPath: () => ["segment"],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...BUDGET_SEGMENT_CREATE_SCHEMA.shape,
	}),
	responseDto: z.object({
		...BUDGET_SEGMENT_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const UPDATE = {
	getPath: (params) => ["segment", params.segmentId],
	paramsMapping: {
		segmentId: "segmentId",
	},
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...BUDGET_SEGMENT_CREATE_SCHEMA.omit({ budgetId: true }).shape,
	}),
	responseDto: z.object({
		...BUDGET_SEGMENT_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ segmentId: string }>;

const DELETE = {
	getPath: (params) => ["segment", params.segmentId],
	paramsMapping: { segmentId: "segmentId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ segmentId: string }>;

// #endregion

// #region Transactions

const LIST_IMPUTATIONS = {
	getPath: (params) => ["impute", "segment", params.segmentId, "transactions"],
	paramsMapping: { segmentId: "segmentId" },
	method: EndpointMethod.GET,
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
		filters: z
			.object({ ...TRANSACTION_FILTERS_SCHEMA.shape })
			.nullable()
			.default(null),
	}),
	responseDto: z.object({
		...getPaginatedResponse(BUDGET_SEGMENT_IMPUTATION_WITH_TRANSACTION_SCHEMA)
			.shape,
	}),
} satisfies EndpointDefinition<{ segmentId: string }>;

const IMPUTE = {
	getPath: () => ["impute"],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...BUDGET_SEGMENT_IMPUTATION_CREATE_SCHEMA.shape,
	}),
	responseDto: z.object({
		...BUDGET_SEGMENT_IMPUTATION_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const UPDATE_IMPUTATION = {
	getPath: (params) => ["impute", params.id],
	paramsMapping: { id: "imputeId" },
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...BUDGET_SEGMENT_IMPUTATION_CREATE_SCHEMA.omit({
			segmentId: true,
			transactionId: true,
		}).shape,
	}),
	responseDto: z.object({
		...BUDGET_SEGMENT_IMPUTATION_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const REMOVE_IMPUTATION = {
	getPath: (params) => ["impute", params.id],
	paramsMapping: { id: "imputeId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ id: string }>;

// #endregion

/* Controller */

export const MY_BUDGET_SEGMENT_CONTROLLER_DEFINITION = {
	getPath: () => ["my-budget-segments"],
	paramsMapping: { budgetId: "budgetId" },
	endpoints: {
		getByBudget: GET_BY_BUDGET,

		// CRUD
		get: GET,
		create: CREATE,
		update: UPDATE,
		delete: DELETE,

		// Transactions
		listImputations: LIST_IMPUTATIONS,
		impute: IMPUTE,
		updateImputation: UPDATE_IMPUTATION,
		removeImputation: REMOVE_IMPUTATION,
	},
} satisfies ControllerDefinition;
