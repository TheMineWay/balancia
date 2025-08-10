import type { WithChildren } from "@common/extended-ui/general/types/component.types";

export const Container: FC<WithChildren> = ({ children }) => {
	return <div className="mx-auto container">{children}</div>;
};
