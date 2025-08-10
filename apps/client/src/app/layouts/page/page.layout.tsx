import type { WithChildren } from "@common/extended-ui/general/types/component.types";

const Root: FC<WithChildren> = ({ children }) => {
	return <div className="flex flex-col">{children}</div>;
};

const Content: FC<WithChildren> = ({ children }) => {
	return <div>{children}</div>;
};

export const PageLayout = {
	Root,
	Content,
};
