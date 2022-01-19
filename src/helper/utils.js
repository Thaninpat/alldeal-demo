import axios from 'axios'
import moment from 'moment'
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
  else {
    // console.log('--something went wrong---')
    return
  }
}

export const removeCookie = async (cookieName) => {
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

export const getLogoutApi = async () => {
  try {
    const aws = {
      url: process.env.VUE_APP_AWS_AUTHORIZE,
      responseType: process.env.VUE_APP_AWS_RESPONSE_type,
      clientId: process.env.VUE_APP_CLIENT_ID,
      redirectUri: process.env.VUE_APP_AWS_REDIRECT_URI,
      state: 'STATE',
      scope: process.env.VUE_APP_AWS_SCOPE,
    }
    const cookieName = ['id_token', 'refresh_token', 'access_token']
    for (let x of cookieName) {
      await removeCookie(x)
    }

    let uri = `${aws.url}/logout?client_id=${aws.clientId}&response_type=${aws.responseType}&state=${aws.state}&scope=${aws.scope}&redirect_uri=${aws.redirectUri}`
    // console.log(uri)
    window.location.href = uri
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
      const aws = {
        url: process.env.VUE_APP_AWS_AUTHORIZE,
        clientId: process.env.VUE_APP_CLIENT_ID,
        responseType: process.env.VUE_APP_AWS_RESPONSE_type,
        scope: process.env.VUE_APP_AWS_SCOPE,
        redirectUri: process.env.VUE_APP_AWS_REDIRECT_URI,
      }
      let uri = `${aws.url}/oauth2/authorize?client_id=${aws.clientId}&response_type=${aws.responseType}&scope=${aws.scope}&redirect_uri=${aws.redirectUri}`
      // console.log(uri)
      window.location.href = uri
    }
  } catch (error) {
    console.log(error.message)
  }
}

export const getMonth = (date) => {
  let months = []
  let i = 0
  while (i < 6) {
    months.push(
      moment(date)
        .startOf('day')
        .subtract(i, 'month')
    )
    i++
  }
  return months.reverse()
}

export const getDay = (date) => {
  let days = []
  let i = 0
  while (i < 7) {
    days.push(
      moment(date)
        .startOf('day')
        .subtract(i, 'days')
    )
    i++
  }
  return days.reverse()
}
