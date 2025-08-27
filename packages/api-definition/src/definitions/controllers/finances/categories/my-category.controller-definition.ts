import {
	CATEGORY_CREATE_SCHEMA,
	CATEGORY_SCHEMA,
	getPaginatedResponse,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";

// Endpoints

const GET_CATEGORIES_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	responseDto: getPaginatedResponse(CATEGORY_SCHEMA),
} satisfies EndpointDefinition;

const CREATE_CATEGORY_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	bodyDto: CATEGORY_CREATE_SCHEMA,
	method: EndpointMethod.POST,
} satisfies EndpointDefinition;

const UPDATE_CATEGORY_ENDPOINT = {
	getPath: (params) => [params.id],
	paramsMapping: { id: "categoryId" },
	bodyDto: CATEGORY_CREATE_SCHEMA,
	method: EndpointMethod.PUT,
} satisfies EndpointDefinition<{ id: string }>;

const DELETE_CATEGORY_ENDPOINT = {
	getPath: (params) => [params.id],
	paramsMapping: { id: "categoryId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ id: string }>;

// Controller

export const MY_CATEGORY_CONTROLLER = {
	getPath: () => ["my-categories"],
	paramsMapping: {},
	endpoints: {
		getCategories: GET_CATEGORIES_ENDPOINT,
		createCategory: CREATE_CATEGORY_ENDPOINT,
		updateCategory: UPDATE_CATEGORY_ENDPOINT,
		deleteCategory: DELETE_CATEGORY_ENDPOINT,
	},
} satisfies ControllerDefinition;
