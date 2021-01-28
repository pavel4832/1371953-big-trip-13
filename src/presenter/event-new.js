import EventEditView from "../view/event-edit.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType, BLANK_EVENT} from "../const.js";

export default class EventNew {
  constructor(eventListContainer, destinationList, offerList, changeData) {
    this._eventListContainer = eventListContainer;
    this._destinationList = destinationList;
    this._offerList = offerList;
    this._changeData = changeData;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    this._addNewButtonElement = document.querySelector(`.trip-main__event-add-btn`);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new EventEditView(BLANK_EVENT, this._destinationList, this._offerList);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._eventListContainer, this._eventEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._addNewButtonElement.disabled = true;
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._addNewButtonElement.disabled = false;
  }

  setSaving() {
    this._eventEditComponent.updateData({
      isDisabled: true,
      isSaving: true
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    this._eventEditComponent.shake(resetFormState);
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        Object.assign(event, {isNew: false}));
  }

  _handleDeleteClick() {
    this._eventEditComponent.reset(BLANK_EVENT);
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(BLANK_EVENT);
      this.destroy();
    }
  }
}
