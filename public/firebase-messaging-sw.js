importScripts('https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js'
)
firebase.initializeApp({
  apiKey: 'AIzaSyB-i2Vx2jpCNHuhVHp5zn2jhKiU_tOqgFg',
  authDomain: 'alldeal-demo.firebaseapp.com',
  projectId: 'alldeal-demo',
  storageBucket: 'alldeal-demo.appspot.com',
  messagingSenderId: '1079522180516',
  appId: '1:1079522180516:web:047f4582f047a53bc2d531',
  measurementId: 'G-8NDY6WSPZC',
})

const messaging = firebase.messaging()
// messaging.onBackgroundMessage((payload) => {
//   console.log(
//     '[firebase-messaging-sw.js] Received background message ',
//     payload.notification
//   )
//   // Customize notification here
//   const notificationTitle = 'Background Message Title'
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: '/img/icons/android-chrome-192x192.png',
//   }

//   return self.registration.showNotification(
//     notificationTitle,
//     notificationOptions
//   )
// })
