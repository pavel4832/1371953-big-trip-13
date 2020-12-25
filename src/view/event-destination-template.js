import {CITIES} from "../mock/event.js";

const createCitiesDataList = (cities) => {
  let citiesList = ``;

  cities.forEach((city) => {
    citiesList += `<option value="${city}"></option>`;
  });

  return `<datalist id="destination-list-1">
            ${citiesList}
          </datalist>`;
};

export const createEventDestinationTemplate = (destination) => {
  return `<input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
          ${createCitiesDataList(CITIES)}`;
};
