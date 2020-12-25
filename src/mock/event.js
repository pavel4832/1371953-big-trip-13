import dayjs from "dayjs";
import {getRandomInteger} from "../utils/common.js";

const DAY_COUNT = 30;
const DAY_BEFORE = 15;
const HOUR_COUNT = 24;
const MINUTES_COUNT = 60;
const PRICE_COUNT = 1000;
const RADIX = 10;
const SENTENCE_COUNT = 5;
const PHOTO_COUNT = 5;
const SAMPLE_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`];

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

const sentences = SAMPLE_TEXT.split(`. `);

const generateId = () => Date.now() + parseInt(Math.random() * 10000, RADIX);

const getShuffleArray = (target) => {
  const newArray = target.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }

  return newArray;
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

const getPrice = () => {
  let price = getRandomInteger(0, PRICE_COUNT);

  return Math.round(price / RADIX) * RADIX;
};

export const getEventOffers = (target) => {
  const newArray = getShuffleArray(target);
  const randomLength = getRandomInteger(0, newArray.length);

  return newArray.slice(0, randomLength);
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

export const getNewInformation = () => {
  return {
    description: getEventDescription(sentences),
    photos: getPhotosDestination()
  };
};

export const generateEvent = () => {
  const startDate = dayjs().add((getRandomInteger(0, DAY_COUNT) - DAY_BEFORE), `day`);
  const durationDay = getRandomInteger(0, DAY_COUNT);
  const durationHour = getRandomInteger(0, HOUR_COUNT);
  const durationMinutes = getRandomInteger(0, MINUTES_COUNT);
  const endDate = startDate.add(durationDay, `day`).add(durationHour, `hour`).add(durationMinutes, `minute`);

  return {
    id: generateId(),
    type: EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)],
    destination: CITIES[getRandomInteger(0, CITIES.length - 1)],
    times: getTimes(startDate, endDate),
    price: getPrice(),
    offers: getEventOffers(ALL_OFFERS),
    information: {
      description: getEventDescription(sentences),
      photos: getPhotosDestination()
    },
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
