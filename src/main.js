import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter.js";
import InfoPresenter from "./presenter/info.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, remove, RenderPosition} from "./utils/render.js";
import {sortEventDay} from "./utils/event.js";
import {MenuItem} from "./const.js";

const EVENT_COUNT = 16;

const siteControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const addNewButtonElement = document.querySelector(`.trip-main__event-add-btn`);
const [siteMenuHeader, siteFilterHeader] = siteControlsElement.querySelectorAll(`h2`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(sortEventDay);
const siteMenuComponent = new SiteMenuView();

let statisticsComponent = null;

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(siteMainElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterHeader, filterModel, eventsModel);
const tripInfoPresenter = new InfoPresenter(eventsModel.getEvents());

render(siteMenuHeader, siteMenuComponent, RenderPosition.AFTER);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      tripInfoPresenter.destroy();
      tripPresenter.init();
      remove(statisticsComponent);
      addNewButtonElement.disabled = false;
      break;
    case MenuItem.STATISTICS:
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      statisticsComponent = new StatisticsView(eventsModel.getEvents());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      tripInfoPresenter.init();
      tripPresenter.destroy();
      addNewButtonElement.disabled = true;
      break;
  }
};

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

addNewButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
