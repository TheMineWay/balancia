import { useTranslation } from "@core/i18n/use-translation";
import { Button, Input } from "antd";

const Enable2FaDeviceVerify: FC = () => {
  const { t } = useTranslation("userProfile");

  const step = t().configs["2fa"].setup.steps.verify;

  return (
    <div className="flex flex-col gap-4 items-center">
      <Input.OTP />
      <Button type="primary">{step.actions.Verify}</Button>
    </div>
  );
};

export default Enable2FaDeviceVerify;
