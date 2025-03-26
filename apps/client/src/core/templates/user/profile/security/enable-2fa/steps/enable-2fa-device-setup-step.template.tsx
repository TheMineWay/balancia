import { useTotpEnableInfoQuery } from "@core/hooks/api/user/auth/config/use-totp-enable-info.query";
import { useTranslation } from "@core/i18n/use-translation";
import { Button, QRCode, Spin, Typography } from "antd";

const { Text } = Typography;

type Props = {
  onProceed: CallableFunction;
};

const Enable2FaDeviceSetupStep: FC<Props> = ({ onProceed }) => {
  const { data, isLoading } = useTotpEnableInfoQuery();
  const { t } = useTranslation("userProfile");

  const step = t().configs["2fa"].setup.steps.setup;

  if (data?.totpUri)
    return (
      <div className="flex flex-col gap-4 items-center">
        <Text>{step.Description}</Text>
        <QRCode value={data.totpUri} />
        <Button onClick={() => onProceed()} type="primary">
          {step.actions.Scanned}
        </Button>
      </div>
    );

  if (isLoading) return <Spin />;

  return <></>;
};

export default Enable2FaDeviceSetupStep;
