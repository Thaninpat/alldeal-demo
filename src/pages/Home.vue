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
      <v-btn @click="getRefreshToken">refresh token</v-btn>
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
    insertToken(res) {
      if (res) {
        localStorage.setItem('id_token', res.id_token)
        localStorage.setItem('access_token', res.access_token)
        localStorage.setItem('refresh_token', res.refresh_token)
        console.log('success')
      } else console.log('Not response')
    },
    async getCode() {
      try {
        const data = qs.stringify({
          grant_type: 'authorization_code',
          code: this.code,
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
        console.log(options)
        const response = await axios(options)
        if (response.status == 200) {
          setCookie(response.data)
          console.log(getCookie('id_token'))
          this.insertToken(response.data)
        }
        this.$router.replace('/')
      } catch (error) {
        console.log(error.message)
      }
    },
    async getRefreshToken() {
      try {
        const refreshToken = await localStorage.getItem('refresh_token')
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
          this.insertToken(response.data)
        } else {
          alert('Not token')
        }
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  created() {
    let url_string = window.location.href
    let url = new URL(url_string)
    let code = url.searchParams.get('code')
    this.code = code
    if (this.code) {
      this.getCode()
    }
  },
}
</script>
