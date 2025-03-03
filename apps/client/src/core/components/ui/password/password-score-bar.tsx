import { useTranslation } from "@core/i18n/use-translation";
import { evaluatePassword } from "@shared/utils";
import { Progress, Typography } from "antd";
import { useId, useMemo } from "react";

const { Text } = Typography;

type Props = {
  password?: string;
  showText?: boolean;
};

const PasswordScoreBar: FC<Props> = ({ password = "", showText = true }) => {
  const {
    evaluation: { score },
    passwordLevelKey,
  } = useMemo(() => {
    const evaluation = evaluatePassword(password);
    return {
      evaluation,
      passwordLevelKey: getPasswordLevel(evaluation.score),
    };
  }, [password]);

  const barTextId = useId();

  const { t } = useTranslation("common");

  return (
    <div className="flex flex-col">
      <Progress aria-labelledby={barTextId} showInfo={false} percent={score} />
      {showText && (
        <Text id={barTextId}>
          {t().ui.password.score.levels[passwordLevelKey].Text}
        </Text>
      )}
    </div>
  );
};

export default PasswordScoreBar;

/* Internal utils */

const PASSWORD_LEVEL_MAP = [
  [20, "very-low"],
  [40, "low"],
  [60, "medium"],
  [80, "strong"],
  [100, "very-strong"],
] as const satisfies Array<[number, string]>;

const getPasswordLevel = (level: number) =>
  PASSWORD_LEVEL_MAP.find(([l]) => level <= l)?.[1] ?? PASSWORD_LEVEL_MAP[0][1];
