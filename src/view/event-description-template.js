import {createEventEditPhotosTemplate} from "./event-photos-template";

export const createEventEditDescriptionTemplate = (information, isInformation, isPhotos) => {
  const description = (isInformation) ? information.description : ``;
  const photos = isPhotos ? information.photos : ``;

  const photosTemplate = isPhotos ? createEventEditPhotosTemplate(photos) : ``;

  return isInformation ? `<section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">${description}</p>
            ${photosTemplate}
          </section>` : ``;
};
