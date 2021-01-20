import SmartView from "./smart.js";
import {createEventTypeIconTemplate} from "./event-icon-template.js";
import {createEventTypeTemplate} from "./event-type-template.js";
import {createEventDestinationTemplate} from "./event-destination-template.js";
import {createEventEditOffersTemplate} from "./event-offers-available.js";
import {createEventEditDescriptionTemplate} from "./event-description-template.js";
import {getTimes, getOffersByType} from "../utils/event.js";
import {RADIX} from "../const.js";
import dayjs from "dayjs";
import flatpickr from "flatpickr";

import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const createEventEditTemplate = (data, destinationList, offerList) => {
  const {
    type,
    destination,
    times,
    price,
    offers,
    isNew,
    isStartDate,
    isEndDate,
    isOffers,
    isDisabled,
    isSaving,
    isDeleting
  } = data;
  const startTime = times.startDate.format(`DD/MM/YY HH:mm`);
  const endTime = times.endDate.format(`DD/MM/YY HH:mm`);

  const typeIconTemplate = createEventTypeIconTemplate(type, isDisabled);
  const typeTemplate = createEventTypeTemplate(type);
  const destinationTemplate = createEventDestinationTemplate(destination, destinationList, isDisabled);
  const offerTemplate = createEventEditOffersTemplate(type, offerList, offers, isOffers, isDisabled);
  const descriptionTemplate = createEventEditDescriptionTemplate(destination, destinationList);
  const isSubmitDisabled = (isStartDate && startTime === null) || (isEndDate && endTime === null);

  const closeButtonText = (isNew) ? `Cancel` : `${isDeleting ? `Deleting...` : `Delete`}`;
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
                  <input
                    class="event__input
                    event__input--time"
                    id="event-start-time-1"
                    type="text"
                    name="event-start-time"
                    value="${startTime}"
                    ${isDisabled ? `disabled` : ``}
                  >
                  &mda
                  <label class="visually-hidden" for="event-end-time-1">To</label>
                  <input
                    class="event__input  event__input--time"
                    id="event-end-time-1"
                    type="text"
                    name="event-end-time"
                    value="${endTime}"
                    ${isDisabled ? `disabled` : ``}
                  >
                </div>

                <div class="event__field-group  event__field-group--price">
                  <label class="event__label" for="event-price-1">
                    <span class="visually-hidden">Price</span>
                    &euro;
                  </label>
                  <input
                    class="event__input  event__input--price"
                    id="event-price-1"
                    type="number"
                    name="event-price"
                    value="${price}"
                    ${isDisabled ? `disabled` : ``}
                  >
                </div>

                <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>
                    ${isSaving ? `Saving...` : `Save`}
                </button>
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
    this._offerToggleHandler = this._offerToggleHandler.bind(this);
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
    this.getElement()
      .querySelectorAll(`.event__offer-checkbox`)
      .forEach((offer) => offer.addEventListener(`click`, this._offerToggleHandler));
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
      offers: []
    });
  }

  _destinationToggleHandler(evt) {
    if (!this._destinationList.find((destination) => destination.name === evt.target.value)) {
      evt.target.setCustomValidity(`Выберите город из списка`);
    } else {
      evt.target.setCustomValidity(``);

      evt.preventDefault();
      this.updateData({
        destination: this._setDestination(this._destinationList, evt.target.value)
      });
    }
    evt.target.reportValidity();
  }

  _setDestination(destinations, name) {
    return destinations.find((destination) => destination.name === name);
  }

  _priceToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: parseInt(evt.target.value, RADIX)
    });
  }

  _offerToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      offers: this._setOffers(evt.target.name),
      isOffers: false
    });
  }

  _setOffers(newOffer) {
    const cutLetters = 12;
    const newTitle = newOffer.substr(cutLetters);

    const currentOffers = getOffersByType(this._offerList, this._data.type);
    const newOfferItem = currentOffers.find((offer) => offer.title === newTitle);

    let newOffers = this._data.offers;

    const offerIndex = newOffers.findIndex((offer) => offer.title === newTitle);

    if (offerIndex !== -1) {
      newOffers.splice(offerIndex, 1);
    } else {
      newOffers.push(newOfferItem);
    }

    return newOffers;
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
          isOffers: false,
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToEvent(data) {
    let newData = Object.assign({}, data);

    delete newData.isStartDate;
    delete newData.isEndDate;
    delete newData.isOffers;
    delete newData.isDisabled;
    delete newData.isSaving;
    delete newData.isDeleting;

    return newData;
  }
}
