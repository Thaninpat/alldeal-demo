/* eslint-disable no-console */

import { register } from 'register-service-worker'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
      Notification.requestPermission((status) => {
        console.log('Status: ', status)
      })
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
    },
    updated(registration) {
      console.log('New content is available; please refresh.')
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
      // document.dispatchEvent(
      //   new CustomEvent('swUpdated', { detail: registration })
      // )
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    },
  })
  const subscription = async () => {
    // Service Worker
    const worker = await navigator.serviceWorker.ready
    const clientId = await worker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey:
        'BJsLO8D3n98TCq5bdazXPpETrTWfgT7K7W4ptB0ssuyqeEGitcg-vHQdHVOktV-qD0oZjovL2ax8b3UWJ_djaRs',
    })
    await fetch('https://alldeal-login.herokuapp.com/subscription', {
      method: 'POST',
      body: JSON.stringify(clientId),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log('Subscribed.')
  }

  subscription()
}
