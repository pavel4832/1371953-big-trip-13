import dayjs from "dayjs";

export const sortEventDay = (eventA, eventB) => {
  return eventA.times.startDate - eventB.times.startDate;
};

export const sortEventTime = (eventA, eventB) => {
  const durationA = eventA.times.endDate - eventA.times.startDate;
  const durationB = eventB.times.endDate - eventB.times.startDate;

  return durationB - durationA;
};

export const sortEventPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA.startDate).isSame(dateB.startDate, `day`) && dayjs(dateA.endDate).isSame(dateB.endDate, `day`);
};
