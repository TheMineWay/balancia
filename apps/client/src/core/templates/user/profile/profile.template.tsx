import Avatar from "@core/components/ui/avatar/avatar";
import { useActiveAuth } from "@core/hooks/auth/use-active-auth";
import { getUserName } from "@shared/utils";

export default function ProfileTemplate() {
  const { user } = useActiveAuth();

  return (
    <div className="flex flex-col items-center">
      <Avatar size="lg" user={user} />
      <p className="mt-1 text-2xl font-semibold">{getUserName(user)}</p>
      <p></p>
    </div>
  );
}
