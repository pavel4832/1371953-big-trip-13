import AbstractView from "./abstract-view.js";
import {sortEventDay} from "../utils/event.js";

const createTripInfoTemplate = (events) => {
  const startDay = events[0].times.startDate;
  const endDay = events[events.length - 1].times.endDate;

  const tripDestinationsName = Array.from(new Set(events.map((event) => event.destination.name)));

  let time;
  let tripDestinations = [];

  if (tripDestinationsName.length <= 3) {
    tripDestinationsName.forEach((name) => {
      tripDestinations.push(name);
    });
  } else {
    tripDestinations.push(tripDestinationsName[0]);
    tripDestinations.push(`...`);
    tripDestinations.push(tripDestinationsName[tripDestinationsName.length - 1]);
  }

  if (startDay.diff(endDay, `month`) === 0) {
    time = `${startDay.format(`MMM D`)} - ${endDay.format(`D`)}`;
  } else {
    time = `${startDay.format(`MMM D`)} - ${endDay.format(`MMM D`)}`;
  }

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${tripDestinations.join(` - `)}</h1>

              <p class="trip-info__dates">${time}</p>
            </div>
          </section>`;
};

export default class TripInfo extends AbstractView {
  constructor(events) {
    super();
    this._events = events.slice().sort(sortEventDay);
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
  }
}
