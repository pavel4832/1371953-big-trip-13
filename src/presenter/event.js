import EventView from "../view/event.js";
import EventEditView from "../view/event-edit.js";
import {render, replace, remove, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
import {isDataEqual, isDatesEqual} from "../utils/event.js";
import {isOnline} from "../utils/common.js";
import {toast} from "../utils/toast.js";

const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`
};

export default class Event {
  constructor(eventListContainer, destinationList, offerList, changeData, changeMode) {
    this._eventListContainer = eventListContainer;
    this._destinationList = destinationList;
    this._offerList = offerList;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleRollupClick = this._handleRollupClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new EventView(this._event);
    this._eventEditComponent = new EventEditView(this._event, this._destinationList, this._offerList);

    this._eventComponent.setRollupClickHandler(this._handleRollupClick);
    this._eventComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setRollupClickHandler(this._handleRollupClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventListContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventComponent, prevEventEditComponent);
      this._mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToCard();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  setViewState(state) {
    const resetFormState = () => {
      this._eventEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      });
    };

    switch (state) {
      case State.SAVING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.DELETING:
        this._eventEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.ABORTING:
        this._eventComponent.shake(resetFormState);
        this._eventEditComponent.shake(resetFormState);
        break;
    }
  }

  _replaceCardToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToCard() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _handleFavoriteClick() {
    this._changeData(
        UserAction.UPDATE_EVENT,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    }
  }

  _handleRollupClick() {
    if (this._mode !== Mode.DEFAULT) {
      this._eventEditComponent.reset(this._event);
      this._replaceFormToCard();
    } else {
      if (!isOnline()) {
        this.setViewState(State.ABORTING);
        toast(`You can't edit event offline`);
        return;
      }

      this._replaceCardToForm();
    }
  }

  _handleFormSubmit(update) {
    if (!isOnline()) {
      this.setViewState(State.ABORTING);
      toast(`You can't save event offline`);
      return;
    }

    const isMinorUpdate =
      !isDataEqual(this._event.destination, update.destination) ||
      !isDatesEqual(this._event.times, update.times) ||
      !isDataEqual(this._event.price, update.price) ||
      !isDataEqual(this._event.offers, update.offers);

    this._changeData(
        UserAction.UPDATE_EVENT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        update
    );
  }

  _handleDeleteClick(event) {
    if (!isOnline()) {
      this.setViewState(State.ABORTING);
      toast(`You can't delete event offline`);
      return;
    }

    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }
}
