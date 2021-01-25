const CACHE_PREFIX = `big-trip-cache`;
const CACHE_VERSION = `v13`;
const CACHE_NAME = `${CACHE_PREFIX}-${CACHE_VERSION}`;

const HTTP_STATUS_OK = 200;
const RESPONSE_SAFE_TYPE = `basic`;

self.addEventListener(`install`, (evt) => {
  evt.waitUntil(
      caches.open(CACHE_NAME)
      .then(wnindow.cacheItems(cache))
  );
});

self.addEventListener(`activate`, (evt) => {
  evt.waitUntil(
      caches.keys()
      .then(
          (keys) => Promise.all(
              keys.map(
                  (key) => {
                    if (key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME) {
                      return caches.delete(key);
                    }
                    return null;
                  })
            .filter((key) => key !== null)
          )
      )
  );
});

const handleFetch = (evt) => {
  const {request} = evt;

  evt.respondWith(
      caches.match(request)
      .then((cacheResponse) => {
        if (cacheResponse) {
          return cacheResponse;
        }
        return fetch(request)
          .then((response) => {
            if (!response || response.status !== HTTP_STATUS_OK || response.type !== RESPONSE_SAFE_TYPE) {
              return response;
            }
            const clonedResponse = response.clone();
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, clonedResponse));
            return response;
          });
      })
  );
};

self.addEventListener(`fetch`, handleFetch);
