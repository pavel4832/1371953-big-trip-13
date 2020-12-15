import {createOffers} from "./event-offers-available";

export const createEventEditOffersTemplate = (offers) => {
  const offersTemplate = createOffers(offers);

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            ${offersTemplate}
          </section>`;
};
