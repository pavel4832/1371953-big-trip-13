import {createOffers} from "./event-offers-available";

export const createEventEditOffersTemplate = (offers, isOffers) => {
  const offersList = isOffers ? createOffers(offers) : ``;

  return isOffers ? `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersList}
          </section>` : ``;
};
