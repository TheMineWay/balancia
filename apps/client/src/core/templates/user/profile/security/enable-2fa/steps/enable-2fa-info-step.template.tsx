import { useTranslation } from "@core/i18n/use-translation";
import { Button, Typography } from "antd";

const { Text } = Typography;

type Props = {
  onProceed: CallableFunction;
};

const Enable2FaInfoStep: FC<Props> = ({ onProceed }) => {
  const { t } = useTranslation("userProfile");

  const step = t().configs["2fa"].setup.steps.info;

  return (
    <div className="flex flex-col gap-2">
      <Text>{step.Description}</Text>
      <Button onClick={() => onProceed()} type="primary">
        {step.actions.Start}
      </Button>
    </div>
  );
};

export default Enable2FaInfoStep;
