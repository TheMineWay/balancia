import type { Permission, RoleModel, UserModel } from "@shared/models";
import { createContext, useContext } from "react";

interface ContextInfo {
	user: UserModel;
	roles: RoleModel[];
	permissions: Permission[];
}

export const userInfoContext = createContext<ContextInfo>(null!);

export const useUserInfo = () => {
	const context = useContext(userInfoContext);

	if (!context) {
		throw new Error("useUserInfo must be used within a UserInfoProvider");
	}

	return context;
};
