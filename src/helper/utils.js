export const setCookie = (res) => {
  let d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = `id_token=${res.id_token};${expires};path=/`
}

export const getCookie = (cookieName) => {
  let cookieArr = document.cookie.match(
    new RegExp('(^| )' + cookieName + '=([^;]+)')
  )
  if (cookieArr) return cookieArr
  else console.log('--something went wrong---')
}

// .split(';')
// .map((cookieString) => {
//   let cs = cookieString.trim().split('=')
//   if (cs.length === 2) {
//     return { name: cs[0], value: cs[1] }
//   } else {
//     return { name: '', value: '' }
//   }
// })
// .filter((cookieObject) => {
//   return cookieObject.name === cookieName
// })
