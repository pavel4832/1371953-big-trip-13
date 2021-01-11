import AbstractView from "./abstract-view.js";
import {MenuItem} from "../const.js";

const createSiteMenuTemplate = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" data-item="${MenuItem.TABLE}">${MenuItem.TABLE}</a>
              <a class="trip-tabs__btn" href="#" data-item="${MenuItem.STATISTICS}">${MenuItem.STATISTICS}</a>
          </nav>`;
};

export default class SiteMenu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this._callback.menuClick(evt.target.dataset.item);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener(`click`, this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    const activeItem = this.getElement().querySelector(`.trip-tabs__btn--active`);
    const item = this.getElement().querySelector(`a[data-item=${menuItem}]`);

    if (activeItem !== item) {
      activeItem.classList.remove(`trip-tabs__btn--active`);
      item.classList.add(`trip-tabs__btn--active`);
    }
  }
}
