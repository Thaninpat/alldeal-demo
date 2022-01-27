<template>
  <v-card>
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
        <v-container>
          <div class="flex-container">
            <div class="flex-items1">
              <v-text-field
                v-model="orderId"
                label="Order Id"
                type="text"
                height="25"
                clearable
                autofocus
              ></v-text-field>
            </div>
            <div class="flex-items2">
              <v-text-field
                v-model="startDate"
                label="From"
                type="date"
                height="25"
                disabled
              ></v-text-field>
            </div>
            <div class="flex-items2">
              <v-text-field
                v-model="endDate"
                label="To"
                type="date"
                height="25"
                disabled
              ></v-text-field>
            </div>
          </div>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-btn icon @click="clearFilter">
          <v-icon color="error">mdi-trash-can-outline</v-icon>
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
  </v-card>
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
      console.log(val)
      this.$emit('filterD', val)
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
<style lang="scss" scoped>
.filter-header {
  background-color: hsl(210, 100%, 27%);
}
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
.flex-items1 {
  width: 100%;
  margin: 2px;
}
.flex-items2 {
  width: 100%;
  margin: 2px;
}
@media only screen and (min-width: 425px) {
  .flex-container {
    justify-content: space-between;
  }
  .flex-items2 {
    width: 45%;
  }
}
</style>
