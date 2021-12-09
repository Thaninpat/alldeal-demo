const subscription = async () => {
  // Service Worker
  const worker = await navigator.serviceWorker.register('./js/worker.js')
  const clientId = await worker.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey:
      'BJsLO8D3n98TCq5bdazXPpETrTWfgT7K7W4ptB0ssuyqeEGitcg-vHQdHVOktV-qD0oZjovL2ax8b3UWJ_djaRs',
  })
  await fetch('http://localhost:3000/subscription', {
    method: 'POST',
    body: JSON.stringify(clientId),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  console.log('Subscribed.')
}

subscription()
