const CACHE_NAME = 'safetylens-v1';
const ASSETS = [
  'index.html',
  'dashboard.html',
  'styles.css',
  'manifest.json',
  'js/i18n.js',
  'js/store.js',
  'js/modules.js',
  'js/qrcode.min.js',
  'js/qr_decoder.js',
  'js/qr_verifier.js',
  'js/ar_hud.js',
  'js/particles.js',
  'js/certificate.js',
  'js/dashboard.js',
  'js/chain.js',
  'js/app.js'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
