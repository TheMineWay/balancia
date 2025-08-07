import MD5 from "crypto-js/md5";

/**
 * Generates a Gravatar URL for a given email.
 * @param email - The email address to generate the Gravatar URL for.
 * @param size - Optional size of the Gravatar image (default is 260).
 * @returns The Gravatar URL.
 */
export function getGravatarUrl(email: string, size: number = 260): string {
	const baseUrl = "https://www.gravatar.com/avatar/";
	const trimmedEmail = email.trim().toLowerCase();
	const hash = MD5(trimmedEmail).toString();
	return `${baseUrl}${hash}?s=${size}`;
}
