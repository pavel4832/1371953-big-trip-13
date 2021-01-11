export const makeItemsUniq = (items) => [...new Set(items)];

export const amountMoneyByType = (events, type) => {
  const eventsByType = events.filter((event) => event.type === type);
  const prices = eventsByType.map((event) => event.price);

  return prices.reduce((previousValue, currentItem) => previousValue + currentItem, 0);
};
