import { DatePicker as AntdDatePicker } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

const DatePicker = AntdDatePicker.generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
