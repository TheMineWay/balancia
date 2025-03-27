import { useTotpEnableVerifyMutation } from "@core/hooks/api/user/auth/config/use-totp-enable-verify.mutation";
import { useTranslation } from "@core/i18n/use-translation";
import { CONFIG } from "@shared/constants";
import { Alert, Button, Input } from "antd";
import { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";

type Props = {
  onProceed: CallableFunction;
  onBack: CallableFunction;
};

const Enable2FaDeviceVerify: FC<Props> = ({ onBack, onProceed }) => {
  const { t } = useTranslation("userProfile");
  const { t: commonT } = useTranslation("common");

  const { mutate: verify, isPending, error } = useTotpEnableVerifyMutation();

  const step = t().configs["2fa"].setup.steps.verify;

  const [codeState, setCodeState] = useState("");
  const code = codeState.trim();

  const submit = () => {
    verify({ code }, { onSuccess: () => onProceed() });
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <p>{step.Description}</p>
      {error && <Error />}
      <Input.OTP
        value={code}
        onChange={setCodeState}
        onInput={(v) => setCodeState(v.join(""))}
        length={CONFIG.totp.digits}
      />
      <div className="flex gap-2 justify-center">
        <Button icon={<AiOutlineArrowLeft />} onClick={() => onBack()}>
          {commonT().actions.Back}
        </Button>
        <Button
          disabled={code.length !== CONFIG.totp.digits}
          loading={isPending}
          type="primary"
          onClick={submit}
        >
          {step.actions.Verify}
        </Button>
      </div>
    </div>
  );
};

export default Enable2FaDeviceVerify;

/* Internal */

const Error: FC = () => {
  const { t } = useTranslation("errors");

  return (
    <Alert
      showIcon
      type="error"
      message={t().generic["2fa-failed"].Title}
      description={t().generic["2fa-failed"].Message}
    />
  );
};
