import {
	ACCOUNT_CREATE_SCHEMA,
	ACCOUNT_MONTHLY_STATS_SCHEMA,
	ACCOUNT_SCHEMA,
	DATE_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
} from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import {
	differenceInMonths,
	endOfMonth,
	isBefore,
	startOfMonth,
	subMonths,
} from "date-fns";
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

// Stats

const GET_ACCOUNT_MONTHLY_STATS_ENDPOINT = {
	getPath: (params) => [params.id, "stats", "monthly"],
	paramsMapping: { id: "accountId" },
	responseDto: z.object({
		stats: z.array(ACCOUNT_MONTHLY_STATS_SCHEMA),
	}),
	queryDto: z
		.object({
			from: DATE_SCHEMA.default(subMonths(new Date(), 6)).transform((d) =>
				startOfMonth(d),
			),
			to: DATE_SCHEMA.default(new Date()).transform((d) => endOfMonth(d)),
		})
		.refine((obj) => isBefore(obj.from, obj.to), {
			error: "From date must be before to date",
		})
		.refine((obj) => differenceInMonths(obj.from, obj.to) <= 24, {
			error: "Date range must not exceed 24 months",
		}),
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
		getMonthlyStats: GET_ACCOUNT_MONTHLY_STATS_ENDPOINT,
	},
} satisfies ControllerDefinition;
