const createCitiesDataList = (destinationList) => {
  const cities = destinationList.map((city) => city.name);
  let citiesList = ``;

  cities.forEach((city) => {
    citiesList += `<option value="${city}"></option>`;
  });

  return `<datalist id="destination-list-1">
            ${citiesList}
          </datalist>`;
};

export const createEventDestinationTemplate = (destination, destinationList, isDisabled) => {
  return `<input
            class="event__input  event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${destination.name}"
            list="destination-list-1"
            ${isDisabled ? `disabled` : ``}
          >
          ${createCitiesDataList(destinationList)}`;
};
