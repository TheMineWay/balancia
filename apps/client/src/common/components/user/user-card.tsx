import { Avatar, Group, Paper, Text } from "@mantine/core";
import type { UserModel } from "@shared/models";
import { getGravatarUrl } from "@shared/utils";
import { useMemo } from "react";

type Props = {
	user: Pick<UserModel, "id" | "name" | "username" | "email">;
	actions?: React.ReactNode[];
};

export const UserCard: FC<Props> = ({ user, actions = [] }) => {
	const avatarUrl = useMemo(() => {
		if (!user.email) {
			return null;
		}
		return getGravatarUrl(user.email);
	}, [user.email]);

	return (
		<Paper withBorder>
			<div className="flex gap-4 items-center p-2 justify-between">
				<div className="flex gap-4 items-center">
					<Avatar src={avatarUrl} />
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
