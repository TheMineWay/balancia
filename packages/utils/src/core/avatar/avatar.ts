import { UserModel } from "@shared/models";
import { getGravatarUrl } from "./gravatar";

export const getUserAvatar = (user: UserModel) =>
  user.email ? getGravatarUrl(user.email) : null;
