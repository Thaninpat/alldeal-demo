<template>
  <base-layout pageTitle="v3.0.4">
    <v-container>
      <vue-chart />
    </v-container>
  </base-layout>
</template>

<script>
import VueChart from '../components/VueChart.vue'
export default {
  name: 'Home',
  components: { VueChart },
}
</script>
