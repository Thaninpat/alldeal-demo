<template>
  <base-layout pageTitle="Home">
    <div class="text-center ma-2">
      <v-snackbar
        rounded="pill"
        outlined
        color="warning"
        :value="updateExists"
        :timeout="-1"
      >
        An update is available
        <template v-slot:action="{ attrs }">
          <v-btn text color="warning" v-bind="attrs" @click="refreshApp">
            Update
          </v-btn>
        </template>
      </v-snackbar>
    </div>
    <v-container>
      <vue-chart />
      <!-- <div v-for="(info, idx) in user" :key="idx">
        <div v-text="info === null ? '' : info.roles"></div>
      </div> -->
      <!-- <li>{{ user.data.roles[0] }}</li> -->
      <!-- <v-btn @click="getRefreshToken">refresh token</v-btn> -->
    </v-container>
  </base-layout>
</template>

<script>
import update from '../mixins/update'
import VueChart from '../components/VueChart.vue'
import axios from 'axios'
import qs from 'qs'
import { setCookie, getCookie } from '../helper/utils'

export default {
  name: 'Home',
  components: { VueChart },
  mixins: [update],
  data: () => ({
    snackbar: false,
    text: `Hello, I'm a snackbar`,
    code: null,
    token: {
      id_token: '',
      access_token: '',
      refresh_token: '',
    },
  }),

  methods: {
    async getRefreshToken() {
      try {
        const refreshToken = await getCookie('refresh_token')
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
          console.log('Refresh token: ', response.data)
          setCookie(response.data)
        } else {
          alert('Not token')
        }
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  mounted() {
    let url_string = window.location.href
    let url = new URL(url_string)
    let code = url.searchParams.get('code')
    if (code) {
      this.$router.push('/home')
    }
  },
  // created() {
  // let url_string = window.location.href
  // let url = new URL(url_string)
  // let code = url.searchParams.get('code')
  // this.code = code
  // if (this.code) {
  //   this.getCode()
  // }
  // },
}
</script>
