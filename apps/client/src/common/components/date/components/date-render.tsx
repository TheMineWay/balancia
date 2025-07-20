import { format } from "date-fns";
import { useMemo } from "react";

type DateModes = "short" | "long";

type Props = {
  date: Date;
  mode?: DateModes;
};

const MODES: Record<DateModes, string> = {
  short: "dd-MM-yyyy",
  long: "EEEE, dd-MM-yyyy",
};

export const DateRender: FC<Props> = ({ date, mode = "short" }) => {
  const value = useMemo(() => format(date, MODES[mode]), [date, mode]);

  return <p>{value}</p>;
};
