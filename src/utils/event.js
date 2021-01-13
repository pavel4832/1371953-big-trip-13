import dayjs from "dayjs";
import {getRandomInteger} from "./common";

const HOUR_COUNT = 24;
const MINUTES_COUNT = 60;
const SENTENCE_COUNT = 5;
const PHOTO_COUNT = 5;
const SAMPLE_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const CITIES = [`aaa`, `aaa`, `sdfsdf`];

const sentences = SAMPLE_TEXT.split(`. `);

const getShuffleArray = (target) => {
  const newArray = target.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
};

const getEventDescription = (target) => {
  const newArray = getShuffleArray(target);

  return newArray.slice(0, SENTENCE_COUNT).join(`. `);
};

const getPhotosDestination = () => {
  const photosCount = getRandomInteger(0, PHOTO_COUNT);
  const photos = [];

  for (let i = 0; i < photosCount; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }

  return photos;
};

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

export const getEventOffers = (target) => {
  const newArray = getShuffleArray(target);
  const randomLength = getRandomInteger(0, newArray.length);

  return newArray.slice(0, randomLength);
};

export const getNewInformation = () => {
  return {
    description: getEventDescription(sentences),
    photos: getPhotosDestination()
  };
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

export const ALL_OFFERS = [
  {
    type: `event-offer-luggage`,
    name: `Add luggage`,
    price: 30
  },
  {
    type: `event-offer-comfort`,
    name: `Switch to comfort class`,
    price: 100
  },
  {
    type: `event-offer-meal`,
    name: `Add meal`,
    price: 15
  },
  {
    type: `event-offer-seats`,
    name: `Choose seats`,
    price: 5
  },
  {
    type: `event-offer-train`,
    name: `Travel by train`,
    price: 40
  }
];
