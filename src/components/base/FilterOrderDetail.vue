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
            enterkeyhint="search"
            clearable
            autofocus
            dense
            outlined
          />
        </div>
        <div class="flex-items1">
          <v-text-field
            v-model="campaignItemName"
            label="Campaign Name"
            type="text"
            enterkeyhint="search"
            clearable
            outlined
            dense
          />
        </div>
        <div class="flex-items2">
          <v-text-field
            v-model="startDate"
            label="From"
            type="date"
            outlined
            dense
          />
        </div>
        <div class="flex-items2">
          <v-text-field
            v-model="endDate"
            label="To"
            type="date"
            outlined
            dense
          />
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="pb-4">
      <!-- <v-btn icon @click="clearFilter">
        <v-icon color="red darken-3">mdi-trash-can-outline</v-icon>
      </v-btn> -->
      <v-btn color="primary" text @click="clearAll">
        Clear all
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="clearFilter">
        Clear
      </v-btn>
      <v-btn
        color="primary"
        type="submit"
        text
        :disabled="!orderId && !startDate && !campaignItemName"
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
    campaignItemName: null,
    startDate: null,
    endDate: null,
    retrievedObject: null,
  }),
  props: ['pageTitle'],
  methods: {
    async submit() {
      const val = {
        orderId: this.orderId,
        campaignItemName: this.campaignItemName,
        startDate: this.startDate,
        endDate: this.endDate,
      }
      this.setLocalStorage(val)
      this.$emit('filter_order_detail', val)
      this.closedDialog()
    },
    clearField() {
      this.orderId = null
      this.campaignItemName = null
      this.startDate = null
      this.endDate = null
    },
    clearFilter() {
      this.removeLocalStorage()
      this.$emit('clear_filter', true)
      this.clearField()
      this.closedDialog()
    },
    clearAll() {
      this.removeLocalStorage()
      this.$emit('clear_all', true)
      this.clearField()
      this.closedDialog()
    },
    closedDialog() {
      this.$emit('closed_dialog', false)
      if (this.retrievedObject) {
        this.getResult()
      }
    },
    // ------------------- Manage data local storage -------------------------- //

    setLocalStorage(val) {
      localStorage.setItem('searchListFilter', JSON.stringify(val))
      // -------------- Retrieve the object from storage ---------------- //
      const retrievedObject = localStorage.getItem('searchListFilter')
      this.retrievedObject = JSON.parse(retrievedObject)
    },
    removeLocalStorage() {
      localStorage.removeItem('searchListFilter')
      this.retrievedObject = null
    },
    // ------------------- Manage data local storage -------------------------- //

    getResult() {
      this.orderId = this.retrievedObject.orderId
      this.campaignItemName = this.retrievedObject.campaignItemName
      this.startDate = this.retrievedObject.startDate
      this.endDate = this.retrievedObject.endDate
    },
  },
}
</script>
