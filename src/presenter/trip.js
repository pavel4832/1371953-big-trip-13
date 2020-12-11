import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import EventsSortView from "./view/events-sort.js";
import EventsListView from "./view/events-list.js";
import EventView from "./view/events-item.js";
import EventEditView from "./view/events-edit.js";
import NoEventsView from "./view/no-events.js";
import {render, replace, RenderPosition} from "./utils/render.js";

const siteTripMainElement = document.querySelector(`.trip-main`);

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripInfoComponent = new TripInfoView(this._tripEvents);
    this._tripCostComponent = new TripCostView(this._tripEvents)
    this._tripComponent = new EventsListView();
    this._sortComponent = new EventsSortView();
    this._noEventsComponent = new NoEventsView();
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();

    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _renderTripInfo() {
    render(siteTripMainElement, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    render(this._tripInfoComponent, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderEventsList() {
    this._tripEvents.forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderTrip() {
    if (this._tripEvents.length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripInfo();

    this._renderSort();

    this._renderEventsList();
  }
}
