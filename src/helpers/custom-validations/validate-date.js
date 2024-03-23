import { validateIsTime } from "../expression-regular";
import dayjs from "dayjs";

const isTimeValidate = (time) => {
    return validateIsTime(time);
}

const isDateValidate = (date) => {
    return dayjs(date).isValid();
}

export {
    isTimeValidate,
    isDateValidate
}

