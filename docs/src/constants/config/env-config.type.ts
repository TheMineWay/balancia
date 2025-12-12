export type Section = {
	name: string;
	items: Record<string, Item>;
};

type FreeItem = {
	type: "free";
	default?: string;
};

type NumberItem = {
	type: "number";
	default?: number;
	min?: number;
	max?: number;
};

type EnumItem = {
	type: "enum";
	options: string[];
	default?: string;
};

type BooleanItem = {
	type: "boolean";
	default?: boolean;
};

type Item = {
	name: string;
	description: string;
	required?: boolean;
} & (FreeItem | EnumItem | BooleanItem | NumberItem);
