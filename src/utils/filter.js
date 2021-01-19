import {FilterType} from "../const.js";
import {isEventFuture, isEventPast} from "./event.js";

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => isEventFuture(event.times.startDate)),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPast(event.times.endDate))
};
