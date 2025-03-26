import { useLoginMutation } from "@core/hooks/api/user/auth/use-login.mutation";
import type { AuthContextInfo } from "@core/providers/auth/auth.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { CONFIG } from "@shared/constants";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import Zod, { string } from "zod";

const TOTP_DIGITS = CONFIG.totp.digits;

type Props = {
  passwordCredentials: { username: string; password: string };
  onSuccess: (info: AuthContextInfo) => void;
  onExit: () => void;
};

const SCHEMA = Zod.object({
  totp: string().length(TOTP_DIGITS).regex(/^\d+$/),
});

type FormData = Zod.infer<typeof SCHEMA>;

export default function AuthWithPasswordTotpForm({
  passwordCredentials,
  onSuccess,
}: Readonly<Props>) {
  const { mutate, isPending, isError } = useLoginMutation();

  const { handleSubmit, control, formState, setValue, setFocus } =
    useForm<FormData>({
      resolver: zodResolver(SCHEMA),
      mode: "onChange",
    });

  const onError = () => {
    setValue("totp", "");
    setFocus("totp");
  };

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={handleSubmit((data) =>
        mutate({ ...passwordCredentials, ...data }, { onSuccess, onError })
      )}
    >
      <Controller
        name="totp"
        control={control}
        render={({ field }) => (
          <Input.OTP
            status={isError ? "error" : undefined}
            autoFocus
            {...field}
            onChange={(value) => {
              field.onChange(value);
            }}
            variant="filled"
            length={TOTP_DIGITS}
          />
        )}
      />
      <Button
        disabled={!formState.isValid}
        type="primary"
        block
        loading={isPending}
        htmlType="submit"
      >
        Submit
      </Button>
    </form>
  );
}
