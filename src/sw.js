// Inside src/service-worker.js
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})

self.addEventListener('push', (e) => {
  const data = e.data.json()
  self.registration.showNotification(data.title, {
    body: data.message,
    icon: '/img/icons/android-chrome-192x192.png',
    badge:
      'https://cdn2.iconfinder.com/data/icons/stationary-19/100/Thumb_Tack-128.png',
    vibrate: [100, 100, 100],
    actions: [
      {
        action: 'close',
        title: 'close notification',
        icon:
          'https://cdn2.iconfinder.com/data/icons/stationary-19/100/Thumb_Tack-128.png',
      },
      {
        action: 'lookMessage',
        title: 'open notification',
        icon: 'https://cdn0.iconfinder.com/data/icons/mono2/100/view-128.png',
      },
    ],
  })
})

self.addEventListener('notificationclick', (event) => {
  if (event.action === 'lookMessage') {
    event.notification.close()
    clients.openWindow('https://alldeal-demo.netlify.app')
  } else if (event.action === 'close') {
    event.notification.close()
  }
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

workbox.routing.registerRoute(
  new RegExp('https://alldeal-supplier-api.herokuapp.com/seller/v1/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'orderapis',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
    method: 'GET',
    cashableResponse: { statuses: [0, 200] },
  })
)
