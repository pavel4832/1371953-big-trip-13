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

export const isDataEqual = (dataA, dataB) => {
  return (!dataA && !dataB) ? true : dataA === dataB;
};

export const isDatesEqual = (dateA, dateB) => {
  const isStartDateSame = dayjs(dateA.startDate).isSame(dateB.startDate, `day`);
  const isEndDateSame = dayjs(dateA.endDate).isSame(dateB.endDate, `day`);

  return (!dateA && !dateB) ? true : isStartDateSame && isEndDateSame;
};

export const isEventFuture = (dueDate) => {
  return !dueDate ? false : dayjs().isBefore(dueDate, `day`);
};

export const isEventPast = (dueDate) => {
  return !dueDate ? false : dayjs().isAfter(dueDate, `day`);
};
