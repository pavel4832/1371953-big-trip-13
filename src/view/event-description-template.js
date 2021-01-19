import {createEventEditPhotosTemplate} from "./event-photos-template.js";

export const createEventEditDescriptionTemplate = (destination) => {
  const photosTemplate = createEventEditPhotosTemplate(destination.pictures);

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${destination.description}</p>
            ${photosTemplate}
          </section>`;
};
