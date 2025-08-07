import type { Permission } from "@shared/models";

export type PermissionCondition = Simple | Composite;

type Simple = {
	type: "simple";
	permissions: Permission[];
};

type Composite = {
	type: "composite";
	or: Permission[][];
};
