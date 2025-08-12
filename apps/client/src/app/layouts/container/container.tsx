import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import clsx from "clsx";

type Props = WithChildren & {
	className?: string;
};

export const Container: FC<Props> = ({ children, className }) => {
	return <div className={clsx("px-2 mx-auto container", className)}>{children}</div>;
};
