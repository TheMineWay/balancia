import AuthWithPasswordTotpForm from "@core/components/auth/sign-in/with-password/auth-with-password-totp.form";
import ScopedAlertError from "@core/components/error/scoped/scoped-alert-error";
import { useLoginMutation } from "@core/hooks/api/user/auth/use-login.mutation";
import { useTranslation } from "@core/i18n/use-translation";
import type { AuthContextInfo } from "@core/providers/auth/auth.context";
import { FORM_STYLES } from "@core/styles/form.styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "antd";
import type { AxiosError } from "axios";
import { useState } from "react";
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

  const { mutate, isPending, error } = useLoginMutation();
  const [totpAuthData, setTotpAuthData] = useState<FormData | null>(null);

  const { handleSubmit, control, formState } = useForm<FormData>({
    resolver: zodResolver(SCHEMA),
    mode: "onChange",
  });

  const onError = (error: Error, data: FormData) => {
    if (
      (error as AxiosError<{ message: string }>).response?.data.message ===
      "TOTP"
    ) {
      // If it is TOTP required error
      setTotpAuthData(data);
    }
  };

  if (totpAuthData)
    return (
      <AuthWithPasswordTotpForm
        passwordCredentials={totpAuthData}
        onSuccess={onSuccess}
        onExit={() => setTotpAuthData(null)}
      />
    );

  return (
    <form
      className={FORM_STYLES.form}
      onSubmit={handleSubmit((data) =>
        mutate(data, {
          onSuccess,
          onError,
        })
      )}
    >
      <div className={FORM_STYLES.item}>
        <label htmlFor="username">
          {t().forms["login-with-password"].fields.username.Label}
        </label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <Input id="username" prefix={<FaUserCircle />} {...field} />
          )}
        />
      </div>
      <div className={FORM_STYLES.item}>
        <label htmlFor="password">
          {t().forms["login-with-password"].fields.password.Label}
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <Input.Password id="password" prefix={<MdPassword />} {...field} />
          )}
        />
      </div>

      <Button
        block
        type="primary"
        disabled={!formState.isValid}
        loading={isPending}
        htmlType="submit"
      >
        {t().forms["login-with-password"].Submit}
      </Button>

      <ScopedAlertError scope="auth" error={error} />
    </form>
  );
}
