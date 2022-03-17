<template>
  <v-card>
    <FilterOrderDetail
      v-if="pageTitle === 'Order Detail'"
      @clear_field="clearField"
      @clear_filter="clearFilter"
      @clear_all="clearAll"
      @closed_dialog="closedDialog"
      @filter_order_detail="filterD"
      :pageTitle="pageTitle"
    />
  </v-card>
</template>
<script>
import FilterOrderDetail from './FilterOrderDetail.vue'
export default {
  components: {
    FilterOrderDetail,
  },
  data: () => ({
    orderId: null,
    campaignItemName: null,
    startDate: null,
    endDate: null,
  }),
  props: ['pageTitle'],
  methods: {
    async filterD(val) {
      this.$emit('filterD', val)
    },
    clearField() {
      this.orderId = null
      this.campaignItemName = null
      this.startDate = null
      this.endDate = null
    },
    clearFilter(val) {
      this.$emit('clear_filter', val)
    },
    clearAll(val) {
      this.$emit('clear_all', val)
    },
    closedDialog(val) {
      this.$emit('closed_dialog', val)
    },
  },
}
</script>
<style lang="scss">
.filter-header {
  background-color: hsl(210, 100%, 27%);
}
.flex-container {
  padding: 0;
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
@media only screen and (min-width: 410px) {
  .flex-container {
    justify-content: space-between;
  }
  .flex-items2 {
    width: 45%;
  }
}
</style>
