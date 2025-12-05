/* Types */

export enum PageSizeGenerationStrategy {
	PROGRESSIVE = "progressive",
	DOUBLE_EVERY_STEP = "double_every_step",
}

/* Utility */

type Options = {
	min: number;
	max: number;
	strategy?: PageSizeGenerationStrategy;
};

export const generatePageSizeFromLimits = ({
	min,
	max,
	strategy = PageSizeGenerationStrategy.PROGRESSIVE,
}: Options): number[] => {
	if (min <= 0 || max < min) throw new Error("Bad limits");
	if (min === max) return [min];

	return STRATEGIES[strategy](min, max);
};

/* Strategies */

/**
 * Generates page sizes by doubling the size at each step.
 */
const doubleEveryStep = (min: number, max: number): number[] => {
	const pageSizes: number[] = [];

	let current = min;
	while (current <= max) {
		pageSizes.push(current);
		current *= 2;
	}

	if (pageSizes[pageSizes.length - 1] !== max) {
		pageSizes.push(max);
	}

	return pageSizes;
};

/**
 * Generates page sizes with smaller increments at the beginning and larger increments as the sizes grow.
 */
const progressive = (min: number, max: number): number[] => {
	const pageSizes: number[] = [min];

	// Start on min or next rounded ten
	let current: number = min % 10 === 0 ? min : Math.ceil(min / 10) * 10;
	do {
		if (current < 100) {
			current += 20;
		} else if (current < 500) {
			current += 50;
		} else {
			current += 500;
		}
		if (current <= max) pageSizes.push(current);
	} while (current < max);

	if (pageSizes[pageSizes.length - 1] !== max) pageSizes.push(max);

	return pageSizes;
};

const STRATEGIES = {
	[PageSizeGenerationStrategy.DOUBLE_EVERY_STEP]: doubleEveryStep,
	[PageSizeGenerationStrategy.PROGRESSIVE]: progressive,
} satisfies Record<
	PageSizeGenerationStrategy,
	(min: number, max: number) => number[]
>;
