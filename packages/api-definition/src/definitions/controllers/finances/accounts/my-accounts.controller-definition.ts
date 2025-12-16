import { MAX_STATS_MONTH_DATE_DIFF } from "@shared/constants";
import {
	ACCOUNT_CREATE_SCHEMA,
	ACCOUNT_MONTHLY_STATS_SCHEMA,
	ACCOUNT_SCHEMA,
	CATEGORY_EXPENSES_MODEL_SCHEMA,
	DATE_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
} from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import { differenceInMonths, isBefore, subMonths } from "date-fns";
import z from "zod";

// Endpoints

const GET_ACCOUNTS_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	responseDto: getPaginatedResponse(ACCOUNT_SCHEMA),
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const GET_ACCOUNT_ENDPOINT = {
	getPath: (params) => [params.id],
	paramsMapping: {
		id: "accountId",
	},
	responseDto: z.object({
		...ACCOUNT_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const CREATE_ACCOUNT_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...ACCOUNT_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const DELETE_ACCOUNT_ENDPOINT = {
	getPath: (params) => [params.id],
	method: EndpointMethod.DELETE,
	paramsMapping: {
		id: "accountId",
	},
} satisfies EndpointDefinition<{ id: string }>;

const UPDATE_ACCOUNT_ENDPOINT = {
	getPath: (params) => [params.id],
	paramsMapping: {
		id: "accountId",
	},
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...ACCOUNT_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

// Main account

const SET_MAIN_ACCOUNT = {
	getPath: () => ["main-account"],
	method: EndpointMethod.PUT,
	paramsMapping: {},
	bodyDto: z.object({
		accountId: ACCOUNT_SCHEMA.shape.id.nullable(),
	}),
} satisfies EndpointDefinition;

// Stats

const DATE_RANGE_SCHEMA = z
	.object({
		from: DATE_SCHEMA.default(subMonths(new Date(), 6)),
		to: DATE_SCHEMA.default(new Date()),
	})
	.refine((obj) => isBefore(obj.from, obj.to), {
		error: "From date must be before to date",
	})
	.refine(
		(obj) => differenceInMonths(obj.from, obj.to) <= MAX_STATS_MONTH_DATE_DIFF,
		{
			error: `Date range must not exceed ${MAX_STATS_MONTH_DATE_DIFF} months`,
		},
	);

const GET_ACCOUNT_MONTHLY_STATS_ENDPOINT = {
	getPath: (params) => [params.id, "stats", "monthly"],
	paramsMapping: { id: "accountId" },
	responseDto: z.object({
		stats: z.array(ACCOUNT_MONTHLY_STATS_SCHEMA),
	}),
	queryDto: DATE_RANGE_SCHEMA,
} satisfies EndpointDefinition<{ id: string }>;

const GET_ACCOUNT_CATEGORY_EXPENSES_STATS_ENDPOINT = {
	getPath: (params) => [params.id, "stats", "category-expenses"],
	paramsMapping: { id: "accountId" },
	responseDto: z.object({
		stats: z.array(CATEGORY_EXPENSES_MODEL_SCHEMA),
	}),
	queryDto: DATE_RANGE_SCHEMA,
} satisfies EndpointDefinition<{ id: string }>;

// Controller

export const MY_ACCOUNTS_CONTROLLER = {
	getPath: () => ["my-accounts"],
	paramsMapping: {},
	endpoints: {
		getAccounts: GET_ACCOUNTS_ENDPOINT,
		get: GET_ACCOUNT_ENDPOINT,
		create: CREATE_ACCOUNT_ENDPOINT,
		delete: DELETE_ACCOUNT_ENDPOINT,
		update: UPDATE_ACCOUNT_ENDPOINT,

		// Main account
		setMainAccount: SET_MAIN_ACCOUNT,

		// Stats
		getMonthlyStats: GET_ACCOUNT_MONTHLY_STATS_ENDPOINT,
		getCategoryExpensesStats: GET_ACCOUNT_CATEGORY_EXPENSES_STATS_ENDPOINT,
	},
} satisfies ControllerDefinition;
