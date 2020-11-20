import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createEventsSortTemplate} from "./view/events-sort.js";
import {createEventsListTemplate} from "./view/events-list.js";
import {createEventsItemTemplate} from "./view/events-item.js";
import {createEventsEditorTemplate} from "./view/events-edit.js";
import {generateEvent} from "./mock/event.js";

const EVENT_COUNT = 16;
const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const [siteMenuHeader, siteFilterHeader] = siteTripMainElement.querySelectorAll(`h2`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteEventsHeader = siteEventsElement.querySelector(`h2`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

events.sort((a, b) => {
  if (a.times.startDate.isBefore(b.times.startDate)) {
    return -1;
  } else if (a.times.startDate.isAfter(b.times.startDate)) {
    return 1;
  } else {
    return 0;
  }
});

render(siteTripMainElement, createTripInfoTemplate(events), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

render(siteTripInfoElement, createTripCostTemplate(events), `beforeend`);

render(siteMenuHeader, createSiteMenuTemplate(), `afterend`);

render(siteFilterHeader, createSiteFilterTemplate(), `afterend`);

render(siteEventsHeader, createEventsSortTemplate(), `afterend`);

render(siteEventsElement, createEventsListTemplate(), `beforeend`);

const listEventsElement = siteEventsElement.querySelector(`.trip-events__list`);

render(listEventsElement, createEventsEditorTemplate(events[0]), `afterbegin`);

for (let i = 1; i < EVENT_COUNT; i++) {
  render(listEventsElement, createEventsItemTemplate(events[i]), `beforeend`);
}
