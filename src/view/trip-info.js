export const createTripInfoTemplate = (events) => {
  const startDay = events[0].times.startDate;
  const endDay = events[events.length - 1].times.endDate;

  let trip = [];
  let time = ``;

  for (let i = 0; i < events.length; i++) {
    trip.push(events[i].destination);
  }

  if (startDay.diff(endDay, `month`) === 0) {
    time = `${startDay.format(`MMM D`)} - ${endDay.format(`D`)}`;
  } else {
    time = `${startDay.format(`MMM D`)} - ${endDay.format(`MMM D`)}`;
  }

  return `<section class="trip-main__trip-info  trip-info">
            <div class="trip-info__main">
              <h1 class="trip-info__title">${trip.join(` - `)}</h1>

              <p class="trip-info__dates">${time}</p>
            </div>
          </section>`;
};
