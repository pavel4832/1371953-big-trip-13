import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter.js";
import InfoPresenter from "./presenter/info.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import {sortEventDay} from "./utils/event.js";
import {MenuItem} from "./const.js";

const EVENT_COUNT = 16;

const siteControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
const [siteMenuHeader, siteFilterHeader] = siteControlsElement.querySelectorAll(`h2`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(sortEventDay);
const siteMenuComponent = new SiteMenuView();

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(siteEventsElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterHeader, filterModel, eventsModel);
const tripInfoPresenter = new InfoPresenter(eventsModel.getEvents());

render(siteMenuHeader, siteMenuComponent, RenderPosition.AFTER);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      tripPresenter.init();
      // Скрыть статистику
      break;
    case MenuItem.STATISTICS:
      tripPresenter.destroy();
      // Показать статистику
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripInfoPresenter.init();
// tripPresenter.init();
render(siteMainElement, new StatisticsView(eventsModel.getEvents()), RenderPosition.BEFOREEND);

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
