import {
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
	TAG_AUTOMATCHER_CREATE_SCHEMA,
	TAG_AUTOMATCHER_SCHEMA,
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

// #region CRUD

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

// #endregion

// #region Transaction related

const ADD_TAG_TO_TRANSACTION = {
	getPath: (options) => [
		"tag",
		options.tagId,
		"transaction",
		options.transactionId,
		"assignation",
	],
	paramsMapping: { transactionId: "transactionId", tagId: "tagId" },
	method: EndpointMethod.POST,
} satisfies EndpointDefinition<{ transactionId: string; tagId: string }>;

const REMOVE_TAG_FROM_TRANSACTION = {
	getPath: (options) => [
		"tag",
		options.tagId,
		"transaction",
		options.transactionId,
		"assignation",
	],
	paramsMapping: { transactionId: "transactionId", tagId: "tagId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ transactionId: string; tagId: string }>;

const GET_TAGS_BY_TRANSACTION = {
	getPath: (params) => ["transaction", params.transactionId],
	paramsMapping: { transactionId: "transactionId" },
	responseDto: z.object({
		tags: z.array(TAG_SCHEMA),
	}),
} satisfies EndpointDefinition<{ transactionId: string }>;

// #endregion

// #region Auto match

const GET_TAG_AUTO_MATCHS_LIST_ENDPOINT = {
	getPath: (options) => ["tag", options.tagId, "automatch"],
	paramsMapping: { tagId: "tagId" },
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
	responseDto: getPaginatedResponse(
		z.object({
			...TAG_AUTOMATCHER_SCHEMA.shape,
		}),
	),
} satisfies EndpointDefinition<{ tagId: string }>;

const ADD_TAG_AUTO_MATCH_ENDPOINT = {
	getPath: () => ["automatch"],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: z.object({
		...TAG_AUTOMATCHER_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition;

const UPDATE_TAG_AUTO_MATCH_ENDPOINT = {
	getPath: (options) => ["auto-match", options.autoMatchId],
	paramsMapping: { autoMatchId: "autoMatchId" },
	method: EndpointMethod.PUT,
	bodyDto: z.object({
		...TAG_AUTOMATCHER_CREATE_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{ autoMatchId: string }>;

const REMOVE_TAG_AUTO_MATCH_ENDPOINT = {
	getPath: (options) => ["auto-match", options.autoMatchId],
	paramsMapping: { autoMatchId: "autoMatchId" },
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{ autoMatchId: string }>;

// #endregion

// Controller

export const MY_TAGS_CONTROLLER = {
	getPath: () => ["my-tags"],
	paramsMapping: {},
	endpoints: {
		getTagsList: GET_TAGS_LIST_ENDPOINT,

		// CRUD
		getTag: GET_TAG,
		createTag: CREATE_TAG,
		updateTag: UPDATE_TAG,
		deleteTag: DELETE_TAG,

		// Transaction related
		addTagToTransaction: ADD_TAG_TO_TRANSACTION,
		removeTagFromTransaction: REMOVE_TAG_FROM_TRANSACTION,
		getTagsByTransaction: GET_TAGS_BY_TRANSACTION,

		// Auto match
		getTagAutoMatchsList: GET_TAG_AUTO_MATCHS_LIST_ENDPOINT,
		addTagAutoMatch: ADD_TAG_AUTO_MATCH_ENDPOINT,
		removeTagAutoMatch: REMOVE_TAG_AUTO_MATCH_ENDPOINT,
		updateTagAutoMatch: UPDATE_TAG_AUTO_MATCH_ENDPOINT,
	},
} satisfies ControllerDefinition;
