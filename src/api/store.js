export default class Store {
  constructor(key, storage) {
    this._storage = storage;
    this._storeKey = key;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItems(items) {
    this._storage.setItem(
        this._storeKey,
        JSON.stringify(items)
    );
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  setDataByKey(key, items) {
    this._storage.setItem(
        key,
        JSON.stringify(items)
    );
  }

  getDataByKey(key) {
    try {
      return JSON.parse(this._storage.getItem(key)) || [];
    } catch (err) {
      return [];
    }
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
        this._storeKey,
        JSON.stringify(store)
    );
  }
}
