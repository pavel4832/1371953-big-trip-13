import SiteMenuView from "./view/site-menu.js";
import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import {sortEventDay} from "./utils/event.js";

const EVENT_COUNT = 16;

const siteTripMainElement = document.querySelector(`.trip-main`);
const siteEventsElement = document.querySelector(`.trip-events`);
const [siteMenuHeader, siteFilterHeader] = siteTripMainElement.querySelectorAll(`h2`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(sortEventDay);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(siteEventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterHeader, filterModel, eventsModel);

render(siteMenuHeader, new SiteMenuView(), RenderPosition.AFTER);

filterPresenter.init();
tripPresenter.init();
