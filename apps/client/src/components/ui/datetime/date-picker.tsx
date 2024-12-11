import { DatePicker as AntdDatePicker } from "antd";
import type { DateTime } from "luxon";
import luxonGenerateConfig from "rc-picker/lib/generate/luxon";

const DatePicker = AntdDatePicker.generatePicker<DateTime>(luxonGenerateConfig);

export default DatePicker;
