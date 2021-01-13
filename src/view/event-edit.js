import SmartView from "./smart.js";
import {createEventTypeIconTemplate} from "./event-icon-template.js";
import {createEventTypeTemplate} from "./event-type-template.js";
import {createEventDestinationTemplate} from "./event-destination-template.js";
import {createEventEditOffersTemplate} from "./event-offers-template.js";
import {createEventEditDescriptionTemplate} from "./event-description-template.js";
import {getTimes} from "../utils/event.js";
import dayjs from "dayjs";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createEventEditTemplate = (data, destinationList, offerList) => {
  const {type, destination, times, price, offers, isNew, isStartDate, isEndDate, isOffers} = data;
  const startTime = times.startDate.format(`DD/MM/YY HH:mm`);
  const endTime = times.endDate.format(`DD/MM/YY HH:mm`);

  const typeIconTemplate = createEventTypeIconTemplate(type);
  const typeTemplate = createEventTypeTemplate(type);
  const destinationTemplate = createEventDestinationTemplate(destination, destinationList);
  const offerTemplate = createEventEditOffersTemplate(type, offerList, offers, isOffers);
  const descriptionTemplate = createEventEditDescriptionTemplate(destination, destinationList);
  const isSubmitDisabled = (isStartDate && startTime === null) || (isEndDate && endTime === null);

  const closeButtonText = (isNew) ? `Cancel` : `Delete`;
  const rollButton = (!isNew) ? `<button class="event__rollup-btn" type="button">
                                   <span class="visually-hidden">Open event</span>
                                 </button>` : ``;

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
                  <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
                <button class="event__reset-btn" type="reset">${closeButtonText}</button>
                ${rollButton}
              </header>
              <section class="event__details">
                ${offerTemplate}
                ${descriptionTemplate}
              </section>
            </form>
          </li>`;
};

export default class EventEdit extends SmartView {
  constructor(event, destinationList, offerList) {
    super();
    this._destinationList = destinationList;
    this._offerList = offerList;

    this._data = EventEdit.parseEventToData(event);
    this._startDatepicker = null;
    this._endDatepicker = null;

    this._clickHandler = this._clickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);
    this._priceToggleHandler = this._priceToggleHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  removeElement() {
    super.removeElement();

    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
  }

  reset(event) {
    this.updateData(
        EventEdit.parseEventToData(event)
    );
  }

  getTemplate() {
    return createEventEditTemplate(this._data, this._destinationList, this._offerList);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setDeleteClickHandler(this._callback.deleteClick);

    if (!this._data.isNew) {
      this.setRollupClickHandler(this._callback.click);
    }
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__type-group`)
      .addEventListener(`change`, this._eventTypeToggleHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationToggleHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceToggleHandler);
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }

    this._startDatepicker = flatpickr(
        this.getElement().querySelector(`#event-start-time-1`),
        {
          enableTime: true,
          altInput: true,
          altFormat: `d/m/y H:i`,
          dateFormat: `Y-m-d`,
          defaultDate: this._data.times.startDate.toDate(),
          onChange: this._startDateChangeHandler
        }
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }

    this._endDatepicker = flatpickr(
        this.getElement().querySelector(`#event-end-time-1`),
        {
          enableTime: true,
          altInput: true,
          altFormat: `d/m/y H:i`,
          dateFormat: `Y-m-d`,
          defaultDate: this._data.times.endDate.toDate(),
          onChange: this._endDateChangeHandler
        }
    );
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: EventEdit.setOffers(this._offerList, evt.target.value),
      isOffers: true
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      destination: EventEdit.setDestination(this._destinationList, evt.target.value)
    });
  }

  _priceToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
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

  _startDateChangeHandler([date]) {
    const newStartDate = dayjs(date);

    this.updateData({
      times: getTimes(newStartDate, this._data.times.endDate)
    });
  }

  _endDateChangeHandler([date]) {
    const newEndDate = dayjs(date);

    this.updateData({
      times: getTimes(this._data.times.startDate, newEndDate)
    });
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(EventEdit.parseDataToEvent(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  static parseEventToData(event) {
    return Object.assign(
        {},
        event,
        {
          isStartDate: event.times.startDate !== null,
          isEndDate: event.times.endDate !== null,
          ieOffers: false
        }
    );
  }

  static parseDataToEvent(data) {
    let newData = Object.assign({}, data);

    delete newData.isStartDate;
    delete newData.isEndDate;
    delete newData.isOffers;

    return newData;
  }

  static setDestination(destinations, name) {
    return destinations.find((destination) => destination.name === name);
  }

  static setOffers(offers, type) {
    return offers.find((offer) => offer.type === type).offers;
  }
}
