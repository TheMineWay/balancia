import { compareSync, hashSync } from "bcrypt";

export function hash(text: string): string {
	const saltRounds = 10; // Default rounds
	return hashSync(text, saltRounds);
}

export function compareHash(
	originalPassword: string,
	strangePassword: string,
): boolean {
	return compareSync(strangePassword, originalPassword);
}
