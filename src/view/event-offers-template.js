import {createOffers} from "./event-offers-available.js";

export const createEventEditOffersTemplate = (type, allOffers, checkedOffers, isOffers) => {
  const offersList = createOffers(type, allOffers, checkedOffers, isOffers);

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersList}
          </section>`;
};
