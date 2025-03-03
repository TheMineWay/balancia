import PasswordScoreBar from "@core/components/ui/password/password-score-bar";
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
    password: z
      .string()
      .min(USER_MODEL_VALUES.password.minLength)
      .max(USER_MODEL_VALUES.password.maxLength),
    repeatPassword: z.string(),
  })
  .refine(({ password, repeatPassword }) => password === repeatPassword, {
    path: ["repeatPassword"],
  });

const UpdatePasswordForm: FC = () => {
  const { handleSubmit, control } = useForm({
    resolver: zodResolver(FORM_SCHEMA),
  });
  const passwordState = useWatch({ control, name: "password" });

  const { t } = useTranslation("userProfile");

  /* IDs */
  const passwordId = useId();
  const repeatPasswordId = useId();

  return (
    <form onSubmit={handleSubmit(() => {})} className={FORM_STYLES.form}>
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
