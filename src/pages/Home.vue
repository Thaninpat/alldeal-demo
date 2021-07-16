<template>
  <base-layout>
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
