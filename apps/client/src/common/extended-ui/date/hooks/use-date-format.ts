import { format } from "date-fns";

export type DateModes = "short" | "long";

const DATETIME_MODES: Record<DateModes, string> = {
	short: "dd-MM-yyyy HH:mm:ss",
	long: "EEEE, dd-MM-yyyy HH:mm:ss",
};

const DATE_MODES: Record<DateModes, string> = {
	short: "dd-MM-yyyy",
	long: "EEEE, dd-MM-yyyy",
};

export const useDateFormat = () => {
	return {
		formatDateTime: (date: Date, mode: DateModes = "short") =>
			format(date, DATETIME_MODES[mode]),
		formatDate: (date: Date, mode: DateModes = "short") =>
			format(date, DATE_MODES[mode]),
	};
};
