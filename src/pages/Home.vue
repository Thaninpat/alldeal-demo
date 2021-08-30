<template>
  <base-layout pageTitle="(PWA)v3.0.5.1">
    <v-snackbar bottom right :value="updateExists" :timeout="0" color="primary">
      An update is available
      <v-btn text @click="refreshApp">
        Update
      </v-btn>
    </v-snackbar>
    <v-container>
      <vue-chart />
    </v-container>
  </base-layout>
</template>

<script>
import update from '../mixins/update'
import VueChart from '../components/VueChart.vue'
export default {
  name: 'Home',
  components: { VueChart },
  mixins: [update],
}
</script>
