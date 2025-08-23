import { getGravatarUrl } from "@/core/avatar/gravatar";
import type { UserModel, UserPublicInfoModel } from "@shared/models";

export const getUserPublicInfo = (
	user: Pick<UserModel, "id" | "name" | "email">,
): UserPublicInfoModel => {
	return {
		id: user.id,
		name: user.name,
		avatarUrl: user.email ? getGravatarUrl(user.email) : null,
	};
};
