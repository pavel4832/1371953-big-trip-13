import AbstractView from "./abstract-view.js";

const createTripCostTemplate = (events) => {
  let totalPrice = 0;

  for (let i = 0; i < events.length; i++) {
    let offerPrice = 0;
    events[i].offers.forEach((offer) => {
      offerPrice += offer.price;
    });
    totalPrice += events[i].price + offerPrice;
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
