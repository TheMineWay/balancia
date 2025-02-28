import { useTranslation } from "@core/i18n/use-translation";
import { Button, Modal } from "antd";

type Props = {
  onClose: () => void;
  open: boolean;
};

const ProfileSecurityEditPasswordModal: FC<Props> = ({ onClose, open }) => {
  const { t } = useTranslation("userProfile");

  return (
    <Modal open={open} onClose={onClose}>
      <Button onClick={() => onClose()}></Button>
    </Modal>
  );
};

export default ProfileSecurityEditPasswordModal;
