<template>
  <v-row justify="space-around">
    <v-col>
      <v-dialog
        v-model="dialog"
        max-width="650"
        transition="dialog-top-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon v-text="dialog ? '$FilterClose' : '$Filter'" />
          </v-btn>
        </template>
        <FilterDisplay
          @closed_dialog="closedDialog"
          @clear_filter="clearFilter"
          @clear_all="clearAll"
          @filterD="filterB"
          :pageTitle="pageTitle"
        />
      </v-dialog>
    </v-col>
  </v-row>
</template>

<script>
import FilterDisplay from './FilterDisplay.vue'
export default {
  components: { FilterDisplay },
  props: ['filterLists', 'pageTitle'],
  data: () => ({ dialog: false, filtered: false, campaignId: null }),
  methods: {
    async filterB(val) {
      this.$emit('filterB', val)
    },
    closedDialog(val) {
      this.dialog = val
    },
    clearFilter(val) {
      this.$emit('clear_filter', val)
    },
    clearAll(val) {
      this.$emit('clear_all', val)
    },
    // checkParam() {
    //   let url_string = window.location.href
    //   let url = new URL(url_string)
    //   this.campaignId = url.searchParams.get('campaignItemId')
    // },
  },
}
</script>
