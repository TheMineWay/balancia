import {
	AutoAssignCriteriaModel,
	AutoAssignTriggerMatchOption,
	AutoAssignTriggerType,
} from "@shared/models";
import { describe, expect, it } from "vitest";
import { autoAssignMatch } from "./auto-assign-match.util";

const ITEM_BASE = {
	id: 1,
	name: "Item 0",
	subject: "Subject 0",
	createdAt: new Date(),
};

describe("autoAssignMatch(item, criteria)", () => {
	describe("field based trigger in", () => {
		describe("equals mode should", () => {
			describe("match", () => {
				it("when the item field equals the criteria field", () => {
					const VALUE = "Test";
					const ITEM = {
						...ITEM_BASE,
						subject: VALUE,
					};

					const criteria: AutoAssignCriteriaModel = {
						type: AutoAssignTriggerType.FIELD,
						field: "subject",
						matchMode: AutoAssignTriggerMatchOption.EQUALS,
						value: VALUE,
					};

					const match = autoAssignMatch(ITEM, criteria);
					expect(match).toBe(true);
				});

				it("when the item field equals non-capital-sensitive the criteria field", () => {
					const VALUE = "Test";
					const ITEM = {
						...ITEM_BASE,
						subject: VALUE.toUpperCase(),
					};

					const criteria: AutoAssignCriteriaModel = {
						type: AutoAssignTriggerType.FIELD,
						field: "subject",
						matchMode: AutoAssignTriggerMatchOption.EQUALS,
						value: VALUE.toLowerCase(),
					};

					const match = autoAssignMatch(ITEM, criteria);
					expect(match).toBe(true);
				});
			});

			describe("not match", () => {
				it("when the item field does not equal the criteria field", () => {
					const VALUE = "Test";
					const ITEM = {
						...ITEM_BASE,
						subject: VALUE + "(1)",
					};

					const criteria: AutoAssignCriteriaModel = {
						type: AutoAssignTriggerType.FIELD,
						field: "subject",
						matchMode: AutoAssignTriggerMatchOption.EQUALS,
						value: VALUE,
					};

					const match = autoAssignMatch(ITEM, criteria);
					expect(match).not.toBe(true);
				});
			});
		});

		describe("contains mode should", () => {
			describe("match", () => {
				it("when the item field contains the criteria field", () => {
					const VALUE = "Test";
					const ITEM = {
						...ITEM_BASE,
						subject: "This is a " + VALUE + " string",
					};

					const criteria: AutoAssignCriteriaModel = {
						type: AutoAssignTriggerType.FIELD,
						field: "subject",
						matchMode: AutoAssignTriggerMatchOption.CONTAINS,
						value: VALUE,
					};

					const match = autoAssignMatch(ITEM, criteria);
					expect(match).toBe(true);
				});

				it("when the item field contains non-capital-sensitive the criteria field", () => {
					const VALUE = "Test";
					const ITEM = {
						...ITEM_BASE,
						subject: "This is a " + VALUE.toUpperCase() + " string",
					};
					const criteria: AutoAssignCriteriaModel = {
						type: AutoAssignTriggerType.FIELD,
						field: "subject",
						matchMode: AutoAssignTriggerMatchOption.CONTAINS,
						value: VALUE.toLowerCase(),
					};

					const match = autoAssignMatch(ITEM, criteria);
					expect(match).toBe(true);
				});
			});

			describe("not match", () => {
				it("when the item field does not contain the criteria field", () => {
					const VALUE = "Test";
					const ITEM = {
						...ITEM_BASE,
						subject: "This is a string",
					};

					const criteria: AutoAssignCriteriaModel = {
						type: AutoAssignTriggerType.FIELD,
						field: "subject",
						matchMode: AutoAssignTriggerMatchOption.CONTAINS,
						value: VALUE,
					};
					const match = autoAssignMatch(ITEM, criteria);
					expect(match).not.toBe(true);
				});
			});
		});
	});
});
