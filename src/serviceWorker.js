// Register the service worker
export function register() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js") // The path must be from the root (public folder)
        .then((registration) => {
          console.log(
            "ServiceWorker registered with scope:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("ServiceWorker registration failed:", error);
        });
    });
  }
}

// Unregister the service worker if needed
export function unregister() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
