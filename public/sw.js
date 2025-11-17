// Bump this version to force an update
const CACHE_NAME = "ai-home-decorator-v3";

// We only cache the core shell.
// We do NOT cache the main page '/' here to avoid getting stuck.
const urlsToCache = ["/manifest.json", "/icons/icon-192x192.png"];

self.addEventListener("install", (event) => {
  self.skipWaiting(); // Activate immediately
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim()); // Take control immediately
  // Clean up old caches
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. IGNORE API CALLS (Always Network)
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // 2. NAVIGATION REQUESTS (HTML Pages) -> NETWORK FIRST
  // This fixes the "Blank Screen" by always trying to fetch the live page first.
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request).catch(() => {
        // If offline, fall back to cache or index.html
        return caches.match("/index.html");
      })
    );
    return;
  }

  // 3. ASSETS (Images, JS, CSS) -> STALE-WHILE-REVALIDATE
  // Serve from cache fast, but update in background
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
        });
        return networkResponse;
      });
      return cachedResponse || fetchPromise;
    })
  );
});
