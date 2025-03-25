import Enable2FaDeviceSetupStep from "@core/templates/user/profile/security/enable-2fa/steps/enable-2fa-device-setup-step.template";
import Enable2FaDeviceVerify from "@core/templates/user/profile/security/enable-2fa/steps/enable-2fa-device-verify.template";

type Props = {
  step: number;
  onScanned: CallableFunction;
  onCancelScanned: CallableFunction;
};

const Enable2FaDeviceStepGroup: FC<Props> = ({
  step,
  onScanned,
  onCancelScanned,
}) => {
  return (
    <>
      {step === 1 && <Enable2FaDeviceSetupStep onProceed={onScanned} />}
      {step === 2 && <Enable2FaDeviceVerify onBack={onCancelScanned} />}
    </>
  );
};

export default Enable2FaDeviceStepGroup;
