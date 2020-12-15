import {createEventEditPhotosTemplate} from "./event-photos-template";

export const createEventEditDescriptionTemplate = (information) => {
  const description = information.description;
  const photos = information.photos;

  const photosTemplate = createEventEditPhotosTemplate(photos);

  return `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${photosTemplate}
          </section>`;
};
