import {EventType} from "../const.js";
export const createEventTypeTemplate = (type) => {
  return `<label class="event__label  event__type-output" for="event-destination-1">
            ${EventType[type]}
          </label>`;
};
