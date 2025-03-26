import { useTotpEnableInfoQuery } from "@core/hooks/api/user/auth/config/use-totp-enable-info.query";
import { useIntervalState } from "@core/hooks/utils/time/use-interval-state";
import { useTranslation } from "@core/i18n/use-translation";
import Enable2FaDeviceSetupStep from "@core/templates/user/profile/security/enable-2fa/steps/enable-2fa-device-setup-step.template";
import Enable2FaDeviceVerify from "@core/templates/user/profile/security/enable-2fa/steps/enable-2fa-device-verify.template";
import { CONFIG } from "@shared/constants";
import { Alert } from "antd";
import {
  addMinutes,
  formatDistance,
  formatDistanceToNow,
  isPast,
} from "date-fns";
import { now } from "lodash";

type Props = {
  step: number;
  onScanned: CallableFunction;
  onCancelScanned: CallableFunction;
  onEnable2Fa: CallableFunction;
};

const Enable2FaDeviceStepGroup: FC<Props> = ({
  step,
  onScanned,
  onCancelScanned,
  onEnable2Fa,
}) => {
  const { data: totpInfo } = useTotpEnableInfoQuery();
  const expiresAt = totpInfo
    ? addMinutes(totpInfo.createdAt, CONFIG.totp.totpIdleConfigTimeout)
    : null;

  const { interpolated } = useTranslation("userProfile");

  const { state: remainingTime } = useIntervalState<null | string>({
    fn: () => {
      if (!expiresAt) return null;

      // If timeout has expired:
      // - Return to scan screen
      if (isPast(expiresAt)) {
        onCancelScanned();
      }
      return formatDistance(expiresAt, now());
    },
    initialState: null,
  });
  return (
    <div className="flex flex-col gap-8">
      <Alert
        showIcon
        message={interpolated(
          (t) => t.configs["2fa"].setup["Timeout-warning"],
          {
            time:
              remainingTime ??
              formatDistanceToNow(
                addMinutes(now(), CONFIG.totp.totpIdleConfigTimeout)
              ),
          }
        )}
      />
      <div>
        {step === 1 && <Enable2FaDeviceSetupStep onProceed={onScanned} />}
        {step === 2 && (
          <Enable2FaDeviceVerify
            onBack={onCancelScanned}
            onProceed={onEnable2Fa}
          />
        )}
      </div>
    </div>
  );
};

export default Enable2FaDeviceStepGroup;
