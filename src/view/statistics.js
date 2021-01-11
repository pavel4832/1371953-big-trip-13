import AbstractView from "./abstract-view.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderMoneyChart = (moneyCtx, events) => {
  // Функция для отрисовки графика по деньгам
};

const renderTypeChart = (typeCtx, events) => {
  // Функция для отрисовки графика по типам
};

const renderTimeChart = (timeCtx, events) => {
  // Функция для отрисовки графика по времени
};

const createStatisticsTemplate = () => {

  return `<section class="statistics">
            <h2 class="visually-hidden">Trip statistics</h2>

            <div class="statistics__item statistics__item--money">
              <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--transport">
              <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
            </div>

            <div class="statistics__item statistics__item--time-spend">
              <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
            </div>
          </section>`;
};

export default class Statistics extends AbstractView {
  constructor(events) {
    super();

    this._events = events;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const BAR_HEIGHT = 55;

    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    this._moneyChart = renderMoneyChart(moneyCtx, this._events);
    this._typeChart = renderTypeChart(typeCtx, this._events);
    this._timeChart = renderTimeChart(timeCtx, this._events);
  }
}
