import TripInfoView from "../view/trip-info.js";
import TripCostView from "../view/trip-cost.js";
import {remove, render, RenderPosition} from "../utils/render";

const siteTripMainElement = document.querySelector(`.trip-main`);

export default class Info {
  constructor(tripEvents) {
    this._infoContainer = siteTripMainElement;
    this._tripInfoComponent = new TripInfoView(tripEvents);
    this._tripCostComponent = new TripCostView(tripEvents);
  }

  init() {
    render(this._infoContainer, this._tripInfoComponent, RenderPosition.AFTERBEGIN);

    render(this._tripInfoComponent, this._tripCostComponent, RenderPosition.BEFOREEND);
  }

  destroy() {
    remove(this._tripInfoComponent);
    remove(this._tripCostComponent);
  }
}
