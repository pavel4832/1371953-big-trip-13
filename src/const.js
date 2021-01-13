import {getTimes} from "./utils/event";
import dayjs from "dayjs";

export const BLANK_EVENT = {
  type: `taxi`,
  destination: {
    description: ``,
    name: ``,
    pictures: []
  },
  times: getTimes(dayjs(), dayjs()),
  price: 0,
  offers: [],
  isFavorite: false,
  isNew: true
};

export const MenuItem = {
  TABLE: `Table`,
  STATISTICS: `Stats`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const SortType = {
  DEFAULT: `sort-day`,
  TIME: `sort-time`,
  PRICE: `sort-price`
};

export const EventType = {
  "taxi": `Taxi`,
  "bus": `Bus`,
  "train": `Train`,
  "ship": `Ship`,
  "transport": `Transport`,
  "drive": `Drive`,
  "flight": `Flight`,
  "check-in": `Check-in`,
  "sightseeing": `Sightseeing`,
  "restaurant": `Restaurant`
};

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`
};
