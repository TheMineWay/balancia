import { OidcUser } from "@shared/models";
import { getGravatarUrl } from "./gravatar";

export const getUserAvatar = (user: OidcUser) =>
	user.profile.email ? getGravatarUrl(user.profile.email) : null;
