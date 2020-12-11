import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import EventsSortView from "./view/events-sort.js";
import EventsListView from "./view/events-list.js";
import EventView from "./view/events-item.js";
import EventEditView from "./view/events-edit.js";
import NoEventsView from "./view/no-events.js";
import {render, replace, RenderPosition} from "./utils/render.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._tripComponent = new EventsListView();
    this._sortComponent = new EventsSortView();
    this._noEventsComponent = new NoEventsView();
  }

  init(tripEvents) {
    this._tripEvants = tripEvents.slice();
  }

  _renderTripInfo() {
    // метод отрисовки шапки маршрута с полной стоимостью
  }

  _renderSort() {
    // Метод для рендеринга сортировки
  }

  _renderEvent() {
    // Метод, куда уйдёт логика созданию и рендерингу компонетов задачи,
    // текущая функция renderTask в main.js
  }

  _renderEventsList() {
    // Метод для рендеринга N-задач за раз
  }

  _renderNoEvents() {
    // Метод для рендеринга заглушки
  }

  _renderTrip() {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
  }
}
