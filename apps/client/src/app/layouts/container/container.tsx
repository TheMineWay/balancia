import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import clsx from "clsx";

type Props = WithChildren & {
	className?: string;
};

/**
 * Container component that provides consistent page-level layout with centered content.
 * Applies responsive padding and max-width constraints.
 */
export const Container: FC<Props> = ({ children, className }) => {
	return (
		<div className={clsx("px-2 mx-auto container", className)}>{children}</div>
	);
};
