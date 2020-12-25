import EventsSortView from "../view/events-sort.js";
import EventsListView from "../view/event-list.js";
import NoEventsView from "../view/no-events.js";
import InfoPresenter from "./info.js";
import EventPresenter from "./event.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortEventDay, sortEventTime, sortEventPrice} from "../utils/event.js";
import {SortType, UpdateType, UserAction} from "../const.js";

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._tripContainer = tripContainer;
    this._infoPresenter = null;
    this._eventPresenterList = {};
    this._currentSortType = SortType.DEFAULT;
    this._sortComponent = null;

    this._tripComponent = new EventsListView();
    this._noEventsComponent = new NoEventsView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    render(this._tripContainer, this._tripComponent, RenderPosition.BEFOREEND);

    this._renderTrip();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return this._eventsModel.getEvents().slice().sort(sortEventDay);
      case SortType.TIME:
        return this._eventsModel.getEvents().slice().sort(sortEventTime);
      case SortType.PRICE:
        return this._eventsModel.getEvents().slice().sort(sortEventPrice);
    }

    return this._eventsModel.getEvents();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenterList)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenterList[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderTrip();
  }

  _renderTripInfo() {
    this._infoPresenter = new InfoPresenter();
    this._infoPresenter.init(this._getEvents());
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new EventsSortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const eventPresenter = new EventPresenter(this._tripComponent, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenterList[event.id] = eventPresenter;
  }

  _renderEventsList() {
    this._getEvents().forEach((tripEvent) => this._renderEvent(tripEvent));
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

  _clearTrip({resetSortType = false} = {}) {
    Object
      .values(this._eventPresenterList)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenterList = {};

    this._infoPresenter.destroy();
    remove(this._sortComponent);
    remove(this._noEventsComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripInfo();
    this._renderSort();
    this._renderEventsList();
  }
}
