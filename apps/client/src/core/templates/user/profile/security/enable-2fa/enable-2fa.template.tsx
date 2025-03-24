import { useMyUserProfileInfoQuery } from "@core/hooks/api/user/my-profile/use-my-user-profile-info.query";
import { useTranslation } from "@core/i18n/use-translation";
import Enable2FaDeviceSetupStep from "@core/templates/user/profile/security/enable-2fa/steps/enable-2fa-device-setup-step.template";
import Enable2FaDeviceVerify from "@core/templates/user/profile/security/enable-2fa/steps/enable-2fa-device-verify.template";
import Enable2FaInfoStep from "@core/templates/user/profile/security/enable-2fa/steps/enable-2fa-info-step.template";
import { useNavigate } from "@tanstack/react-router";
import { Divider, Steps, type StepsProps } from "antd";
import { useEffect, useMemo, useState } from "react";
import {
  AiOutlineInfo,
  AiOutlineMobile,
  AiOutlineVerified,
} from "react-icons/ai";

const Enable2Fa: FC = () => {
  const { data: userInfoData } = useMyUserProfileInfoQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfoData?.configs.totpEnabled) navigate({ to: "/me/profile" });
  }, [userInfoData, navigate]);

  const { t } = useTranslation("userProfile");
  const steps = t().configs["2fa"].setup.steps;

  const STEPS = useMemo<StepsProps["items"]>(
    () => [
      {
        title: steps.info.Title,
        icon: <AiOutlineInfo />,
      },
      {
        title: steps.setup.Title,
        icon: <AiOutlineMobile />,
      },
      {
        title: steps.verify.Title,
        icon: <AiOutlineVerified />,
      },
    ],
    [steps]
  );

  /* STATES */
  const [readInfo, setReadInfo] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  const step = useMemo(
    () => calculateStep({ readInfo, hasScanned }),
    [readInfo, hasScanned]
  );

  return (
    <div className="flex flex-col gap-4">
      <h2 className="font-bold text-2xl text-center">
        {t().configs["2fa"].setup.Title}
      </h2>
      <Steps current={step} items={STEPS} />
      <Divider />
      <div className="flex flex-col gap-2 items-center">
        {/* Steps */}
        {step === 0 && (
          <Enable2FaInfoStep onProceed={() => setReadInfo(true)} />
        )}
        {step === 1 && (
          <Enable2FaDeviceSetupStep onProceed={() => setHasScanned(true)} />
        )}
        {step === 2 && (
          <Enable2FaDeviceVerify onBack={() => setHasScanned(false)} />
        )}
      </div>
    </div>
  );
};

export default Enable2Fa;

/* Internal utils */

const calculateStep = (options: { readInfo: boolean; hasScanned: boolean }) => {
  if (!options.readInfo) return 0;
  if (!options.hasScanned) return 1;
  if (options.hasScanned) return 2;
  return 0;
};
