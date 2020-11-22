export const createOffers = (offers) => {
  let checkedLuggage = ``;
  let checkedComfort = ``;
  let checkedMeal = ``;
  let checkedSeats = ``;
  let checkedTrain = ``;

  for (let i = 0; i < offers.length; i++) {
    const {type} = offers[i];

    switch (type) {
      case `event-offer-luggage`:
        checkedLuggage = `checked`;
        break;
      case `event-offer-comfort`:
        checkedComfort = `checked`;
        break;
      case `event-offer-meal`:
        checkedMeal = `checked`;
        break;
      case `event-offer-seats`:
        checkedSeats = `checked`;
        break;
      case `event-offer-train`:
        checkedTrain = `checked`;
        break;
    }
  }

  return `<div class="event__available-offers">
            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${checkedLuggage}>
                <label class="event__offer-label" for="event-offer-luggage-1">
                  <span class="event__offer-title">Add luggage</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">50</span>
                </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" ${checkedComfort}>
                <label class="event__offer-label" for="event-offer-comfort-1">
                  <span class="event__offer-title">Switch to comfort</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">80</span>
                </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal" ${checkedMeal}>
                <label class="event__offer-label" for="event-offer-meal-1">
                  <span class="event__offer-title">Add meal</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">15</span>
                </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats" ${checkedSeats}>
                <label class="event__offer-label" for="event-offer-seats-1">
                  <span class="event__offer-title">Choose seats</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">5</span>
                </label>
            </div>

            <div class="event__offer-selector">
              <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train" ${checkedTrain}>
                <label class="event__offer-label" for="event-offer-train-1">
                  <span class="event__offer-title">Travel by train</span>
                  &plus;&euro;&nbsp;
                  <span class="event__offer-price">40</span>
                </label>
            </div>
          </div>`;
};
