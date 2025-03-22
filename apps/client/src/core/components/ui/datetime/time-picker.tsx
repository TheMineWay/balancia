import type { PickerProps } from "antd/es/date-picker/generatePicker";
import type { DateTime } from "luxon";
import type { PickerRef } from "rc-picker";
import * as React from "react";
import DatePicker from "./date-picker";

export type TimePickerProps = Omit<PickerProps<DateTime>, "picker">;

const TimePicker = React.forwardRef<PickerRef, TimePickerProps>(
  (props, ref) => (
    <DatePicker {...props} picker="time" mode={undefined} ref={ref} />
  )
);

TimePicker.displayName = "TimePicker";

export default TimePicker;
