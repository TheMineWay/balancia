import {
	BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_CREATE_SCHEMA,
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

const GET_SEGMENT_CATEGORY_MATCHERS_ENDPOINT = {
	getPath: (params) => ["segment", params.segmentId, "category-matchers"],
	paramsMapping: {
		segmentId: "segmentId",
	},
	queryDto: z.object({
		...PAGINATED_SEARCH_SCHEMA.shape,
	}),
	responseDto: getPaginatedResponse(
		BUDGET_SEGMENT_CATEGORY_AUTO_MATCHER_SCHEMA,
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

// #endregion

// Controller

export const MY_BUDGET_AUTOMATIONS_CONTROLLER = {
	getPath: () => ["my-budget-automations"],
	paramsMapping: {},
	endpoints: {
		// Category matchers
		getSegmentCategoryMatchers: GET_SEGMENT_CATEGORY_MATCHERS_ENDPOINT,
		getSegmentCategoryMatcherBySegmentAndCategory:
			GET_SEGMENT_CATEGORY_MATCHER_BY_SEGMENT_AND_CATEGORY_ENDPOINT,
		createSegmentCategoryMatcher: CREATE_SEGMENT_CATEGORY_ENDPOINT,
		deleteSegmentCategoryMatcher: DELETE_SEGMENT_CATEGORY_ENDPOINT,
	},
} satisfies ControllerDefinition;
