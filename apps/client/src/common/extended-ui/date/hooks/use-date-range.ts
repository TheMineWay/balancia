import { isAfter } from "date-fns";
import { useCallback, useEffect, useState } from "react";

export type DateRange = { from: Date | null; to: Date | null };

export type DateRangeDateTransformPipe = (date: Date | null) => Date | null;

export type DateRangeOptions = {
	initialRange?: DateRange;

	// Pipes
	toDateTransform?: DateRangeDateTransformPipe;
	fromDateTransform?: DateRangeDateTransformPipe;
};

export const useDateRange = ({
	initialRange,
	toDateTransform,
	fromDateTransform,
}: DateRangeOptions = {}) => {
	const [range, setRange] = useState<DateRange | null>(initialRange || null);

	const setRangeWrapper = useCallback(
		(newRange: DateRange | null) => {
			let newFrom = newRange?.from || null;
			let newTo = newRange?.to || null;

			if (fromDateTransform) newFrom = fromDateTransform(newFrom);
			if (toDateTransform) newTo = toDateTransform(newTo);

			setRange({ from: newFrom, to: newTo });
		},
		[fromDateTransform, toDateTransform],
	);

	useEffect(() => {
		if (range?.from && range?.to) {
			if (isAfter(range.from, range.to)) {
				setRange({ from: range.from, to: range.from });
			}
		}
	}, [range]);

	return { range, setRange: setRangeWrapper };
};

export type UseDateRange = ReturnType<typeof useDateRange>;
