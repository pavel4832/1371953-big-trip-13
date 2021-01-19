import EventsModel from "./model/events.js";

const Method = {
  GET: `GET`,
  PUT: `PUT`
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endpoint, authorization) {
    this._endpoint = endpoint;
    this._authorization = authorization;
  }

  getDestinations() {
    return this._load({url: `destinations`})
      .then((destinations) => destinations);
  }

  getOffers() {
    return this._load({url: `offers`})
      .then((offers) => offers);
  }

  getEvents() {
    return this._load({url: `points`})
      .then((events) => events.map(EventsModel.adaptToClient));
  }

  updateEvent(event) {
    return this._load({
      url: `points/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(EventsModel.adaptToServer(event)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(EventsModel.adaptToClient);
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endpoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .then(Api.toJSON)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }

    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
