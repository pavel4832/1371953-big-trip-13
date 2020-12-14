export const createOffersTemplate = (offers) => {
  const createOffersList = () => {
    let offersList = ``;

    offers.forEach((offer) => {
      const {name, price} = offer;

      offersList += `<li class="event__offer">
                        <span class="event__offer-title">${name}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${price}</span>
                     </li>`;
    });

    return offersList;
  };

  const offerList = createOffersList();

  return `<ul class="event__selected-offers">${offerList}</ul>`;
};
