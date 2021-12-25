import { isNull } from "lodash-es";
import moment from "moment";

const numberOfTime = (time: string) => {
  
}

const numberOfDate = (date: string | Date) => {
  let offset = 0;
  if (!isNull(date)) {
    const hour = moment(date.toString()).hours();
    const min = moment(date.toString()).minutes();
    offset = hour * 60 + min;
  }
  return offset;
}

const timeOfNumber = (offset: number | string, type: number) => {
  if (Number(offset) !== NaN) {
    let date = moment().hours(~~(Number(offset) / 60)).minutes(Number(offset) % 60);
    return type === 12 ? date.format('hh:mm a') : date.format('HH:mm')
  }
  return 'Invalid Time';
}

const dateOfNumber = (offset: number | string) => {
  return moment().hours(~~(Number(offset) / 60)).minutes(Number(offset) % 60).format()
}

export {
  numberOfTime,
  numberOfDate,
  timeOfNumber,
  dateOfNumber
}