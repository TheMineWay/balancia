import Avatar from "@core/components/ui/avatar/avatar";
import { useActiveAuth } from "@core/hooks/auth/use-active-auth";
import { useTranslation } from "@core/i18n/use-translation";
import { getUserName } from "@shared/utils";
import { Tabs } from "antd";
import { ReactNode, useState } from "react";

type Tab = {
  label: string;
  children: ReactNode;
  key: string;
};

export default function ProfileTemplate() {
  const { t } = useTranslation("userProfile");
  const PROFILE_TABS: Tab[] = [
    {
      key: "info",
      label: t()["my-profile"].tabs.info.Label,
      children: <div>a</div>,
    },
    {
      key: "info2",
      label: t()["my-profile"].tabs.info.Label,
      children: <div>b</div>,
    },
    {
      key: "info3",
      label: t()["my-profile"].tabs.info.Label,
      children: <div>c</div>,
    },
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);

  const { user } = useActiveAuth();

  return (
    <div className="flex flex-col items-center">
      <Avatar size="lg" user={user} />
      <p className="mt-1 text-2xl font-semibold">{getUserName(user)}</p>

      {/* Tabs */}
      <Tabs className="w-full mt-4" tabPosition="left" items={PROFILE_TABS} />
    </div>
  );
}
