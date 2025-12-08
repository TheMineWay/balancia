import type { ActionIconProps } from "@mantine/core";

/**
 * Common props for action buttons.
 */
const COMMON = {
	size: "md",
	variant: "light",
} satisfies Partial<ActionIconProps>;

/**
 * Shared props for action buttons and icons.
 */
export const ACTION_SHARED_PROPS = {
	/**
	 * Default action style.
	 * Used for standard actions.
	 */
	default: {
		...COMMON,
	},

	/**
	 * Primary action style.
	 * Used for main/important actions like save, submit, create.
	 */
	primary: {
		...COMMON,
		variant: "filled",
	},

	/**
	 * Success action style.
	 * Used for confirmations, approvals, successful operations.
	 */
	success: {
		...COMMON,
		color: "green",
	},

	/**
	 * Warning action style.
	 * Used for caution actions like archive, disable.
	 */
	warning: {
		...COMMON,
		color: "yellow",
	},

	/**
	 * Danger action style.
	 * Used for destructive actions like delete, remove.
	 */
	danger: {
		...COMMON,
		color: "red",
	},

	/**
	 * Info action style.
	 * Used for informational actions like view details, help.
	 */
	info: {
		...COMMON,
		color: "cyan",
	},

	/**
	 * Ghost/Minimal action style.
	 * Used for subtle actions in toolbars or tables.
	 */
	ghost: {
		...COMMON,
		variant: "subtle",
		color: "gray",
	},
} satisfies Record<string, ActionIconProps>;
