<template>
  <v-container>
    <h4>Loading...</h4>
  </v-container>
</template>

<script>
export default {
  created() {
    this.redirectAuthorize()
  },
  methods: {
    redirectAuthorize() {
      const aws = {
        url: process.env.VUE_APP_AWS_AUTHORIZE,
        clientId: process.env.VUE_APP_CLIENT_ID,
        responseType: process.env.VUE_APP_AWS_RESPONSE_type,
        scope: process.env.VUE_APP_AWS_SCOPE,
        redirectUri: process.env.VUE_APP_AWS_REDIRECT_URI,
      }
      let uri = `${aws.url}?client_id=${aws.clientId}&response_type=${aws.responseType}&scope=${aws.scope}&redirect_uri=${aws.redirectUri}`
      window.location.href = uri
    },
  },
}
</script>

<style></style>
