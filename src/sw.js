// Inside src/service-worker.js
self.__precacheManifest = [].concat(self.__precacheManifest || [])
workbox.precaching.precacheAndRoute(self.__precacheManifest, {})

// Reload
// self.addEventListener('message', (event) => {
//   if (!event.data) {
//     return
//   }
//   switch (event.data) {
//     case 'skipWaiting':
//       self.skipWaiting()
//       break
//     default:
//       // NOOP
//       break
//   }
// })
// workbox.core.clientsClaim()
