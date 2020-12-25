import EventsSortView from "../view/events-sort.js";
import EventsListView from "../view/event-list.js";
import NoEventsView from "../view/no-events.js";
import InfoPresenter from "./info.js";
import EventPresenter from "./event.js";
import {render, RenderPosition} from "../utils/render.js";
import {sortEventTime, sortEventPrice} from "../utils/event.js";
import {SortType} from "../const.js";

export default class Trip {
  constructor(tripContainer, eventsModel) {
    this._eventsModel = eventsModel;
    this._tripContainer = tripContainer;
    this._infoPresenter = null;
    this._eventPresenterList = {};
    this._currentSortType = SortType.DEFAULT;

    this._tripComponent = new EventsListView();
    this._sortComponent = new EventsSortView();
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
    // Здесь будем вызывать обновление модели
    console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
  }

  _handleModelEvent(updateType, data) {
    console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    this._infoPresenter.destroy();
    this._infoPresenter.init(this._getEvents());
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearEventsList();
    this._renderEventsList();
  }

  _renderTripInfo() {
    this._infoPresenter = new InfoPresenter();
    this._infoPresenter.init(this._getEvents());
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
