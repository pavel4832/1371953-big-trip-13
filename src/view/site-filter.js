import AbstractView from "./abstract-view.js";

const createFilterItemTemplate = (filter, currentFilterType, isStats) => {
  const {type, name, count} = filter;

  return `<div class="trip-filters__filter">
            <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilterType ? `checked` : `` } ${(count === 0 || isStats) ? `disabled` : ``}>
            <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
          </div>`;
};

const createSiteFilterTemplate = (filterItems, currentFilterType, isStats) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType, isStats)).join(``);

  return `<form class="trip-filters" action="#" method="get">
              ${filterItemsTemplate}
              <button class="visually-hidden" type="submit">Accept filter</button>
          </form>`;
};

export default class SiteFilter extends AbstractView {
  constructor(filters, currentFilterType, isStats) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._isStats = isStats;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteFilterTemplate(this._filters, this._currentFilter, this._isStats);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
