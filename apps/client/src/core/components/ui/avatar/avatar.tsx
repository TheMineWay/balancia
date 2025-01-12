import defaultAvatar from "@core/assets/auth/default-avatar.jpg";
import { UserModel } from "@shared/models";
import { getUserAvatar } from "@shared/utils";
import clsx from "clsx";
import { ImgHTMLAttributes, useMemo } from "react";

export type AvatarProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  user: UserModel;
  size?: "sm" | "md" | "lg" | "xl" | null;
  rounded?: "full" | "none" | "corners";
};

export default function Avatar({
  user,
  className,
  size = "md",
  rounded = "full",
  ...imgProps
}: Readonly<AvatarProps>) {
  const avatarUrl = useMemo(() => getUserAvatar(user) ?? defaultAvatar, [user]);

  return (
    <img
      {...imgProps}
      alt="avatar"
      src={avatarUrl}
      className={clsx(className, {
        /* Size */
        ["w-12"]: size === "sm",
        ["w-24"]: size === "md",
        ["w-32"]: size === "lg",
        ["w-48"]: size === "xl",

        /* Round */
        [size === "xl" ? "rounded-3xl" : "rounded-xl"]: rounded === "corners",
        ["rounded-full"]: rounded === "full",
      })}
    />
  );
}
