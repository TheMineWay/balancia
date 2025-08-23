import type { WithChildren } from "@common/extended-ui/general/types/component.types";

/**
 * Root container component for manager page layouts.
 * Provides consistent vertical spacing between sections.
 */
const Root: FC<WithChildren> = ({ children }) => {
	return <div className="flex flex-col gap-6">{children}</div>;
};

/**
 * Title component for manager pages.
 * Renders a large, bold heading for the page.
 */
const Title: FC<WithChildren> = ({ children }) => {
	return <h2 className="text-xl font-bold">{children}</h2>;
};

/**
 * Content wrapper component for manager page content.
 * Provides a neutral container for page body content.
 */
const Content: FC<WithChildren> = ({ children }) => {
	return <div>{children}</div>;
};

export const ManagerLayout = {
	Root,
	Title,
	Content,
};
