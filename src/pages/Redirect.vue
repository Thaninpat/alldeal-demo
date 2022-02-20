<template>
  <div>
    <div v-text="'Loading...'"></div>
  </div>
</template>

<script>
import { getCookie } from '../helper/utils'
export default {
  async created() {
    try {
      let idToken = getCookie('id_token')
      let refreshToken = getCookie('refresh_token')
      if (idToken) {
        return this.$router.replace('/')
      }
      // else if (!idToken && refreshToken !== 'undefined') {
      //   getRefreshToken()
      // }
      else if (!idToken && !refreshToken == 'undefined') {
        await this.redirectAuthorize()
      } else {
        await this.redirectAuthorize()
      }
    } catch (error) {
      console.log(error.message)
    }
  },

  methods: {
    async redirectAuthorize() {
      try {
        const aws = {
          url: process.env.VUE_APP_AWS_AUTHORIZE,
          clientId: process.env.VUE_APP_CLIENT_ID,
          responseType: process.env.VUE_APP_AWS_RESPONSE_type,
          scope: process.env.VUE_APP_AWS_SCOPE,
          redirectUri: process.env.VUE_APP_AWS_REDIRECT_URI,
        }
        let uri = `${aws.url}/oauth2/authorize?client_id=${aws.clientId}&response_type=${aws.responseType}&scope=${aws.scope}&redirect_uri=${aws.redirectUri}`
        // console.log(uri)
        // window.location.href = uri
        setTimeout(() => {
          window.location.href = uri
        }, 1000 * 10)
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
