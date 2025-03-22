import Avatar from "@core/components/ui/avatar/avatar";
import { useActiveAuth } from "@core/hooks/auth/use-active-auth";
import { useTranslation } from "@core/i18n/use-translation";
import ProfileInformationEditName from "@core/templates/user/profile/information/profile-information-edit-name.template";
import type { UserModel } from "@shared/models";
import { Card, Divider, Typography } from "antd";

const { Title, Text } = Typography;

export default function ProfileInformation() {
  const { t } = useTranslation("userProfile");
  const { user } = useActiveAuth();

  return (
    <div className="flex flex-col gap-4">
      <div className="text-center mb-6">
        <Title level={2}>{t()["my-info"].Title}</Title>
        <Text>{t()["my-info"].Description}</Text>
      </div>

      <Card>
        <Title level={3}>{t()["my-info"].sections.basic.Title}</Title>
        <Text>{t()["my-info"].sections.basic.Description}</Text>

        <Divider />
        <ProfilePicture user={user} />
        <Divider />
      </Card>
      <Card>
        <ProfileInformationEditName user={user} />
      </Card>
    </div>
  );
}

const ProfilePicture = ({ user }: { user: UserModel }) => {
  const { t } = useTranslation("userProfile");

  return (
    <div className="flex gap-2 justify-between items-center">
      <Text className="font-bold">
        {t()["my-info"].sections.basic.infos.picture.Label}
      </Text>
      <Text>
        {t()["my-info"].sections.basic.infos.picture.Description}{" "}
        <a href="https://gravatar.com" target="_blank">
          {t()["my-info"].sections.basic.infos.picture.UpdateLink}
        </a>
      </Text>
      <Avatar size="sm" user={user} />
    </div>
  );
};
