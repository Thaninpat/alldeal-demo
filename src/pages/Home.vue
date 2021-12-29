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
      <Dashboard />
    </v-container>
  </base-layout>
</template>

<script>
import update from '../mixins/update'
import Dashboard from '../components/Dashboard'

export default {
  name: 'Home',
  components: {
    Dashboard,
  },
  mixins: [update],
  data: () => ({
    snackbar: false,
    code: null,
    token: {
      id_token: '',
      access_token: '',
      refresh_token: '',
    },
  }),
  mounted() {
    let url_string = window.location.href
    let url = new URL(url_string)
    let code = url.searchParams.get('code')
    if (code) {
      this.$router.push('/home')
    }
  },
}
</script>
