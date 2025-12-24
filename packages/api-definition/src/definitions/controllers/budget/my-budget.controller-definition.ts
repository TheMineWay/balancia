import {
	BUDGET_CREATE_SCHEMA,
	BUDGET_FILTERS_SCHEMA,
	BUDGET_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
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
		...getPaginatedResponse(BUDGET_SCHEMA).shape,
	}),
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
		filters: BUDGET_FILTERS_SCHEMA.optional(),
	}),
} satisfies EndpointDefinition;

// #region CRUD
const GET = {
	getPath: (params) => ["budget", params.budgetId],
	paramsMapping: { budgetId: "budgetId" },
	method: EndpointMethod.GET,
	responseDto: z.object({
		...BUDGET_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ budgetId: string }>;

const CREATE = {
	getPath: () => ["budget"],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...BUDGET_CREATE_SCHEMA.shape,
	}),
	responseDto: z.object({
		...BUDGET_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const UPDATE = {
	getPath: (params) => ["budget", params.budgetId],
	paramsMapping: {
		budgetId: "budgetId",
	},
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...BUDGET_CREATE_SCHEMA.shape,
	}),
	responseDto: z.object({
		...BUDGET_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ budgetId: string }>;

const DELETE = {
	getPath: (params) => ["budget", params.budgetId],
	paramsMapping: { budgetId: "budgetId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ budgetId: string }>;

// #endregion

/* Controller */

export const MY_BUDGET_CONTROLLER_DEFINITION = {
	getPath: () => ["my-budget"],
	paramsMapping: {},
	endpoints: {
		getList: GET_LIST,

		// CRUD
		get: GET,
		create: CREATE,
		update: UPDATE,
		delete: DELETE,
	},
} satisfies ControllerDefinition;
