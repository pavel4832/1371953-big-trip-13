import {EventType} from "../const.js";

export const createEventTypeIconTemplate = (type, isDisabled) => {
  const eventTypes = Object.keys(EventType);
  let iconList = ``;

  eventTypes.forEach((event) => {
    iconList += `<div class="event__type-item">
                <input id="event-type-${event}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${event}" ${(event === type) ? `checked` : ``}>
                  <label class="event__type-label  event__type-label--${event}" for="event-type-${event}-1">${EventType[event]}</label>
              </div>`;
  });

  return `<label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input
            class="event__type-toggle  visually-hidden"
            id="event-type-toggle-1"
            type="checkbox"
            ${isDisabled ? `disabled` : ``}
          >

          <div class="event__type-list">
            <fieldset class="event__type-group" ${isDisabled ? `disabled` : ``}>
              <legend class="visually-hidden">Event type</legend>
              ${iconList}
            </fieldset>
          </div>`;
};
