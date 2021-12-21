import axios from 'axios'
import qs from 'qs'
import router from '../routes'

export const setCookie = (res) => {
  let d = new Date()
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000)
  let expires = 'expires=' + d.toUTCString()
  document.cookie = `access_token=${res.access_token};${expires};path=/`
  document.cookie = `id_token=${res.id_token};${expires};path=/`
  document.cookie = `refresh_token=${res.refresh_token};${expires};path=/`
}

export const getCookie = (cookieName) => {
  let cookieArr = document.cookie.match(
    new RegExp('(^| )' + cookieName + '=([^;]+)')
  )
  if (cookieArr) return cookieArr[2]
  else console.log('--something went wrong---')
}

export const removeCookie = (cookieName) => {
  document.cookie = `${cookieName}=;path=/;max-age=0`
}

export const getLoginApi = async () => {
  try {
    let url_string = window.location.href
    let url = new URL(url_string)
    let code = url.searchParams.get('code')
    const data = qs.stringify({
      grant_type: 'authorization_code',
      code: code,
      client_id: process.env.VUE_APP_CLIENT_ID,
      redirect_uri: 'https://alldeal-demo.netlify.app/',
    })

    const basicBase64 = btoa(
      `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`
    )
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicBase64}`,
      },
      data,
      url: process.env.VUE_APP_URL_OAUTH,
    }
    const response = await axios(options)
    if (response.status == 200) {
      setCookie(response.data)
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const getRefreshToken = async () => {
  try {
    const refreshToken = getCookie('refresh_token')
    if (refreshToken) {
      const data = qs.stringify({
        grant_type: 'refresh_token',
        client_id: process.env.VUE_APP_CLIENT_ID,
        refresh_token: refreshToken,
      })
      const basicBase64 = btoa(
        `${process.env.VUE_APP_CLIENT_ID}:${process.env.VUE_APP_CLIENT_SECRET}`
      )
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${basicBase64}`,
        },
        data,
        url: process.env.VUE_APP_URL_OAUTH,
      }
      const response = await axios(options)
      setCookie(response.data)
      router.replace('/')
    } else {
      alert('Not token')
      router.replace('/')
    }
  } catch (error) {
    console.log(error.message)
  }
}
