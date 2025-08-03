import { useTranslation } from "@i18n/use-translation";
import { Alert } from "@mantine/core";
import { FiAlertTriangle } from "react-icons/fi";

export const UnknownErrorAlert: FC = () => {
  const { t } = useTranslation("errors");
  return (
    <Alert icon={<FiAlertTriangle />} color="red" title={t().unknown.Title}>
      {t().unknown.Message}
    </Alert>
  );
};
