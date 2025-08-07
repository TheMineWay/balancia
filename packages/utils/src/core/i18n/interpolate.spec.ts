import { describe, expect, it } from "vitest";
import { interpolate } from "./interpolate";

const SIMPLE_TEXT = "Hello {name}!";
const MEDIUM_TEXT = "Hi {name}, it's me {author}!";
const ESCAPED_TEXT = "Hi {name}, I am {{escaped}}.";

const testWithArgs = (
	name: string | null,
	text: string,
	expectStr: (vars?: Record<string, string>) => string,
	variables: (Record<string, string> | undefined)[],
) => {
	const t = name ? it : (cb: () => void) => cb();
	t(() => {
		variables.forEach((vars) => {
			expect(interpolate(text, vars)).toEqual(expectStr(vars));
		});
	});
};

describe("interpolate()", () => {
	describe("when no variables are provided", () => {
		testWithArgs(
			"should return the text as is",
			SIMPLE_TEXT,
			() => SIMPLE_TEXT,
			[undefined, {}],
		);
	});

	describe("when variables are provided", () => {
		it("should replace variables with the provided values", () => {
			testWithArgs(null, SIMPLE_TEXT, (vars) => `Hello ${vars?.name}!`, [
				{ name: "Ada" },
				{ name: "Bob", unknownVar: "Something" },
			]);

			testWithArgs(
				null,
				MEDIUM_TEXT,
				(vars) => `Hi ${vars?.name}, it's me ${vars?.author}!`,
				[
					{ name: "Rick", author: "Morty" },
					{ name: "Bee", author: "Puppycat", extra: "Extra info" },
				],
			);
		});

		it('should leave not provided variables as "{variable}"', () => {
			expect(interpolate(SIMPLE_TEXT, { wrongVar: "Ada" })).toEqual(
				"Hello {name}!",
			);
		});
	});

	describe("when variables contain special characters", () => {
		it('should escape with double "{"', () => {
			expect(interpolate(ESCAPED_TEXT, { name: "Ada" })).toEqual(
				"Hi Ada, I am {escaped}.",
			);
		});
	});
});
