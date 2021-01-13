import SiteMenuView from "./view/site-menu.js";
import TripPresenter from "./presenter/trip.js";
import FilterPresenter from "./presenter/filter.js";
import EventsModel from "./model/events.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";
import {MenuItem, UpdateType} from "./const.js";
import Api from "./api.js";

const AUTHORIZATION = `Basic hsjkjhfgajks434jka845`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;

const siteControlsElement = document.querySelector(`.trip-controls`);
const siteMainElement = document.querySelector(`.page-main .page-body__container`);
const addNewButtonElement = document.querySelector(`.trip-main__event-add-btn`);
const [siteMenuHeader, siteFilterHeader] = siteControlsElement.querySelectorAll(`h2`);

let destinationList = [];
let offerList = [];

const siteMenuComponent = new SiteMenuView();

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

const tripPresenter = new TripPresenter(siteMainElement, eventsModel, filterModel, destinationList, offerList);
const filterPresenter = new FilterPresenter(siteFilterHeader, filterModel, eventsModel);

const api = new Api(END_POINT, AUTHORIZATION);

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

render(siteMenuHeader, siteMenuComponent, RenderPosition.AFTER);
siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

api.getDestinations()
  .then((destination) => {
    tripPresenter.setDestination(destination);
  })
  .catch(() => {
    tripPresenter.setDestination([]);
  });

api.getOffers()
  .then((offers) => {
    tripPresenter.setOffers(offers);
  })
  .catch(() => {
    tripPresenter.setOffers([]);
  });

api.getEvents()
  .then((events) => {
    eventsModel.setEvents(UpdateType.INIT, events);
  })
  .catch(() => {
    eventsModel.setEvents(UpdateType.INIT, []);
  });

addNewButtonElement.addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createEvent();
});
