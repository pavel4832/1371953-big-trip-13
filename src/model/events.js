import Observer from "../utils/observer.js";
import {getTimes} from "../utils/event.js";
import dayjs from "dayjs";

export default class Events extends Observer {
  constructor() {
    super();
    this._events = [];
    this._destinationList = [];
    this._offerList = [];
  }

  setEvents(updateType, events) {
    this._events = events.slice();

    this._notify(updateType);
  }

  getEvents() {
    return this._events;
  }

  setDestination(updateType, destinations) {
    this._destinationList = destinations.slice();
  }

  getDestination() {
    return this._destinationList;
  }

  setOffers(updateType, offers) {
    this._offerList = offers.slice();
  }

  getOffers() {
    return this._offerList;
  }

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update non-existent event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete non-existent event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    const startDate = dayjs(new Date(event.date_from));
    const endDate = dayjs(new Date(event.date_to));

    const adaptedEvent = Object.assign(
        {},
        event,
        {
          times: getTimes(startDate, endDate),
          price: event.base_price,
          isFavorite: event.is_favorite,
          isNew: false
        }
    );

    delete adaptedEvent.date_from;
    delete adaptedEvent.date_to;
    delete adaptedEvent.base_price;
    delete adaptedEvent.is_favorite;

    return adaptedEvent;
  }

  static adaptToServer(event) {
    const times = event.times;

    const adaptedEvent = Object.assign(
        {},
        event,
        {
          "date_from": times.startDate instanceof Date ? times.startDate.toISOString() : null,
          "date_to": times.endDate instanceof Date ? times.endDate.toISOString() : null,
          "base_price": event.price,
          "is_favorite": event.isFavorite,
        }
    );

    delete adaptedEvent.times;
    delete adaptedEvent.price;
    delete adaptedEvent.isFavorite;
    delete adaptedEvent.isNew;

    return adaptedEvent;
  }
}
