export const featureHierarchyDefinition = [
	{
		type: "folder",
		name: "lib",
	},
	{
		type: "folder",
		name: "components",
	},
	{
		type: "folder",
		name: "types",
	},
	{
		type: "folder",
		name: "models",
	},
] as const satisfies Definition[];

type Definition = {
	type: "folder" | "file";
	name: string;
};
