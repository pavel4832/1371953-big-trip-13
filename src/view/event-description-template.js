import {createEventEditPhotosTemplate} from "./event-photos-template.js";

export const createEventEditDescriptionTemplate = (destination) => {
  const description = destination.description;
  const photos = destination.pictures;

  const photosTemplate = createEventEditPhotosTemplate(photos);

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${photosTemplate}
          </section>`;
};
