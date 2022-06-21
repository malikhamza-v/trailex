const CACHE_NAME = "varsion-1";
const urlsToCache = ["index.html", "offline.html"];

// const self = this;

//intallation of server worker
self.addEventListener("install", (event) => {
  //open the catch and add urlsToCache
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cached Open");

      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch((err) => caches.match("offline.html"));
    })
  );
});
//Activate the server worker
self.addEventListener("activate", (event) => {
  //remove all the previous caches and store the new one
  const cacheWhitelist = [];
  cacheWhitelist.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheNames) => {
          if (!cacheWhitelist.includes(cacheNames)) {
            return caches.delete(cacheNames);
          }
        })
      )
    )
  );
});
