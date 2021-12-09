import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

import settings from './settings'

// Initialize Firebase
const firebaseApp = initializeApp(settings.firebaseConfig)

// Retrieve Firebase Messaging object.
const messaging = getMessaging(firebaseApp)

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload)
  const notificationTitle = 'Background Message Title'
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/img/icons/android-chrome-192x192.png',
  }
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  )
  //   appendMessage(payload)
})

// Add the public key generated from the console here.
getToken(messaging, {
  vapidKey:
    'BDYlnr6c97YABKODnXIo68KB0jVmMUVOOu_tLns2CSQwxNbuGocVBIRsUlQIzcmXwxVJgfCrgyKAmzUhMV1E8B4',
})
  .then((currentToken) => {
    if (currentToken) {
      console.log('Activated web push tokens')
      // Send the token to your server and update the UI if necessary
    } else {
      // Show permission request UI
      console.log(
        'No registration token available. Request permission to generate one.'
      )
    }
  })
  .catch((err) => {
    console.log('An error occurred while retrieving token. ', err)
  })

// function appendMessage(payload) {
//   console.log('appendMessage', payload)

//   // const messagesElement = document.querySelector('#messages');
//   // const dataHeaderELement = document.createElement('h5');
//   // const dataElement = document.createElement('pre');
//   // dataElement.style = 'overflow-x:hidden;'
//   // dataHeaderELement.textContent = 'Received message:';
//   // dataElement.textContent = JSON.stringify(payload, null, 2);
//   // messagesElement.appendChild(dataHeaderELement);
//   // messagesElement.appendChild(dataElement);
// }
