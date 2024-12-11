import { Calendar as AntdCalendar } from "antd";
import { DateTime } from "luxon";
import luxonGenerateConfig from "rc-picker/es/generate/luxon";

const Calendar = AntdCalendar.generateCalendar<DateTime>(luxonGenerateConfig);

export default Calendar;
