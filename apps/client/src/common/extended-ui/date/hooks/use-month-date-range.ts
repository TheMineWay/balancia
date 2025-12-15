import {
	type DateRangeDateTransformPipe,
	type DateRangeOptions,
	useDateRange,
} from "@common/extended-ui/date/hooks/use-date-range";
import { endOfMonth, startOfMonth } from "date-fns";
import { useMemo } from "react";

type Options = DateRangeOptions;

export const useMonthDateRange = ({
	toDateTransform,
	fromDateTransform,
	...options
}: Options = {}) => {
	const pipes = useMemo(() => {
		return {
			toDate: pipeProcess([
				toDateTransform,
				(date: Date | null) => (date ? endOfMonth(date) : null),
			]),
			fromDate: pipeProcess([
				fromDateTransform,
				(date: Date | null) => (date ? startOfMonth(date) : null),
			]),
		};
	}, [fromDateTransform, toDateTransform]);

	return useDateRange({
		...options,
		fromDateTransform: pipes.fromDate,
		toDateTransform: pipes.toDate,
	});
};

const pipeProcess = (
	pipe: (DateRangeDateTransformPipe | undefined)[],
): DateRangeDateTransformPipe => {
	return (date) => {
		let processedDate = date;
		for (const fn of pipe) {
			processedDate = fn ? fn(processedDate) : processedDate;
		}
		return processedDate;
	};
};
