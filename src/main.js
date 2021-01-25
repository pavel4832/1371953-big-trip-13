import SiteMenuView from "./view/site-menu.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {isOnline} from "./utils/common.js";
import {render, RenderPosition} from "./utils/render.js";
import {toast} from "./utils/toast.js";
import {MenuItem, UpdateType} from "./const.js";
import Api from "./api/api.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic hsjkjhfgajks434jka845`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v13`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const addNewButtonElement = document.querySelector(`.trip-main__event-add-btn`);
const [siteMenuHeader, siteFilterHeader] = siteControlsElement.querySelectorAll(`h2`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(siteMainElement, eventsModel, filterModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteFilterHeader, filterModel, eventsModel);

const siteMenuComponent = new SiteMenuView();

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

Promise.all([
  apiWithProvider.getDestinations(),
  apiWithProvider.getOffers(),
  apiWithProvider.getEvents()
])
  .then(([destinations, offers, events]) => {
    eventsModel.setDestination(UpdateType.INIT, destinations);
    eventsModel.setOffers(UpdateType.INIT, offers);
    eventsModel.setEvents(UpdateType.INIT, events);

    render(siteMenuHeader, siteMenuComponent, RenderPosition.AFTER);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    eventsModel.setDestination(UpdateType.INIT, []);
    eventsModel.setOffers(UpdateType.INIT, []);
    eventsModel.setEvents(UpdateType.INIT, []);

    render(siteMenuHeader, siteMenuComponent, RenderPosition.AFTER);
    siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  });

filterPresenter.init();
tripPresenter.init();

addNewButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  if (!isOnline()) {
    toast(`You can't create new task offline`);
    return;
  }
  tripPresenter.createEvent();
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`./sw.js`);
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
