import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { Container } from "@layouts/container/container";

const Root: FC<WithChildren> = ({ children }) => {
	return <nav className="flex flex-col gap-4">{children}</nav>;
};

const Content: FC<WithChildren> = ({ children }) => {
	return <Container>{children}</Container>;
};

const Navbar: FC<WithChildren> = ({ children }) => {
	return <div className="flex justify-between gap-4 mx-2 mt-2">{children}</div>;
};

export const NavigationLayout = {
	Root,
	Content,
	Navbar,
};
