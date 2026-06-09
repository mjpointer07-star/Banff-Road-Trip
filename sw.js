const CACHE_NAME = 'pointer-trip-v6';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './images/Wyoming- Montana Drive.jpg',
    './images/Going-to-the-Sun-Road_Glacier-National-Park.jpeg',
    './images/Hidden Lake.webp',
    './images/Mountain goats in logan pass.webp',
    './images/Many Glacier.jpg',
    './images/avalanche-lake.jpg',
    './images/glacier-national-park-lake-mcdonald-sunset.jpg',
    './images/Waterton Lake.jpg',
    './images/Red Rock Canyon Waterton.webp',
    './images/Moraine-Lake-1-2048x1365.jpeg',
    './images/lake-louise.jpg',
    './images/Castle mountain.jpg',
    './images/Icefields parkway.jpg',
    './images/Bow lake.jpg',
    './images/sulphur_mountain_gondola_banff.jpg',
    './images/Bow Falls in Banff.jpg',
    './images/Lamar Valley bison herd.jpg',
    './images/Mammoth Hot Springs terraces.jpg',
    './images/Artist Point Lower Falls Yellowstone.jpg',
    './images/Grand Prismatic Spring aerial.jpg',
    './images/Old Faithful eruption summer.jpg',
    './images/Oxbow Bend Grand Teton reflection.jpg',
    './images/Pointers road trip loop.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
        ))
    );
});
