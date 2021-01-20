import AbstractView from "./abstract-view.js";
import {sortEventDay} from "../utils/event.js";

const createTripInfoTemplate = (events) => {
  const startDay = events[0].times.startDate;
  const endDay = events[events.length - 1].times.endDate;

  let trip = [];
  let time;

  if (events.length <= 3) {
    events.forEach((event) => {
      trip.push(event.destination.name);
    });
  } else {
    trip.push(events[0].destination.name);
    trip.push(`...`);
    trip.push(events[events.length - 1].destination.name);
  }

  if (startDay.diff(endDay, `month`) === 0) {
    time = `${startDay.format(`MMM D`)} - ${endDay.format(`D`)}`;
  } else {
    time = `${startDay.format(`MMM D`)} - ${endDay.format(`MMM D`)}`;
  }

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${trip.join(` - `)}</h1>

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
