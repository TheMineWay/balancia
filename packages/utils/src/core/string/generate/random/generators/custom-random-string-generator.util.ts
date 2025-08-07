import type { RandomStringGenerator } from "../random-string-generator.type";

export type CustomRandomStringGeneratorOptions = {
	capital?: boolean;
	lower?: boolean;
	numbers?: boolean;
	special?: boolean;
};

export const customRandomStringGenerator = ({
	capital: capitalOpt = true,
	lower: lowerOpt = true,
	numbers: numbersOpt = true,
	special: specialOpt = true,
}: CustomRandomStringGeneratorOptions = {}): RandomStringGenerator => {
	const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const specialCharacters = "!@#$%^&*()_+[]{}|;:,.<>?/";

	let characterPool = "";
	if (capitalOpt) characterPool += capitalLetters;
	if (lowerOpt) characterPool += lowerLetters;
	if (numbersOpt) characterPool += numbers;
	if (specialOpt) characterPool += specialCharacters;

	if (!characterPool)
		throw new Error("At least one character type must be enabled");

	return () => {
		const randomIndex = Math.floor(Math.random() * characterPool.length);
		return characterPool[randomIndex];
	};
};
