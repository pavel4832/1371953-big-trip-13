import SiteMenuView from "./view/site-menu.js";
import {generateEvent} from "./mock/event.js";
import TripPresenter from "./presenter/trip";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import {sortEventDay} from "./utils/event.js";
import {MenuItem} from "./const.js";
import Api from "./api.js";

const EVENT_COUNT = 16;
const AUTHORIZATION = `Basic hsjkjhfgajks434jka845`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

const siteControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const addNewButtonElement = document.querySelector(`.trip-main__event-add-btn`);
const [siteMenuHeader, siteFilterHeader] = siteControlsElement.querySelectorAll(`h2`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort(sortEventDay);
const siteMenuComponent = new SiteMenuView();
const api = new Api(END_POINT, AUTHORIZATION);

api.getEvents().then((events) => {
  console.log(events);
  // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
  // а ещё на сервере используется snake_case, а у нас camelCase.
  // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
  // Есть вариант получше - паттерн "Адаптер"
});

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(siteMainElement, eventsModel, filterModel);
const filterPresenter = new FilterPresenter(siteFilterHeader, filterModel, eventsModel);

render(siteMenuHeader, siteMenuComponent, RenderPosition.AFTER);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.TABLE:
      siteMenuComponent.setMenuItem(MenuItem.TABLE);
      tripPresenter.changeStatsToTable();
      addNewButtonElement.disabled = false;
      break;
    case MenuItem.STATISTICS:
      siteMenuComponent.setMenuItem(MenuItem.STATISTICS);
      tripPresenter.changeTableToStats();
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
