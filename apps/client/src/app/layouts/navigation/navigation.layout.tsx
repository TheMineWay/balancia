import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { Container } from "@layouts/container/container";

const Root: FC<WithChildren> = ({ children }) => {
	return <nav className="flex flex-col gap-6">{children}</nav>;
};

const Content: FC<WithChildren> = ({ children }) => {
	return <Container>{children}</Container>;
};

const Navbar: FC<WithChildren> = ({ children }) => {
	return (
		<Container>
			<div className="flex flex-wrap justify-between items-center gap-4 mt-2">
				{children}
			</div>
		</Container>
	);
};

export const NavigationLayout = {
	Root,
	Content,
	Navbar,
};
