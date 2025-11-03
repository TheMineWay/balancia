import {
	DEBT_CREATE_SCHEMA,
	DEBT_LIST_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const GET_LIST = {
	getPath: () => ["list"],
	paramsMapping: {},
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
	responseDto: getPaginatedResponse(DEBT_LIST_SCHEMA),
} satisfies EndpointDefinition;

const CREATE = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...DEBT_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const UPDATE = {
	getPath: (options) => ["debt", options.id],
	paramsMapping: { id: "debtId" },
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...DEBT_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const DELETE = {
	getPath: (params) => ["debt", params.debtId],
	paramsMapping: { debtId: "debtId" },
	method: EndpointMethod.DELETE,
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
	},
} satisfies ControllerDefinition;
