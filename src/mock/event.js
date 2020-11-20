import dayjs from "dayjs";

const DAY_COUNT = 30;
const HOUR_COUNT = 24;
const MINUTES_COUNT = 60;
const PRICE_COUNT = 1000;
const RADIX = 10;
const SENTENCE_COUNT = 5;
const PHOTO_COUNT = 5;
const SAMPLE_TEXT = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const EVENT_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
const CITIES = [`Amsterdam`, `Chamonix`, `Geneva`];
const ALL_OFFERS = [
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

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getShuffleArray = (target) => {
  const newArray = target.slice();

  for (let i = newArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const getTime = (date) => {
  const durationDay = getRandomInteger(0, DAY_COUNT);
  const durationHour = getRandomInteger(0, HOUR_COUNT);
  const durationMinutes = getRandomInteger(0, MINUTES_COUNT);
  const endDate = date.add(durationDay, `day`).add(durationHour, `hour`).add(durationMinutes, `minute`);
  const differenceDay = endDate.diff(date, `day`);
  const differenceHour = endDate.diff(date, `hour`) - differenceDay * HOUR_COUNT;
  const differenceMinutes = endDate.diff(date, `minute`) - (differenceDay * HOUR_COUNT + differenceHour) * MINUTES_COUNT;
  let duration;

  if (durationDay === 0) {
    if (durationHour === 0) {
      duration = `${differenceMinutes}M`;
    } else {
      duration = `${differenceHour}H ${differenceMinutes}M`;
    }
  } else {
    duration = `${differenceDay}D ${differenceHour}H ${differenceMinutes}M`;
  }

  return {
    startDate: date,
    endDate,
    duration
  };
};

const getPrice = () => {
  let price = getRandomInteger(0, PRICE_COUNT);

  return Math.round(price / RADIX) * RADIX;
};

const getEventOffers = (target) => {
  const newArray = getShuffleArray(target);
  const randomLength = getRandomInteger(0, newArray.length);

  return newArray.slice(0, randomLength);
};

const getEventDescription = (target) => {
  const newArray = getShuffleArray(target);

  return newArray.slice(0, SENTENCE_COUNT).join(`. `);
};

const getPhotosDestination = () => {
  const length = getRandomInteger(0, PHOTO_COUNT);
  const photos = [];

  for (let i = 0; i < length; i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

export const generateEvent = () => {
  const date = dayjs().add(getRandomInteger(0, DAY_COUNT), `day`);

  return {
    type: EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)],
    destination: CITIES[getRandomInteger(0, CITIES.length - 1)],
    times: getTime(date),
    price: getPrice(),
    offers: getEventOffers(ALL_OFFERS),
    information: {
      description: getEventDescription(sentences),
      photos: getPhotosDestination()
    },
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
