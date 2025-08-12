import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { Container } from "@layouts/container/container";
import clsx from "clsx";
import styles from './navigation.layout.module.pcss';

const Root: FC<WithChildren> = ({ children }) => {
	return <nav className="flex flex-col gap-4">{children}</nav>;
};

const Content: FC<WithChildren> = ({ children }) => {
	return <Container>{children}</Container>;
};

const Navbar: FC<WithChildren> = ({ children }) => {
	return (
		<div className={clsx("p-2", styles.navbar)}>
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
