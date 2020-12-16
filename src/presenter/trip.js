import EventsSortView from "../view/events-sort.js";
import EventsListView from "../view/event-list.js";
import NoEventsView from "../view/no-events.js";
import InfoPresenter from "./info.js";
import EventPresenter from "./event.js";
import {updateItem} from "../utils/common.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortEventTime, sortEventPrice} from "../utils/event.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._infoPresenter = null;
    this._eventPresenterList = {};
    this._currentSortType = SortType.DEFAULT;

    this._tripComponent = new EventsListView();
    this._sortComponent = new EventsSortView();
    this._noEventsComponent = new NoEventsView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripEvents) {
    this._tripEvents = tripEvents.slice();
    this._sourcedTripEvents = tripEvents.slice();

    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._tripEvents.sort(sortEventTime);
        break;
      case SortType.PRICE:
        this._tripEvents.sort(sortEventPrice);
        break;
      default:
        this._tripEvents = this._sourcedTripEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenterList)
      .forEach((presenter) => presenter.resetView());
  }

  _handleEventChange(updatedEvent) {
    this._tripEvents = updateItem(this._tripEvents, updatedEvent);
    this._eventPresenterList[updatedEvent.id].init(updatedEvent);
    this._infoPresenter.destroy();
    this._infoPresenter.init(this._tripEvents);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._clearEventsList();
    this._renderEventsList();
  }

  _renderTripInfo() {
    this._infoPresenter = new InfoPresenter();
    this._infoPresenter.init(this._tripEvents);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._tripComponent, this._handleEventChange, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenterList[event.id] = eventPresenter;
  }

  _renderEventsList() {
    this._tripEvents.forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  _renderNoEvents() {
    render(this._tripContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _clearEventsList() {
    Object
      .values(this._eventPresenterList)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenterList = {};
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
