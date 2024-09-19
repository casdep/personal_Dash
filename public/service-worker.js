/* eslint-disable no-restricted-globals */

const CACHE_NAME = "my-app-cache-v1"; // Added versioning to the cache
const urlsToCache = ["/", "/notes", "/planner", "/about", "/profile", "/login"];

// Installation event - Cache the specified URLs
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting(); // Activate the service worker immediately after installation
});

// Activation event - Clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]; // Only keep the current cache
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log("Deleting old cache:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Claim all open clients immediately
});

// Fetch event - Serve cached content, fallback to network if not cached
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Cache hit - return response, otherwise fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // Optionally handle failed fetch (offline fallback)
        // For example, you can return an offline.html page or a default message
      })
  );
});
