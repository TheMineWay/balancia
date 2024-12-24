import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContextInfo } from "@providers/core/auth/auth.provider";
import { Input } from "antd";
import { useForm } from "react-hook-form";
import Zod, { string } from "zod";

type Props = {
  onSuccess: (info: AuthContextInfo) => void;
};

const SCHEMA = Zod.object({
  username: string().min(1),
  password: string().min(1),
}).required();

type FormData = Zod.infer<typeof SCHEMA>;

export default function AuthWithPasswordForm({ onSuccess }: Readonly<Props>) {
  const { register } = useForm<FormData>({
    resolver: zodResolver(SCHEMA),
  });

  return (
    <form className="flex flex-col gap-2">
      <Input {...register("username")} />
      <Input.Password {...register("password")} />
    </form>
  );
}
