import EventsSortView from "../view/events-sort.js";
import EventsListView from "../view/events-list.js";
import NoEventsView from "../view/no-events.js";
import InfoPresenter from "./info.js";
import EventPresenter from "./event.js";
import {render, RenderPosition} from "../utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

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
    const infoPresenter = new InfoPresenter(this._tripEvents);
    infoPresenter.init();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._tripComponent);
    eventPresenter.init(event);
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
