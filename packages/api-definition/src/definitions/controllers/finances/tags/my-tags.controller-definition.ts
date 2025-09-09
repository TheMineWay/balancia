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

// List

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

// CRUD

const GET_TAG = {
	getPath: (options) => ["tag", options.id],
	paramsMapping: { id: "tagId" },
	responseDto: z.object({
		...TAG_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const CREATE_TAG = {
	getPath: () => ["tag"],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...TAG_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const UPDATE_TAG = {
	getPath: (options) => ["tag", options.id],
	paramsMapping: { id: "tagId" },
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...TAG_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ id: string }>;

const DELETE_TAG = {
	getPath: (options) => ["tag", options.id],
	paramsMapping: { id: "tagId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ id: string }>;

// Other

const GET_TAGS_BY_TRANSACTION = {
	getPath: (params) => ["transaction", params.transactionId],
	paramsMapping: { transactionId: "transactionId" },
	responseDto: z.object({
		tags: z.array(TAG_SCHEMA),
	}),
} satisfies EndpointDefinition<{ transactionId: string }>;

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
		getTagsByTransaction: GET_TAGS_BY_TRANSACTION,
	},
} satisfies ControllerDefinition;
