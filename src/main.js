import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import {createSiteFilterTemplate} from "./view/site-filter.js";
import {createEventsSortTemplate} from "./view/events-sort.js";
import {createEventsListTemplate} from "./view/events-list.js";
import {createEventsItemTemplate} from "./view/events-item.js";
import {createEventsEditorTemplate} from "./view/events-edit.js";
import {generateEvent} from "./mock/event.js";
import {renderTemplate, renderElement, RenderPosition} from "./utils.js";

const EVENT_COUNT = 16;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const [siteMenuHeader, siteFilterHeader] = siteTripMainElement.querySelectorAll(`h2`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteEventsHeader = siteEventsElement.querySelector(`h2`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent);

events.sort((a, b) => {
  return a.times.startDate - b.times.startDate;
});

renderTemplate(siteTripMainElement, createTripInfoTemplate(events), `afterbegin`);

const siteTripInfoElement = siteTripMainElement.querySelector(`.trip-info`);

renderTemplate(siteTripInfoElement, createTripCostTemplate(events), `beforeend`);

renderElement(siteMenuHeader, new SiteMenuView().getElement(), RenderPosition.AFTER);

renderTemplate(siteFilterHeader, createSiteFilterTemplate(), `afterend`);

renderTemplate(siteEventsHeader, createEventsSortTemplate(), `afterend`);

renderTemplate(siteEventsElement, createEventsListTemplate(), `beforeend`);

const listEventsElement = siteEventsElement.querySelector(`.trip-events__list`);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderTemplate(listEventsElement, createEventsItemTemplate(events[i]), `beforeend`);
}
