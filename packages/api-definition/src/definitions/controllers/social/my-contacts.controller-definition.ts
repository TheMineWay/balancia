import {
	CONTACT_CREATE_SCHEMA,
	CONTACT_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const GET_CONTACTS_LIST = {
	getPath: () => ["list"],
	paramsMapping: {},
	responseDto: getPaginatedResponse(CONTACT_SCHEMA),
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const GET_BY_ID = {
	getPath: (params) => [params.id],
	paramsMapping: {
		id: "contactId",
	},
	method: EndpointMethod.GET,
	responseDto: CONTACT_SCHEMA,
} satisfies EndpointDefinition<{ id: string }>;

const CREATE_CONTACT = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z
		.object({
			...CONTACT_CREATE_SCHEMA.omit({ code: true }).shape,
			code: CONTACT_CREATE_SCHEMA.shape.code.nullable(),
		})
		.required(),
} satisfies EndpointDefinition;

const UPDATE_CONTACT = {
	getPath: (params) => [params.id],
	paramsMapping: {
		id: "contactId",
	},
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...CONTACT_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const DELETE_CONTACT = {
	getPath: (params) => [params.id],
	method: EndpointMethod.DELETE,
	paramsMapping: {
		id: "contactId",
	},
} satisfies EndpointDefinition<{ id: string }>;

// Controller

export const MY_CONTACTS_CONTROLLER = {
	getPath: () => ["my-contacts"],
	paramsMapping: {},
	endpoints: {
		getContactsList: GET_CONTACTS_LIST,
		getById: GET_BY_ID,
		createContact: CREATE_CONTACT,
		updateContact: UPDATE_CONTACT,
		deleteContact: DELETE_CONTACT,
	},
} satisfies ControllerDefinition;
