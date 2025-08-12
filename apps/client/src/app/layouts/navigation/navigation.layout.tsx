import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { Container } from "@layouts/container/container";

const Root: FC<WithChildren> = ({ children }) => {
	return <nav className="flex flex-col gap-4">{children}</nav>;
};

const Content: FC<WithChildren> = ({ children }) => {
	return <Container>{children}</Container>;
};

const Navbar: FC<WithChildren> = ({ children }) => {
	return (
		<div className="bg-white p-2">
			<Container>
				<div className="flex flex-wrap justify-between items-center gap-4">
					{children}
				</div>
			</Container>
		</div>
	);
};

export const NavigationLayout = {
	Root,
	Content,
	Navbar,
};
