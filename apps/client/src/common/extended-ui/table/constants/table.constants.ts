import { ACTION_SHARED_PROPS } from "@common/extended-ui/button/actions/constants/action-shared-props.constant";
import type { ActionIconProps } from "@mantine/core";

type PropTypes = keyof typeof ACTION_SHARED_PROPS;

/**
 * Props for action buttons used in tables.
 */
export const TABLE_ACTION_PROPS = {
	default: {
		...ACTION_SHARED_PROPS.default,
	},
	primary: {
		...ACTION_SHARED_PROPS.primary,
	},
	danger: {
		...ACTION_SHARED_PROPS.danger,
	},
	success: {
		...ACTION_SHARED_PROPS.success,
	},
	warning: {
		...ACTION_SHARED_PROPS.warning,
	},
	info: {
		...ACTION_SHARED_PROPS.info,
	},
	ghost: {
		...ACTION_SHARED_PROPS.ghost,
	},
} satisfies Record<PropTypes, ActionIconProps>;
