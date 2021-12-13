<template>
  <base-layout :pageTitle="user.data ? user.data.username : ''">
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
    </v-container>
  </base-layout>
</template>

<script>
import update from '../mixins/update'
import VueChart from '../components/VueChart.vue'
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'
import qs from 'qs'

export default {
  name: 'Home',
  components: { VueChart },
  mixins: [update],
  data: () => ({
    snackbar: false,
    text: `Hello, I'm a snackbar`,
    code: null,
  }),
  computed: {
    ...mapGetters({
      user: 'user/user',
    }),
  },
  methods: {
    ...mapActions({
      getUser: 'user/getUser',
    }),
    async getCode() {
      try {
        const data = {
          grant_type: 'authorization_code',
          code: this.code,
          client_id: '6d1763mcs6kle4nmbq1l3ta1h8',
          redirect_uri: 'https://alldeal-demo.netlify.app',
        }
        const basicBase64 = 'VGVzdFVzZXIyQGVtYWlsLmNvbToxMjM0NTZBYSM='

        const options = {
          method: 'POST',
          headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${basicBase64}`,
          },
          data: qs.stringify(data),
          url:
            'https://csmember-suppliers-qa.auth.ap-southeast-1.amazoncognito.com/oauth2/token',
        }
        console.log(options)
        const response = await axios(options)
        console.log(response)
      } catch (error) {
        console.log(error.message)
      }
    },
  },
  created() {
    this.getUser()
    let url_string = window.location.href
    let url = new URL(url_string)
    let code = url.searchParams.get('code')
    this.code = code
    console.log('Code :', this.code)
  },
  mounted() {
    this.getCode()
  },
}
</script>
