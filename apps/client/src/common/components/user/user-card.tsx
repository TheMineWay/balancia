import { Paper, Text } from "@mantine/core";
import type { UserModel } from "@shared/models";

type Props = {
  user: Pick<UserModel, "id" | "name" | "username">;
};

export const UserCard: FC<Props> = ({ user }) => {
  return (
    <Paper withBorder>
      <div className="flex flex-col gap-1">
        <Text>{user.name}</Text>
        <Text>{user.username}</Text>
      </div>
    </Paper>
  );
};
