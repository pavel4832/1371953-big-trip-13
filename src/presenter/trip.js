import TripBoardView from "../view/trip-board.js";
import EventsSortView from "../view/events-sort.js";
import EventsListView from "../view/event-list.js";
import NoEventsView from "../view/no-events.js";
import StatisticsView from "../view/statistics.js";
import LoadingView from "../view/loading.js";
import InfoPresenter from "./info.js";
import EventPresenter, {State as EventPresenterViewState} from "./event.js";
import EventNewPresenter from "./event-new.js";
import {render, RenderPosition, remove} from "../utils/render.js";
import {sortEventDay, sortEventTime, sortEventPrice} from "../utils/event.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
import {filter} from "../utils/filter.js";

export default class Trip {
  constructor(tripContainer, eventsModel, filterModel, api) {
    this._eventsModel = eventsModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._eventPresenterList = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._api = api;

    this._infoPresenter = null;
    this._sortComponent = null;

    this._boardComponent = new TripBoardView();
    this._tripComponent = new EventsListView();
    this._noEventsComponent = new NoEventsView();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderBoard();
    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._boardComponent);
    remove(this._statisticsComponent);

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent() {
    const destinationList = this._eventsModel.getDestination();
    const offerList = this._eventsModel.getOffers();

    this._eventNewPresenter = new EventNewPresenter(this._tripComponent, destinationList, offerList, this._handleViewAction);

    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._eventNewPresenter.init();
  }

  changeTableToStats() {
    this._boardComponent.hideElement();
    this._statisticsComponent.showElement();
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING, true);
  }

  changeStatsToTable() {
    this._boardComponent.showElement();
    this._statisticsComponent.hideElement();
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING, false);
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.DEFAULT:
        return filteredEvents.sort(sortEventDay);
      case SortType.TIME:
        return filteredEvents.sort(sortEventTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortEventPrice);
    }

    return filteredEvents;
  }

  _handleModeChange() {
    if (this._eventNewPresenter) {
      this._eventNewPresenter.destroy();
    }

    Object
      .values(this._eventPresenterList)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventPresenterList[update.id].setViewState(EventPresenterViewState.SAVING);
        this._api.updateEvent(update)
          .then((response) => {
            this._eventsModel.updateEvent(updateType, response);
          })
          .catch(() => {
            this._eventPresenterList[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_EVENT:
        this._eventNewPresenter.setSaving();
        this._api.addEvent(update)
          .then((response) => {
            this._eventsModel.addEvent(updateType, response);
          })
          .catch(() => {
            this._eventNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_EVENT:
        this._eventPresenterList[update.id].setViewState(EventPresenterViewState.DELETING);
        this._api.deleteEvent(update)
          .then(() => {
            this._eventsModel.deleteEvent(updateType, update);
          })
          .catch(() => {
            this._eventPresenterList[update.id].setViewState(EventPresenterViewState.ABORTING);
          });
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenterList[data.id].init(data);
        this._renderTripInfo();
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
    if (this._infoPresenter !== null) {
      this._infoPresenter.destroy();
    }

    this._infoPresenter = new InfoPresenter(this._getEvents());
    this._infoPresenter.init();
  }

  _renderBoard() {
    render(this._tripContainer, this._boardComponent, RenderPosition.BEFOREEND);
    render(this._boardComponent, this._tripComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new EventsSortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._boardComponent, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderEvent(event) {
    const destinationList = this._eventsModel.getDestination();
    const offerList = this._eventsModel.getOffers();

    const eventPresenter = new EventPresenter(this._tripComponent, destinationList, offerList, this._handleViewAction, this._handleModeChange);

    eventPresenter.init(event);
    this._eventPresenterList[event.id] = eventPresenter;
  }

  _renderEventsList() {
    this._getEvents().forEach((tripEvent) => this._renderEvent(tripEvent));
  }

  _renderNoEvents() {
    render(this._boardComponent, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._boardComponent, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderStatistic() {
    this._statisticsComponent = new StatisticsView(this._eventsModel.getEvents());
    render(this._tripContainer, this._statisticsComponent, RenderPosition.BEFOREEND);
  }

  _clearTrip({resetSortType = false} = {}) {
    if (this._eventNewPresenter) {
      this._eventNewPresenter.destroy();
    }

    Object
      .values(this._eventPresenterList)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenterList = {};

    remove(this._sortComponent);
    remove(this._noEventsComponent);
    remove(this._loadingComponent);

    if (this._statisticsComponent) {
      remove(this._statisticsComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getEvents().length === 0) {
      this._renderNoEvents();
      return;
    }

    this._renderTripInfo();
    this._renderSort();
    this._renderEventsList();
    this._renderStatistic();

    if (this._boardComponent.getElement().classList.contains(`trip-events--hidden`)) {
      this._statisticsComponent.showElement();
    }
  }
}
