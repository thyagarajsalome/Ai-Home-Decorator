// SAFETY SERVICE WORKER
// This file replaces the old one to fix the blank screen issue.
// It forces immediate activation and deletes all old caches.

const CACHE_NAME = "safety-worker-v1";

self.addEventListener("install", (event) => {
  // Force this new worker to activate immediately
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Take control of all clients immediately
  event.waitUntil(clients.claim());

  // DELETE ALL CACHES to fix the blank screen
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          console.log("Deleting old cache:", cacheName);
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// NETWORK ONLY STRATEGY
// Pass all requests directly to the network. Never use cache.
self.addEventListener("fetch", (event) => {
  event.respondWith(fetch(event.request));
});
