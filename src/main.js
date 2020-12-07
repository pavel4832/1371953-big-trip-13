import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import SiteMenuView from "./view/site-menu.js";
import SiteFilterView from "./view/site-filter.js";
import EventsSortView from "./view/events-sort.js";
import EventsListView from "./view/events-list.js";
import EventView from "./view/events-item.js";
import EventEditView from "./view/events-edit.js";
import NoEventsView from "./view/no-events.js";
import {generateEvent} from "./mock/event.js";
import {render, replace, RenderPosition} from "./utils/render.js";

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

const renderEvent = (eventsListElement, event) => {
  const eventComponent = new EventView(event);
  const eventEditComponent = new EventEditView(event);

  const replaceCardToForm = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToCard = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      replaceFormToCard();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setRollupClickHandler(() => {
    replaceCardToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComponent.setRollupClickHandler(() => {
    replaceFormToCard();
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToCard();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(eventsListElement, eventComponent, RenderPosition.BEFOREEND);
};

const renderEventsList = (eventsContainer, tripEvents) => {
  const tripInfoComponent = new TripInfoView(tripEvents);
  const eventsListComponent = new EventsListView();

  if (tripEvents.length === 0) {
    render(siteEventsElement, new NoEventsView(), RenderPosition.BEFOREEND);
  } else {
    render(siteTripMainElement, tripInfoComponent, RenderPosition.AFTERBEGIN);

    render(tripInfoComponent, new TripCostView(events), RenderPosition.BEFOREEND);

    render(siteEventsHeader, new EventsSortView(), RenderPosition.AFTER);

    render(siteEventsElement, eventsListComponent, RenderPosition.BEFOREEND);

    for (let i = 0; i < EVENT_COUNT; i++) {
      renderEvent(eventsListComponent, tripEvents[i]);
    }
  }
};

render(siteMenuHeader, new SiteMenuView(), RenderPosition.AFTER);

render(siteFilterHeader, new SiteFilterView(), RenderPosition.AFTER);

renderEventsList(siteEventsElement, events);
