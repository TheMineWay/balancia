import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@hooks/core/auth/use-login.mutation";
import { AuthContextInfo } from "@providers/core/auth/auth.provider";
import { Button, Input } from "antd";
import { Controller, useForm } from "react-hook-form";
import Zod, { string } from "zod";

const TOTP_DIGITS = 6;

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
  const { mutate, isPending, isError } = useLogin();

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
