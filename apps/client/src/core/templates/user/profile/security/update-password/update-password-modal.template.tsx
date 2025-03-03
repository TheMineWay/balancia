import { useTranslation } from "@core/i18n/use-translation";
import UpdatePasswordForm from "@core/templates/user/profile/security/update-password/update-password-form.template";
import { Modal } from "antd";

type Props = {
  onClose: () => void;
  open: boolean;
};

const UpdatePasswordModal: FC<Props> = ({ onClose, open }) => {
  const { t } = useTranslation("userProfile");

  return (
    <Modal
      title={t()["my-password"].update.Title}
      footer={null}
      open={open}
      onCancel={onClose}
    >
      <UpdatePasswordForm />
    </Modal>
  );
};

export default UpdatePasswordModal;
