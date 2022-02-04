<template>
  <form @submit.prevent="submit">
    <v-toolbar dark color="hsl(210, 100%, 27%)">
      <v-btn icon dark @click="closedDialog">
        <v-icon v-text="'$Close'" />
      </v-btn>
      <v-toolbar-title>Filters</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-subheader>{{ pageTitle }}</v-subheader>
    </v-toolbar>
    <v-card-text class="px-3">
      <div class="flex-container">
        <div class="flex-items1">
          <v-text-field
            v-model="orderId"
            label="Order Id"
            type="text"
            clearable
            autofocus
            dense
          />
        </div>
        <div class="flex-items2">
          <v-text-field v-model="startDate" label="From" type="date" />
        </div>
        <div class="flex-items2">
          <v-text-field v-model="endDate" label="To" type="date" />
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="pb-4">
      <v-btn icon @click="clearFilter">
        <v-icon color="red darken-3">mdi-trash-can-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="clearField">
        Clear
      </v-btn>
      <v-btn
        color="primary"
        type="submit"
        text
        :disabled="!orderId && !startDate"
      >
        submit
      </v-btn>
    </v-card-actions>
  </form>
</template>

<script>
export default {
  data: () => ({
    orderId: null,
    startDate: null,
    endDate: null,
  }),
  props: ['dialog', 'pageTitle'],
  methods: {
    async submit() {
      const val = {
        orderId: this.orderId,
        startDate: this.startDate,
        endDate: this.endDate,
      }
      this.$emit('filter_order_detail', val)
      this.clearField()
      this.closedDialog()
    },
    clearField() {
      this.orderId = null
      this.startDate = null
      this.endDate = null
    },
    clearFilter() {
      this.$emit('clear_filter', true)
      this.clearField()
      this.closedDialog()
    },
    closedDialog() {
      this.$emit('closed_dialog', false)
    },
  },
}
</script>
