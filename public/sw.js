const CACHE_NAME = "ai-home-decorator-v1";
// This list should include all the core files for the app shell.
const urlsToCache = ["/", "/index.html", "/manifest.json"];
// Install a service worker
self.addEventListener("install", (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      // AddAll can fail if any of the resources fail to fetch.
      // For robustness, consider caching essential assets first.
      return cache.addAll(urlsToCache).catch((err) => {
        console.error("Failed to cache assets during install:", err);
      });
    })
  );
});

// Cache and return requests using a cache-then-network strategy.
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // We only want to cache GET requests.
  // We also want to ignore all API calls (which start with /api/).
  if (event.request.method !== "GET" || url.pathname.startsWith("/api/")) {
    // Let non-GET requests and API requests pass through to the network
    return;
  }

  // For all other GET requests, use cache-then-network
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit - return response
      if (response) {
        return response;
      }

      const fetchRequest = event.request.clone();

      return fetch(fetchRequest)
        .then((response) => {
          // Check if we received a valid response.
          // Don't cache opaque responses (from third-party CDNs without CORS) or errors.
          if (
            !response ||
            response.status !== 200 ||
            response.type === "opaque"
          ) {
            return response;
          }

          const responseToCache = response.clone();

          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch((err) => {
          console.error("Fetch failed:", err);
          // You could return a fallback offline page here if you have one.
        });
    })
  );
});

// Update a service worker and clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
