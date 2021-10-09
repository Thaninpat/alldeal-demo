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
export default {
  name: 'Home',
  components: { VueChart },
  mixins: [update],
  data: () => ({
    snackbar: false,
    text: `Hello, I'm a snackbar`,
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
  },
  created() {
    this.getUser()
  },
  // Update() {
  //   let roles = this.user.data
  //   this.role = roles
  //   console.log('Updated roles: ', roles)
  //   console.log('Updated user.data: ', this.user.data)
  //   console.log('Updated this.role: ', this.role)
  // },
}
</script>
