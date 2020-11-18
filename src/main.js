import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createEventsSortTemplate} from "./view/events-sort.js";
import {createEventsListTemplate} from "./view/events-list.js";
import {createEventsItemTemplate} from "./view/events-item.js";
import {createEventsEditorTemplate} from "./view/events-edit.js";
import {createEventsNewTemplate} from "./view/events-new.js";

const EVENT_COUNT = 3;
const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const [siteMenuHeader, siteFilterHeader] = siteTripMainElement.querySelectorAll(`h2`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteEventsHeader = siteEventsElement.querySelector(`h2`);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteTripMainElement, createTripInfoTemplate(), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

render(siteTripInfoElement, createTripCostTemplate(), `beforeend`);

render(siteMenuHeader, createSiteMenuTemplate(), `afterend`);

render(siteFilterHeader, createSiteFilterTemplate(), `afterend`);

render(siteEventsHeader, createEventsSortTemplate(), `afterend`);

render(siteEventsElement, createEventsListTemplate(), `beforeend`);

const listEventsElement = siteEventsElement.querySelector(`.trip-events__list`);

render(listEventsElement, createEventsNewTemplate(), `afterbegin`);

render(listEventsElement, createEventsEditorTemplate(), `afterbegin`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(listEventsElement, createEventsItemTemplate(), `beforeend`);
}
