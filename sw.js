const CACHE_NAME = "invitacion-am-v2";

const FILES_TO_CACHE = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./img/slide1.png",
  "./img/slide2.png",
  "./img/slide3.png",
  "./img/slide4.png",
  "./img/slide5.png",
  "./img/slide6.png",
  "./audio/musica.mp3",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/apple-touch-icon.png",
  "./assets/preview.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});