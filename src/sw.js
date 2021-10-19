// Inside src/service-worker.js
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

let clickOpenUrl
// Push Notification
self.addEventListener('push', (event) => {
  const payload = event.data ? event.data.text() : 'no payload'
  clickOpenUrl = 'https://alldeal-demo.netlify.app/'
  event.waitUntil(
    self.registration.showNotification('ServiceWorker allDeal', {
      body: payload,
      icon: '/img/icons/android-chrome-192x192.png',
      image: '/img/thumbnail.jpg',
      vibrate: [200, 100, 200, 100, 200, 100, 200],
      tag: 'vibration-sample',
    })
  )
})

workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
    method: 'GET',
    cashableResponse: { statuses: [0, 200] },
  })
)

// Clicked Notification
self.addEventListener('notificationclick', (event) => {
  const clickedNotification = event.notification
  clickedNotification.close()
  if (clickOpenUrl) {
    // const promiseChain = clients.openWindow(clickOpenUrl)
    event.waitUntil({
      promiseChain: clients.openWindow(clickOpenUrl),
    })
  }
})
