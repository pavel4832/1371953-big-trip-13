export const sortEventDay = (eventA, eventB) => {
  return eventA.times.startDate - eventB.times.startDate;
};

export const sortEventTime = (eventA, eventB) => {
  const durationA = eventA.times.endDate - eventA.times.startDate;
  const durationB = eventB.times.endDate - eventB.times.startDate;

  return durationA - durationB;
};

export const sortEventPrice = (eventA, eventB) => {
  return eventA.price - eventB.price;
};
