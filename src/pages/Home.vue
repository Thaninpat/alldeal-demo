<template>
  <base-layout pageTitle="(PWA)v3.0.5.5">
    <div class="text-center ma-2">
      <v-snackbar
        rounded="pill"
        outlined
        color="warning"
        :value="updateExists"
        :timeout="0"
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
  data: () => ({
    snackbar: false,
    text: `Hello, I'm a snackbar`,
  }),
}
</script>
