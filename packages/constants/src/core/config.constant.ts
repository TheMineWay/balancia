export const CONFIG = {
	totp: {
		digits: 6,
		secretByteLength: 24,
		totpIdleConfigTimeout: 5, // In minutes. Represents how much a TOTP code can be active on "validation stage"
	},
};
