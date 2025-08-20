import { UserAvatar } from "@core/auth/user/components/avatar/user-avatar";
import { Group, Paper, Text } from "@mantine/core";
import type { UserModel } from "@shared/models";

type Props = {
	user: UserModel;
	actions?: React.ReactNode[];
};

/**
 * User card component that displays user information in a bordered paper container.
 * Shows user avatar, name, username, and optional action buttons.
 */
export const UserCard: FC<Props> = ({ user, actions = [] }) => {
	return (
		<Paper withBorder>
			<div className="flex gap-4 items-center p-2 justify-between">
				<div className="flex gap-4 items-center">
					<UserAvatar user={user} />
					<div className="flex flex-col">
						<Text style={{ fontWeight: 500 }}>{user.name}</Text>
						<Text>{user.username}</Text>
					</div>
				</div>
				{actions.length > 0 && <Group>{actions}</Group>}
			</div>
		</Paper>
	);
};
