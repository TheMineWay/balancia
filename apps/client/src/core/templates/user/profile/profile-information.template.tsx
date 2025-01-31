import Avatar from "@core/components/ui/avatar/avatar";
import { useActiveAuth } from "@core/hooks/auth/use-active-auth";
import { useTranslation } from "@core/i18n/use-translation";
import { UserModel } from "@shared/models";
import { Card, Divider, Typography } from "antd";

const { Title, Text } = Typography;

export default function ProfileInformationTemplate() {
  const { t } = useTranslation("userProfile");
  const { user } = useActiveAuth();

  return (
    <div className="flex flex-col gap-1">
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

const Name = ({ user }: { user: UserModel }) => {
  return <div></div>;
};
