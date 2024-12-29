import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@hooks/core/auth/use-login.mutation";
import { useTranslation } from "@i18n/use-translation";
import { AuthContextInfo } from "@providers/core/auth/auth.provider";
import { Button, Input } from "antd";
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
  const { t } = useTranslation("auth");
  const { mutate, isPending } = useLogin();

  const { register, handleSubmit } = useForm<FormData>({
    resolver: zodResolver(SCHEMA),
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit((data) => mutate(data, { onSuccess }))}
    >
      <Input {...register("username")} />
      <Input.Password {...register("password")} />
      <Button type="primary" disabled={isPending} htmlType="submit">
        {t().forms["login-with-password"].Submit}
      </Button>
    </form>
  );
}
