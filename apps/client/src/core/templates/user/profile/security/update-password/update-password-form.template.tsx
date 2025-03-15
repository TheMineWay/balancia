import PasswordScoreBar from "@core/components/ui/password/password-score-bar";
import { useUpdateMyPasswordMutation } from "@core/hooks/api/user/my-profile/use-update-my-password.mutation";
import { useTranslation } from "@core/i18n/use-translation";
import { FORM_STYLES } from "@core/styles/form.styles";
import { zodResolver } from "@hookform/resolvers/zod";
import { USER_MODEL_VALUES } from "@shared/models";
import { Button, Input } from "antd";
import { useId } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { AiOutlineSave } from "react-icons/ai";
import { z } from "zod";

const FORM_SCHEMA = z
  .object({
    currentPassword: z
      .string()
      .min(USER_MODEL_VALUES.password.minLength)
      .max(USER_MODEL_VALUES.password.maxLength),
    password: z
      .string()
      .min(USER_MODEL_VALUES.password.minLength)
      .max(USER_MODEL_VALUES.password.maxLength),
    repeatPassword: z.string(),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    path: ["repeatPassword"],
  });

type FormData = z.infer<typeof FORM_SCHEMA>;

const UpdatePasswordForm: FC = () => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(FORM_SCHEMA),
  });
  const passwordState = useWatch({ control, name: "password" });
  const { mutateAsync: mutateUpdatePassword } = useUpdateMyPasswordMutation();

  const { t } = useTranslation("userProfile");

  /* IDs */
  const currentPasswordId = useId();
  const passwordId = useId();
  const repeatPasswordId = useId();

  /* Update logic */
  const updatePassword = async ({ currentPassword, password }: FormData) => {
    return await mutateUpdatePassword({ currentPassword, password });
  };

  return (
    <form onSubmit={handleSubmit(updatePassword)} className={FORM_STYLES.form}>
      {/* Current password field */}
      <div className={FORM_STYLES.item}>
        <label htmlFor={currentPasswordId}>
          {t()["my-password"].update.form.fields["Current-password"]}
        </label>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input id={currentPasswordId} onChange={onChange} value={value} />
          )}
        />
      </div>

      {/* Password field */}
      <div className={FORM_STYLES.item}>
        <label htmlFor={passwordId}>
          {t()["my-password"].update.form.fields["New-password"]}
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input id={passwordId} onChange={onChange} value={value} />
          )}
        />
        <PasswordScoreBar password={passwordState} />
      </div>

      {/* Repeat password field */}
      <div className={FORM_STYLES.item}>
        <label htmlFor={repeatPasswordId}>
          {t()["my-password"].update.form.fields.Repeat}
        </label>
        <Controller
          name="repeatPassword"
          control={control}
          render={({ field: { value, onChange } }) => (
            <Input id={repeatPasswordId} onChange={onChange} value={value} />
          )}
        />
      </div>
      <Button htmlType="submit" icon={<AiOutlineSave />} type="primary">
        {t()["my-password"].update.form.Submit}
      </Button>
    </form>
  );
};

export default UpdatePasswordForm;
