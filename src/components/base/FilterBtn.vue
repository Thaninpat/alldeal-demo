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
  data: () => ({ dialog: false, filtered: false }),
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
  },
}
</script>
