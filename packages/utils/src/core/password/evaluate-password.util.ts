export const evaluatePassword = (password: string) => {
	const minLength = 8;
	const maxLength = 20; // Optional: set a maximum length
	const lengthScore = Math.min(password.length / minLength, 1); // Score from 0 to 1

	const hasUppercase = /[A-Z]/.test(password);
	const hasLowercase = /[a-z]/.test(password);
	const hasNumber = /\d/.test(password);
	const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

	const isSecureLength =
		password.length >= minLength && password.length <= maxLength;

	const score =
		lengthScore * 20 +
		(hasUppercase ? 20 : 0) +
		(hasLowercase ? 20 : 0) +
		(hasNumber ? 20 : 0) +
		(hasSpecialChar ? 20 : 0);

	return {
		score: Math.round(score),
		hasNumber,
		hasUppercase,
		hasLowercase,
		hasSpecialChar,
		isSecureLength,
	};
};
