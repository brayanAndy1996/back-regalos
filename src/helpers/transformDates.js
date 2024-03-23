
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc";
import { dateDefaultToSaveHour } from "./constants"

dayjs.extend(utc);

const assingADateToTime = (hour) => {
    if(!hour) return
    const [ hora, minutos ] = hour.split(':')
    return dayjs(`${dateDefaultToSaveHour}T${hora}:${minutos}`).format('YYYY-MM-DDTHH:mm') + 'Z'
}

const convertToDateTimeLocal = (date) => {
    if(!date) return date
    return dayjs(date).utc().local().format('YYYY-MM-DD HH:mm:ss')
}

const convertToDateTimeInternational = (date) => {
    if(!date) return date
    return dayjs(date).toISOString()
}

export {
    assingADateToTime,
    convertToDateTimeLocal,
    convertToDateTimeInternational
}