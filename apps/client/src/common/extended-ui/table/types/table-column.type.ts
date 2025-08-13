import type { Stylings } from "@common/extended-ui/general/types/stylings.type";

export type TableColumn<
	TData extends object,
	K extends keyof TData = keyof TData,
> = {
	label: string;
	accessorKey?: K;
	render?: (item: TData) => React.ReactNode;
} & Stylings<"cell" | "cellContent">;
