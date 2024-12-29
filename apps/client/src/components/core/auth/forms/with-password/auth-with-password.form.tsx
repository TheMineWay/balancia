import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@hooks/core/auth/use-login.mutation";
import { useTranslation } from "@i18n/use-translation";
import { AuthContextInfo } from "@providers/core/auth/auth.provider";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import { FaUserCircle } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
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

  const { handleSubmit, control } = useForm<FormData>({
    resolver: zodResolver(SCHEMA),
  });

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit((data) => {
        console.log("paco");
        mutate(data, { onSuccess });
      })}
    >
      <div className="flex flex-col gap-1">
        <label>{t().forms["login-with-password"].fields.username.Label}</label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => <Input prefix={<FaUserCircle />} {...field} />}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label>{t().forms["login-with-password"].fields.password.Label}</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password prefix={<MdPassword />} {...field} />
          )}
        />
      </div>

      <Button type="primary" disabled={isPending} htmlType="submit">
        {t().forms["login-with-password"].Submit}
      </Button>
    </form>
  );
}
