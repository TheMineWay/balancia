import { useTranslation } from "@core/i18n/use-translation";
import { Typography } from "antd";

const { Text } = Typography;

const Enable2FaInfoStep: FC = () => {
  const { t } = useTranslation("userProfile");

  const step = t().configs["2fa"].setup.steps.info;

  return (
    <div className="flex flex-col gap-2">
      <Text>{step.Description}</Text>
    </div>
  );
};

export default Enable2FaInfoStep;
