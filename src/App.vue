<template>
  <v-app>
    <v-snackbar bottom right :value="updateExists" :timeout="0" color="primary">
      An update is available
      <v-btn text @click="refreshApp">
        Update
      </v-btn>
    </v-snackbar>
    <router-view></router-view>
  </v-app>
</template>

<script>
import update from './mixins/update'
export default {
  name: 'App',
  mixins: [update],
  data() {
    return {
      chartdata: null,
    }
  },
}
</script>
