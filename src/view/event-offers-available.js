export const createEventEditOffersTemplate = (type, allOffers, checkedOffers, isOffers, isDisabled) => {
  const currentOfferElement = allOffers.find((offer) => offer.type === type);
  const currentOfferList = currentOfferElement.offers;

  let offerList = ``;

  currentOfferList .forEach((offer) => {
    const idName = offer.title;
    let checked = ``;

    if (!isOffers) {
      checkedOffers.forEach((checkedOffer) => {
        if (offer.title === checkedOffer.title) {
          checked = `checked`;
        }
      });
    }

    offerList += `<div class="event__offer-selector">
                    <input
                        class="event__offer-checkbox  visually-hidden"
                        id="event-offer-${idName}"
                        type="checkbox"
                        name="event-offer-${idName}"
                        ${checked}
                        ${isDisabled ? `disabled` : ``}
                    >
                      <label class="event__offer-label" for="event-offer-${idName}">
                        <span class="event__offer-title">${offer.title}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${offer.price}</span>
                      </label>
                  </div>`;
  });

  return `<section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${offerList}
            </div>
          </section>`;
};
