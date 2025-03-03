import { useTranslation } from "@core/i18n/use-translation";
import UpdatePasswordModal from "@core/templates/user/profile/security/update-password/update-password-modal.template";
import { Button, Card, Typography } from "antd";
import { useState } from "react";
import {
  AiOutlineClose,
  AiOutlineEye,
  AiOutlineMobile,
  AiOutlineReload,
} from "react-icons/ai";

const { Title, Text } = Typography;

const ProfileSecurity: FC = () => {
  const { t } = useTranslation("userProfile");
  const [isEditPasswordVisible, setEditPasswordVisibility] = useState(false);
  console.log({ isEditPasswordVisible });

  const is2FAEnabled = true;

  return (
    <>
      <div className="flex flex-col gap-2">
        <div className="text-center mb-6">
          <Title level={2}>{t()["my-security"].Title}</Title>
          <Text>{t()["my-security"].Description}</Text>
        </div>
        <div className="flex gap-2">
          <Card
            className="w-full"
            classNames={{ body: "flex flex-col md:flex-row gap-2" }}
          >
            <Button
              onClick={() => setEditPasswordVisibility(true)}
              icon={<AiOutlineReload />}
              type="primary"
            >
              {t()["my-security"]["main-actions"].password.Update}
            </Button>
            <TwoFaActions isEnabled={is2FAEnabled} />
          </Card>
        </div>
        <div className="grid lg:grid-cols-2 gap-2">
          <Card className="w-full"></Card>
        </div>
      </div>

      <UpdatePasswordModal
        open={isEditPasswordVisible}
        onClose={() => setEditPasswordVisibility(false)}
      />
    </>
  );
};

export default ProfileSecurity;

const TwoFaActions: FC<{ isEnabled: boolean }> = ({ isEnabled }) => {
  const { t } = useTranslation("userProfile");

  if (isEnabled)
    return (
      <>
        <Button icon={<AiOutlineEye />}>
          {t()["my-security"]["main-actions"]["2fa"]["See-codes"]}
        </Button>
        <Button danger icon={<AiOutlineClose />} type="primary">
          {t()["my-security"]["main-actions"]["2fa"].Disable}
        </Button>
      </>
    );

  return (
    <Button icon={<AiOutlineMobile />}>
      {t()["my-security"]["main-actions"]["2fa"].Enable}
    </Button>
  );
};
