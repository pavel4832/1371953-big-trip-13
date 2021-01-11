import AbstractView from "./abstract-view.js";

const createBoardTemplate = () => {
  return `<section class="trip-events">
            <h2 class="visually-hidden">Trip events</h2>
            <!-- Сортировка -->

            <!-- Контент -->
          </section>`;
};

export default class TripBoard extends AbstractView {
  getTemplate() {
    return createBoardTemplate();
  }
}
