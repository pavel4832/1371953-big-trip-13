import Observer from "../utils/observer.js";
import {FilterType} from "../const.js";

export default class Filter extends Observer {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
  }

  setFilter(updateType, filter, isStats = false) {
    this._activeFilter = filter;
    this._notify(updateType, filter, isStats);
  }

  getFilter() {
    return this._activeFilter;
  }
}
