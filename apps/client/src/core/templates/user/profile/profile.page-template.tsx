import Avatar from "@core/components/ui/avatar/avatar";
import PageContainer from "@core/components/ui/container/page-container";
import { useActiveAuth } from "@core/hooks/auth/use-active-auth";
import { useTranslation } from "@core/i18n/use-translation";
import { useDeviceInfo } from "@core/providers/device/device-info.context";
import ProfileInformationTemplate from "@core/templates/user/profile/information/profile-information.template";
import { getUserName, interpolate } from "@shared/utils";
import { Tabs } from "antd";
import clsx from "clsx";
import { ReactNode } from "react";

type Tab = {
  label: string;
  children: ReactNode;
  key: string;
};

export default function ProfilePageTemplate() {
  const { t } = useTranslation("userProfile");
  const { isMobile } = useDeviceInfo();

  const PROFILE_TABS: Tab[] = [
    {
      key: "home",
      label: t()["my-profile"].tabs.home.Label,
      children: <ProfileHome />,
    },
    {
      key: "info",
      label: t()["my-profile"].tabs.info.Label,
      children: <ProfileInformationTemplate />,
    },
    {
      key: "security",
      label: t()["my-profile"].tabs.security.Label,
      children: <div>b</div>,
    },
  ].map(({ children, ...rest }) => ({
    ...rest,
    children: <PageContainer>{children}</PageContainer>,
  }));

  return (
    <div>
      {/* Tabs */}
      <Tabs
        className={clsx("w-full mt-4", { "px-4": isMobile })}
        tabPosition={isMobile ? "top" : "left"}
        items={PROFILE_TABS}
      />
    </div>
  );
}

const ProfileHome = () => {
  const { user } = useActiveAuth();
  const { t } = useTranslation("userProfile");

  return (
    <div className="flex flex-col items-center">
      <Avatar size="lg" user={user} />
      <p className="mt-1 text-2xl font-semibold">
        {interpolate(t()["my-home"].Title, { name: getUserName(user) })}
      </p>
    </div>
  );
};
