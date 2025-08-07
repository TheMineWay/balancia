import { customRandomStringGenerator } from "./generators/custom-random-string-generator.util";
import { RandomStringGenerator } from "./random-string-generator.type";

export const generateRandomString = (
	length: number,
	generator: RandomStringGenerator = customRandomStringGenerator(),
): string => {
	let generated = "";

	while (generated.length < length) {
		generated += generator();
	}

	if (generated.length > length) {
		generated = generated.slice(0, length + 1)[0];
	}

	return generated;
};
