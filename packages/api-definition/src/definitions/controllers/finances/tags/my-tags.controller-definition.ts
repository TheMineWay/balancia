import {
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
	TAG_CREATE_SCHEMA,
	TAG_SCHEMA,
} from "@shared/models";
import type { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

const GET_TAGS_LIST_ENDPOINT = {
	getPath: () => [],
	paramsMapping: {},
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
	responseDto: getPaginatedResponse(
		z.object({
			...TAG_SCHEMA.shape,
		}),
	),
} satisfies EndpointDefinition;

const GET_TAG = {
	getPath: (options) => [options.id],
	paramsMapping: { id: "tagId" },
	responseDto: z.object({
		...TAG_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const CREATE_TAG = {
	getPath: () => [],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...TAG_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const UPDATE_TAG = {
	getPath: (options) => [options.id],
	paramsMapping: { id: "tagId" },
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...TAG_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const DELETE_TAG = {
	getPath: (options) => [options.id],
	paramsMapping: { id: "tagId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ id: string }>;

// Controller

export const MY_TAGS_CONTROLLER = {
	getPath: () => ["my-tags"],
	paramsMapping: {},
	endpoints: {
		getTagsList: GET_TAGS_LIST_ENDPOINT,
		getTag: GET_TAG,
		createTag: CREATE_TAG,
		updateTag: UPDATE_TAG,
		deleteTag: DELETE_TAG,
	},
} satisfies ControllerDefinition;
