<template>
  <div v-text="'Loading...'"></div>
</template>

<script>
import { getCookie, getRefreshToken } from '../helper/utils'
export default {
  data: () => ({}),
  created() {
    try {
      if (getCookie('id_token')) {
        return this.$router.replace('/')
      } else if (!getCookie('id_token') && getCookie('refresh_token')) {
        getRefreshToken()
      } else {
        this.redirectAuthorize()
      }
    } catch (error) {
      console.log(error.message)
    }
  },
  methods: {
    redirectAuthorize() {
      try {
        const aws = {
          url: process.env.VUE_APP_AWS_AUTHORIZE,
          clientId: process.env.VUE_APP_CLIENT_ID,
          responseType: process.env.VUE_APP_AWS_RESPONSE_type,
          scope: process.env.VUE_APP_AWS_SCOPE,
          redirectUri: process.env.VUE_APP_AWS_REDIRECT_URI,
        }
        let uri = `${aws.url}?client_id=${aws.clientId}&response_type=${aws.responseType}&scope=${aws.scope}&redirect_uri=${aws.redirectUri}`
        console.log(uri)
        window.location.href = uri
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
