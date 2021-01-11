import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

const BAR_HEIGHT = 55;

const makeItemsUniq = (items) => {
  const eventTypes = items.map((event) => event.type).sort();
  return [...new Set(eventTypes)];
};

const countMoneyByType = (events, type) => {
  const eventsByType = events.filter((event) => event.type === type);
  const prices = eventsByType.map((event) => event.price);

  return prices.reduce((previousValue, currentItem) => previousValue + currentItem, 0);
};

const countEventsByType = (events, type) => {
  return events.filter((event) => event.type === type).length;
};

const countTimeByType = (events, type) => {
  const eventsByType = events.filter((event) => event.type === type);
  const times = eventsByType.map((event) => event.times.endDate.diff(event.times.startDate, `day`));

  return times.reduce((previousValue, currentItem) => previousValue + currentItem, 0);
};

export const renderMoneyChart = (moneyCtx, events) => {
  const uniqEvents = makeItemsUniq(events);
  const moneyByTypes = uniqEvents.map((event) => countMoneyByType(events, event));
  const typeLabels = uniqEvents.map((event) => event.toUpperCase());

  moneyCtx.height = BAR_HEIGHT * uniqEvents.length - 1;

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeLabels,
      datasets: [{
        data: moneyByTypes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `€ ${val}`
        }
      },
      title: {
        display: true,
        text: `MONEY`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export const renderTypeChart = (typeCtx, events) => {
  const uniqEvents = makeItemsUniq(events);
  const eventByTypes = uniqEvents.map((event) => countEventsByType(events, event));
  const typeLabels = uniqEvents.map((event) => event.toUpperCase());

  typeCtx.height = BAR_HEIGHT * uniqEvents.length - 1;

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeLabels,
      datasets: [{
        data: eventByTypes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}x`
        }
      },
      title: {
        display: true,
        text: `TYPE`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};

export const renderTimeChart = (timeCtx, events) => {
  const uniqEvents = makeItemsUniq(events);
  const timeByTypes = uniqEvents.map((event) => countTimeByType(events, event));
  const typeLabels = uniqEvents.map((event) => event.toUpperCase());

  timeCtx.height = BAR_HEIGHT * uniqEvents.length - 1;

  return new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: typeLabels,
      datasets: [{
        data: timeByTypes,
        backgroundColor: `#ffffff`,
        hoverBackgroundColor: `#ffffff`,
        anchor: `start`,
        barThickness: 44,
        minBarLength: 50
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13
          },
          color: `#000000`,
          anchor: `end`,
          align: `start`,
          formatter: (val) => `${val}D`
        }
      },
      title: {
        display: true,
        text: `TIME-SPEND`,
        fontColor: `#000000`,
        fontSize: 23,
        position: `left`
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#000000`,
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false,
      }
    }
  });
};
