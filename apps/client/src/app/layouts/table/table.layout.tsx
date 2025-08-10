import type { WithChildren } from "@common/extended-ui/general/types/component.types";
import { ActionsLayout } from "@layouts/shared/actions/actions.layout";

/**
 * Parent component for a table layout
 */
const Root: FC<WithChildren> = ({ children }) => {
	return <div className="flex flex-col gap-4">{children}</div>;
};

/**
 * Table component for containing a table component
 */
const Table: FC<WithChildren> = ({ children }) => {
	return <div>{children}</div>;
};

/**
 * Actions component for containing action components
 */
const Actions = ActionsLayout.Container;

/**
 * Pagination component for containing pagination controls
 */
const Pagination: FC<WithChildren> = ({ children }) => {
	return <div className="flex justify-end items-center">{children}</div>;
};

export const TableLayout = {
	Root,
	Actions,
	Table,
	Pagination,
};
