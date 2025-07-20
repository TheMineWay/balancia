import { useTranslation } from "@i18n/use-translation";
import { notifications } from "@mantine/notifications";
import type { AxiosError } from "axios";
import { BiErrorAlt } from "react-icons/bi";

export const useRequestManagedErrorNotification = () => {
  const { t } = useTranslation("errors");

  const manage = (error: AxiosError) => {
    const status = error.response?.status;
    if (!status) return;

    const err =
      t().http?.[status.toString() as keyof ReturnType<typeof t>["http"]];

    if (!err) return;

    notifications.show({
      color: "red",
      icon: <BiErrorAlt />,
      message: err.Message,
      title: err.Title,
    });
  };

  return { manage };
};
