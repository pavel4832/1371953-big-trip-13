import {createOffers} from "./event-offers-available.js";
import AbstractView from "./abstract-view.js";

const createEventTypeIconTemplate = (type) => {
  return `<label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              <div class="event__type-item">
                <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
                <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
                <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
                <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
                <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-transport-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="transport">
                <label class="event__type-label  event__type-label--transport" for="event-type-transport-1">Transport</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
                <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" checked>
                <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
                <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
                <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
              </div>

              <div class="event__type-item">
                <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
                <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
              </div>
            </fieldset>
          </div>`;
};

const createEventTypeTemplate = (type) => {
  return `<label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>`;
};

const createEventDestinationTemplate = (destination) => {
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>`;
};

const createEventEditOffersTemplate = (offers) => {
  const offersTemplate = createOffers(offers);

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersTemplate}
          </section>`;
};

const createEventEditPhotosTemplate = (photos) => {
  let photosList = ``;

  photos.forEach((photo) => {
    photosList += `<img class="event__photo" src="${photo}" alt="Event photo">`;
  });

  return `<div class="event__photos-container">
            <div class="event__photos-tape">
            ${photosList}
            </div>
          </div>`;
};

const createEventEditDescriptionTemplate = (information) => {
  const description = information.description;
  const photos = information.photos;

  const photosTemplate = createEventEditPhotosTemplate(photos);

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${photosTemplate}
          </section>`;
};

const createEventEditTemplate = (data) => {
  const {type, destination, times, price, offers, information} = data;
  const startTime = times.startDate.format(`DD/MM/YY HH:mm`);
  const endTime = times.endDate.format(`DD/MM/YY HH:mm`);

  const typeIconTemplate = createEventTypeIconTemplate(type);
  const typeTemplate = createEventTypeTemplate(type);
  const destinationTemplate = createEventDestinationTemplate(destination);
  const offerTemplate = createEventEditOffersTemplate(offers);
  const descriptionTemplate = createEventEditDescriptionTemplate(information);

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

export default class EventEdit extends AbstractView {
  constructor(events) {
    super();
    this._data = EventEdit.parseEventToData(events);

    this._clickHandler = this._clickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._eventTypeToggleHandler = this._eventTypeToggleHandler.bind(this);
    this._destinationToggleHandler = this._destinationToggleHandler.bind(this);

    this.getElement()
      .querySelector(`.event__type-input`)
      .addEventListener(`change`, this._eventTypeToggleHandler);
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationToggleHandler);
  }

  getTemplate() {
    return createEventEditTemplate(this._data);
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
        {},
        this._data,
        update
    );

    this.updateElement();
  }

  updateElement() {
    let prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
  }

  _eventTypeToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newType: evt.target.value
    });
  }

  _destinationToggleHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newDestination: evt.target.value
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
          newType: null,
          newDestination: null
        }
    );
  }

  static parseDataToEvent(data) {
    data = Object.assign({}, data);

    delete data.newType;
    delete data.newDestination;

    return data;
  }
}
