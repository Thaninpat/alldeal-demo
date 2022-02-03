<template>
  <v-card>
    <FilterOrderDetail
      v-if="pageTitle === 'Order Detail'"
      @clear_field="clearField"
      @clear_filter="clearFilter"
      @closed_dialog="closedDialog"
      @filter_order_detail="filterD"
      :dialog="dialog"
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
    startDate: null,
    endDate: null,
  }),
  props: ['dialog', 'pageTitle'],
  methods: {
    async filterD(val) {
      console.log(val)
      this.$emit('filterD', val)
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
