import { describe, expect, it } from "vitest";
import {
	generatePageSizeFromLimits,
	PageSizeGenerationStrategy,
} from "./generate-page-sizes-from-limits.util";

describe("generatePageSizeFromLimits()", () => {
	it("should return single value when min equals max", () => {
		const result = generatePageSizeFromLimits({ min: 50, max: 50 });
		expect(result).toEqual([50]);
	});

	describe("should throw error", () => {
		it("when min is 0 or negative", () => {
			expect(() => generatePageSizeFromLimits({ min: 0, max: 100 })).toThrow(
				"Bad limits",
			);
			expect(() => generatePageSizeFromLimits({ min: -10, max: 100 })).toThrow(
				"Bad limits",
			);
		});

		it("when max is less than min", () => {
			expect(() => generatePageSizeFromLimits({ min: 100, max: 50 })).toThrow(
				"Bad limits",
			);
		});
	});

	describe("DOUBLE_EVERY_STEP strategy", () => {
		it("should double values at each step", () => {
			const result = generatePageSizeFromLimits({
				min: 10,
				max: 100,
				strategy: PageSizeGenerationStrategy.DOUBLE_EVERY_STEP,
			});
			expect(result).toEqual([10, 20, 40, 80, 100]);
		});

		it("should include max value if not exactly doubled", () => {
			const result = generatePageSizeFromLimits({
				min: 5,
				max: 50,
				strategy: PageSizeGenerationStrategy.DOUBLE_EVERY_STEP,
			});
			expect(result).toEqual([5, 10, 20, 40, 50]);
		});

		it("should not duplicate max if it matches last doubled value", () => {
			const result = generatePageSizeFromLimits({
				min: 10,
				max: 80,
				strategy: PageSizeGenerationStrategy.DOUBLE_EVERY_STEP,
			});
			expect(result).toEqual([10, 20, 40, 80]);
		});
	});

	describe("PROGRESSIVE strategy", () => {
		it("should generate nice rounded series from 20 to 500", () => {
			const result = generatePageSizeFromLimits({
				min: 20,
				max: 300,
				strategy: PageSizeGenerationStrategy.PROGRESSIVE,
			});
			expect(result).toEqual([20, 40, 60, 80, 100, 150, 200, 250, 300]);
		});

		it("should generate series from 10 to 100", () => {
			const result = generatePageSizeFromLimits({
				min: 10,
				max: 100,
				strategy: PageSizeGenerationStrategy.PROGRESSIVE,
			});
			expect(result).toEqual([10, 30, 50, 70, 90, 100]);
		});

		it("should include min if not in nice numbers", () => {
			const result = generatePageSizeFromLimits({
				min: 15,
				max: 100,
				strategy: PageSizeGenerationStrategy.PROGRESSIVE,
			});
			expect(result).toEqual([15, 40, 60, 80, 100]);
		});

		it("should include max if not in nice numbers", () => {
			const result = generatePageSizeFromLimits({
				min: 20,
				max: 170,
				strategy: PageSizeGenerationStrategy.PROGRESSIVE,
			});
			expect(result).toEqual([20, 40, 60, 80, 100, 150, 170]);
		});

		it("should work with large ranges", () => {
			const result = generatePageSizeFromLimits({
				min: 450,
				max: 2500,
				strategy: PageSizeGenerationStrategy.PROGRESSIVE,
			});
			expect(result).toEqual([450, 500, 1000, 1500, 2000, 2500]);
		});

		it("should handle edge case with custom min and max", () => {
			const result = generatePageSizeFromLimits({
				min: 5,
				max: 15,
				strategy: PageSizeGenerationStrategy.PROGRESSIVE,
			});
			expect(result).toEqual([5, 15]);
		});
	});
});
