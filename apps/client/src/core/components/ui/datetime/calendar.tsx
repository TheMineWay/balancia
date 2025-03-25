import { Calendar as AntdCalendar } from "antd";
import dateFnsGenerateConfig from "rc-picker/lib/generate/dateFns";

const Calendar = AntdCalendar.generateCalendar(dateFnsGenerateConfig);

export default Calendar;
