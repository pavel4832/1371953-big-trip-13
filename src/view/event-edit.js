import SmartView from "./smart.js";
import {createEventTypeIconTemplate} from "./event-icon-template.js";
import {createEventTypeTemplate} from "./event-type-template.js";
import {createEventDestinationTemplate} from "./event-destination-template.js";
import {createEventEditOffersTemplate} from "./event-offers-template.js";
import {createEventEditDescriptionTemplate} from "./event-description-template.js";
import {getEventOffers, getNewInformation, ALL_OFFERS} from "../mock/event.js";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createEventEditTemplate = (data) => {
  const {type, destination, times, price, offers, information, isOffers, isInformation, isPhotos} = data;
  const startTime = times.startDate.format(`DD/MM/YY HH:mm`);
  const endTime = times.endDate.format(`DD/MM/YY HH:mm`);

  const typeIconTemplate = createEventTypeIconTemplate(type);
  const typeTemplate = createEventTypeTemplate(type);
  const destinationTemplate = createEventDestinationTemplate(destination);
  const offerTemplate = createEventEditOffersTemplate(offers, isOffers);
  const descriptionTemplate = createEventEditDescriptionTemplate(information, isInformation, isPhotos);

  return `<li class="trip-events__item">
            <form class="event event--edit" action="#" method="post">
              <header class="event__header">
                <div class="event__type-wrapper">
                  ${typeIconTemplate}
                </div>
                <div class="event__field-group  event__field-group--destination">
                  ${typeTemplate}
                  ${destinationTemplate}
                </div>

                <div class="event__field-group  event__field-group--time">
                  <label class="visually-hidden" for="event-start-time-1">From</label>
                  <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${startTime}">
                  &mdash;
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${endTime}">
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                <button class="event__reset-btn" type="reset">Delete</button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </header>
              <section class="event__details">
                ${offerTemplate}
                ${descriptionTemplate}
              </section>
            </form>
          </li>`;
};

export default class EventEdit extends SmartView {
  constructor(event) {
    super();
    this._data = EventEdit.parseEventToData(event);

    this._clickHandler = this._clickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);

    this._setInnerHandlers();
  }

  reset(event) {
    this.updateData(
        EventEdit.parseEventToData(event)
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupClickHandler(this._callback.click);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._eventTypeToggleHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationToggleHandler);
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: getEventOffers(ALL_OFFERS),
      isOffers: this._data.offers.length !== 0
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: evt.target.value,
      information: getNewInformation(),
      isInformation: this._data.information !== {},
      isPhotos: this._data.information.photos.length !== 0
    });
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(EventEdit.parseDataToEvent(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`form`).addEventListener(`submit`, this._formSubmitHandler);
  }

  setRollupClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isOffers: event.offers.length !== 0,
          isInformation: event.information !== {},
          isPhotos: event.information.photos.length !== 0
        }
    );
  }

  static parseDataToEvent(data) {
    let newData = Object.assign({}, data);

    delete newData.isOffers;
    delete newData.isInformation;
    delete newData.isPhotos;

    return newData;
  }
}
