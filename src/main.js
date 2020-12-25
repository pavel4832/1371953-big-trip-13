import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/site-filter.js";
import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip";
import EventsModel from "./model/events.js";
import {render, RenderPosition} from "./utils/render.js";
import {sortEventDay} from "./utils/event.js";

const EVENT_COUNT = 16;

const siteTripMainElement = document.querySelector(`.trip-main`);
const siteEventsElement = document.querySelector(`.trip-events`);
const [siteMenuHeader, siteFilterHeader] = siteTripMainElement.querySelectorAll(`h2`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(sortEventDay);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const tripPresenter = new TripPresenter(siteEventsElement, eventsModel);

render(siteMenuHeader, new SiteMenuView(), RenderPosition.AFTER);

render(siteFilterHeader, new SiteFilterView(), RenderPosition.AFTER);

tripPresenter.init();
