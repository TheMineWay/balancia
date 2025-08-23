import type { UserModel } from "@shared/models";
import { getGravatarUrl } from "@shared/utils";

type Props = {
	user: UserModel;
};

/**
 * User avatar component that displays a user's profile picture.
 * Uses Gravatar service to generate avatar images based on user email.
 */
export const UserAvatar: FC<Props> = ({ user }) => {
	return (
		<img
			src={getGravatarUrl(user.email ?? "")}
			alt={user.name}
			className="w-10 h-10 rounded-full"
		/>
	);
};
