import {
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_CREATE_SCHEMA,
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_LIST_ITEM_SCHEMA,
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_RUN_MATCHERS_FILTERS_SCHEMA,
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_SCHEMA,
	getPaginatedResponse,
	PAGINATED_SEARCH_SCHEMA,
} from "@shared/models";
import { ControllerDefinition } from "@ts-types/controller-definition.type";
import { EndpointDefinition } from "@ts-types/endpoint-definition.type";
import { EndpointMethod } from "@ts-types/endpoint-method.enum";
import z from "zod";

// Endpoints

// #region Category matchers

const GET_SEGMENT_CATEGORY_MATCHERS_LIST_ENDPOINT = {
	getPath: (params) => ["segment", params.segmentId, "category-matchers"],
	paramsMapping: {
		segmentId: "segmentId",
	},
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
	responseDto: getPaginatedResponse(
		BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_LIST_ITEM_SCHEMA,
	),
} satisfies EndpointDefinition<{
	segmentId: string;
}>;

const GET_SEGMENT_CATEGORY_MATCHER_BY_SEGMENT_AND_CATEGORY_ENDPOINT = {
	getPath: (params) => [
		"segment",
		params.segmentId,
		"category",
		params.categoryId,
		"matcher",
	],
	paramsMapping: {
		segmentId: "segmentId",
		categoryId: "categoryId",
	},
	responseDto: z.object({
		matcher: BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_SCHEMA.nullable(),
	}),
} satisfies EndpointDefinition<{
	segmentId: string;
	categoryId: string;
}>;

const CHECK_SEGMENT_CATEGORY_CAN_BE_ASSIGNED_ENDPOINT = {
	getPath: (params) => [
		"segment",
		params.segmentId,
		"category",
		params.categoryId,
		"can-assign",
	],
	paramsMapping: {
		segmentId: "segmentId",
		categoryId: "categoryId",
	},
	responseDto: z.object({
		canAssign: z.boolean(),
	}),
} satisfies EndpointDefinition<{
	segmentId: string;
	categoryId: string;
}>;

const CREATE_SEGMENT_CATEGORY_ENDPOINT = {
	getPath: () => ["segment-category-matcher"],
	paramsMapping: {},
	method: EndpointMethod.POST,
	bodyDto: BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_CREATE_SCHEMA,
	responseDto: BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_SCHEMA,
} satisfies EndpointDefinition;

const DELETE_SEGMENT_CATEGORY_ENDPOINT = {
	getPath: (params) => [
		"segment",
		params.segmentId,
		"category",
		params.categoryId,
		"matcher",
	],
	paramsMapping: {
		segmentId: "segmentId",
		categoryId: "categoryId",
	},
	method: EndpointMethod.DELETE,
} satisfies EndpointDefinition<{
	segmentId: string;
	categoryId: string;
}>;

const RUN_SEGMENT_AUTO_MATCHERS_ENDPOINT = {
	getPath: (params) => ["segment", params.segmentId, "run-auto-matchers"],
	paramsMapping: {
		segmentId: "segmentId",
	},
	method: EndpointMethod.POST,
	responseDto: z.object({
		success: z.boolean(),
	}),
	queryDto: z.object({
		...BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_RUN_MATCHERS_FILTERS_SCHEMA.shape,
	}),
} satisfies EndpointDefinition<{
	segmentId: string;
}>;

// #endregion

// Controller

export const MY_BUDGET_AUTOMATIONS_CONTROLLER = {
	getPath: () => ["my-budget-automations"],
	paramsMapping: {},
	endpoints: {
		// Category matchers
		getSegmentCategoryMatchersList: GET_SEGMENT_CATEGORY_MATCHERS_LIST_ENDPOINT,
		getSegmentCategoryMatcherBySegmentAndCategory:
			GET_SEGMENT_CATEGORY_MATCHER_BY_SEGMENT_AND_CATEGORY_ENDPOINT,
		checkSegmentCategoryCanBeAssigned:
			CHECK_SEGMENT_CATEGORY_CAN_BE_ASSIGNED_ENDPOINT,
		createSegmentCategoryMatcher: CREATE_SEGMENT_CATEGORY_ENDPOINT,
		deleteSegmentCategoryMatcher: DELETE_SEGMENT_CATEGORY_ENDPOINT,
		runSegmentAutoMatchers: RUN_SEGMENT_AUTO_MATCHERS_ENDPOINT,
	},
} satisfies ControllerDefinition;
