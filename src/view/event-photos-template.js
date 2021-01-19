export const createEventEditPhotosTemplate = (photos) => {
  let photosList = ``;

  photos.forEach((photo) => {
    photosList += `<img class="event__photo" src="${photo.src}" alt="${photo.description}}">`;
  });

  return `<div class="event__photos-container">
            <div class="event__photos-tape">
            ${photosList}
            </div>
          </div>`;
};
