import type { CSSProperties } from "react";

export type TableColumn<
	TData extends object,
	K extends keyof TData = keyof TData,
> = {
	label: string;
	accessorKey?: K;
	render?: (item: TData) => React.ReactNode;
	styles?: Styles;
	classNames?: ClassNames;
};

/* Internal types */
type Stylings<T extends CSSProperties | string> = {
	cell?: T;
	cellContent?: T;
};

type Styles = Stylings<CSSProperties>;
type ClassNames = Stylings<string>;
