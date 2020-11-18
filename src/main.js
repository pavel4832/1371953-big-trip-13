import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createEventsSortTemplate} from "./view/events-sort.js";
import {createEventsItemTemplate} from "./view/events-item.js";
import {createEventsEditorTemplate} from "./view/events-edit.js";
import {createEventsNewAddTemplate} from "./view/events-add-new.js";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const siteControlHeaders = siteTripMainElement.querySelectorAll(`h2`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteEventsHeader = siteEventsElement.querySelector(`h2`);
const EVENT_COUNT = 3;

render(siteTripMainElement, createTripInfoTemplate(), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

render(siteTripInfoElement, createTripCostTemplate(), `beforeend`);

render(siteControlHeaders[0], createSiteMenuTemplate(), `afterend`);

render(siteControlHeaders[1], createSiteFilterTemplate(), `afterend`);

render(siteEventsHeader, createEventsSortTemplate(), `afterend`);

render(siteEventsElement, `<ul class="trip-events__list"></ul>`, `beforeend`);

const listEventsElement = siteEventsElement.querySelector(`.trip-events__list`);

render(listEventsElement, createEventsEditorTemplate(), `afterbegin`);

const eventsItemsElement = listEventsElement.querySelectorAll(`.trip-events__item`);

render(eventsItemsElement[0], createEventsNewAddTemplate(), `afterend`);

for (let i = 0; i < EVENT_COUNT; i++) {
  render(listEventsElement, createEventsItemTemplate(), `beforeend`);
}
