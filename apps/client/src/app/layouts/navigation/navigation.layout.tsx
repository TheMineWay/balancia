import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { Container } from "@layouts/container/container";
import clsx from "clsx";
import styles from "./navigation.layout.module.pcss";

const Root: FC<WithChildren> = ({ children }) => {
	return <nav className="flex flex-col h-full">{children}</nav>;
};

const Content: FC<WithChildren> = ({ children }) => {
	return (
		<main className="h-full overflow-y-scroll pt-4">
			<Container className="h-full">{children}</Container>
		</main>
	);
};

const Navbar: FC<WithChildren> = ({ children }) => {
	return (
		<nav className={clsx("p-2 shadow-lg", styles.navbar)}>
			<Container>
				<div className="flex flex-wrap justify-between items-center gap-4">
					{children}
				</div>
			</Container>
		</nav>
	);
};

export const NavigationLayout = {
	Root,
	Content,
	Navbar,
};
