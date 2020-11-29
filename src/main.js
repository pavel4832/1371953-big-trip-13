import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/site-filter.js";
import EventSortView from "./view/events-sort.js";
import EventListView from "./view/events-list.js";
import EventView from "./view/events-item.js";
import EventEditView from "./view/events-edit.js";
import {generateEvent} from "./mock/event.js";
import {render, RenderPosition} from "./utils.js";

const EVENT_COUNT = 16;

const siteHeaderElement = document.querySelector(`.page-header`);
const siteMainElement = document.querySelector(`.page-main`);
const siteTripMainElement = siteHeaderElement.querySelector(`.trip-main`);
const [siteMenuHeader, siteFilterHeader] = siteTripMainElement.querySelectorAll(`h2`);
const siteEventsElement = siteMainElement.querySelector(`.trip-events`);
const siteEventsHeader = siteEventsElement.querySelector(`h2`);
const events = new Array(EVENT_COUNT).fill().map(generateEvent).sort((a, b) => {
  return a.times.startDate - b.times.startDate;
});
const tripInfoComponent = new TripInfoView(events);
const eventListComponent = new EventListView();

const renderEvent = (eventListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceCardToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToCard = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  eventEditComponent.getElement().querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteTripMainElement, tripInfoComponent.getElement(), RenderPosition.AFTERBEGIN);

render(tripInfoComponent.getElement(), new TripCostView(events).getElement(), RenderPosition.BEFOREEND);

render(siteMenuHeader, new SiteMenuView().getElement(), RenderPosition.AFTER);

render(siteFilterHeader, new SiteFilterView().getElement(), RenderPosition.AFTER);

render(siteEventsHeader, new EventSortView().getElement(), RenderPosition.AFTER);

render(siteEventsElement, eventListComponent.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EVENT_COUNT; i++) {
  renderEvent(eventListComponent.getElement(), events[i]);
}
