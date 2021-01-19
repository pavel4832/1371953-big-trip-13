import dayjs from "dayjs";

const HOUR_COUNT = 24;
const MINUTES_COUNT = 60;

export const getTimes = (startDate, endDate) => {
  const differenceDay = endDate.diff(startDate, `day`);
  const differenceHour = endDate.diff(startDate, `hour`) - differenceDay * HOUR_COUNT;
  const differenceMinutes = endDate.diff(startDate, `minute`) - (differenceDay * HOUR_COUNT + differenceHour) * MINUTES_COUNT;

  let duration;

  if (differenceDay === 0) {
    duration = (differenceHour === 0) ? `${differenceMinutes}M` : `${differenceHour}H ${differenceMinutes}M`;
  } else {
    duration = `${differenceDay}D ${differenceHour}H ${differenceMinutes}M`;
  }

  return {
    startDate,
    endDate,
    duration
  };
};

export const getOffersByType = (allOffers, type) => {
  const currentOfferElement = allOffers.find((offer) => offer.type === type);

  return currentOfferElement.offers;
};

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
