export const sortEventDay = (eventA, eventB) => {
  return eventA.times.startDate - eventB.times.startDate;
};

export const sortEventTime = (eventA, eventB) => {
  return eventA.times.duration - eventB.times.duration;
};

export const sortEventPrice = (eventA, eventB) => {
  return eventA.price - eventB.price;
};
