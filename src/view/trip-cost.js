import AbstractView from "./abstract-view.js";

const createTripCostTemplate = (events) => {
  let totalPrice = 0;

  for (let event of events) {
    let offerPrice = 0;

    event.offers.forEach((offer) => {
      offerPrice += offer.price;
    });

    totalPrice = totalPrice + event.price + offerPrice;
  }

  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
          </p>`;
};

export default class TripCost extends AbstractView {
  constructor(events) {
    super();
    this._events = events;
  }

  getTemplate() {
    return createTripCostTemplate(this._events);
  }
}
