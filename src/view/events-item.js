import {createOffersTemplate} from "./event-offers-list.js";
import {createElement} from "../utils.js";

const createEventsItemTemplate = (event) => {
  const {type, destination, times, price, offers, isFavorite} = event;
  const date = times.startDate.format(`MMM D`);
  const startTime = times.startDate.format();
  const endTime = times.endDate.format();

  const favoriteClassName = isFavorite
    ? `event__favorite-btn`
    : `event__favorite-btn event__favorite-btn--active`;

  const offersTemplate = createOffersTemplate(offers);

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="${times.startDate}">${date}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${destination}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time" datetime="${startTime}">${times.startDate.format(`HH:mm`)}</time>
                    &mdash;
                    <time class="event__end-time" datetime="${endTime}">${times.endDate.format(`HH:mm`)}</time>
                  </p>
                  <p class="event__duration">${times.duration}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">${price}</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                ${offersTemplate}
                <button class="${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

export default class Event {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createEventsItemTemplate(this._events);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
