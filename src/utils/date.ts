import moment from "moment";

const getCurrentYear = () => moment().year();
const getCurrentMonth = () => moment().month() + 1;
export { getCurrentYear, getCurrentMonth };
