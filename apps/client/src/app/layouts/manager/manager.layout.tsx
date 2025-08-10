import type { WithChildren } from "@common/extended-ui/general/types/component.types";

const Root: FC<WithChildren> = ({ children }) => {
	return <div className="flex flex-col gap-8">{children}</div>;
};

const Title: FC<WithChildren> = ({ children }) => {
	return <h2 className="text-xl font-bold">{children}</h2>;
};

const Content: FC<WithChildren> = ({ children }) => {
	return <div>{children}</div>;
};

export const ManagerLayout = {
	Root,
	Title,
	Content,
};
