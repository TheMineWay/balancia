import { useTotpEnableInfoQuery } from "@core/hooks/api/user/auth/use-totp-enable-info.query";
import { useTranslation } from "@core/i18n/use-translation";
import { Button, Input } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";

type Props = {
  onBack: CallableFunction;
};

const Enable2FaDeviceVerify: FC<Props> = ({ onBack }) => {
  const { data: totpInfo } = useTotpEnableInfoQuery();

  const { t } = useTranslation("userProfile");
  const { t: commonT } = useTranslation("common");

  const step = t().configs["2fa"].setup.steps.verify;

  return (
    <div className="flex flex-col gap-4 items-center">
      <Input.OTP />
      <div className="flex gap-2 justify-center">
        <Button icon={<AiOutlineArrowLeft />} onClick={() => onBack()}>
          {commonT().actions.Back}
        </Button>
        <Button type="primary">{step.actions.Verify}</Button>
      </div>
    </div>
  );
};

export default Enable2FaDeviceVerify;
