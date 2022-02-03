<template>
  <v-row>
    <v-col
      class="d-flex justify-center justify-sm-end justify-md-end"
      cols="2.5"
    >
      <label class="title_header">OrderId</label>
    </v-col>
    <v-col class="d-flex justify-center" cols="3.5">
      <label
        text
        @click="handleClick('paidDate')"
        class="title_header"
        id="paid_date"
      >
        Paid Date
        <v-icon
          :class="sortPaidDate == null ? 'arrow-icon' : 'arrow-icon active'"
          v-text="sortPaidDate ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        ></v-icon>
      </label>
    </v-col>
    <v-col class="d-flex justify-center" cols="3.5">
      <label
        text
        @click="handleClick('amount')"
        class="title_header"
        id="amount"
      >
        Amount
        <v-icon
          :class="sortAmount == null ? 'arrow-icon' : 'arrow-icon active'"
          v-text="sortAmount ? 'mdi-chevron-up' : 'mdi-chevron-down'"
        ></v-icon>
      </label>
    </v-col>
    <v-col class="d-flex justify-center" cols="2">
      <label class="title_header">Status</label>
    </v-col>
  </v-row>
</template>

<script>
import { Filter } from '../helper/filter'

export default {
  props: {
    itemSorting: {
      type: Array,
      default: null,
    },
  },
  data: () => ({
    sortPaidDate: null,
    sortAmount: null,
  }),

  methods: {
    async Sorting(values) {
      await Filter({ values, items: this.itemSorting })
    },
    handleClick(val) {
      if (val === 'paidDate') {
        if (this.sortPaidDate == false) {
          this.sortPaidDate = null
          const values = { sort: this.sortPaidDate, sortby: val }
          this.Sorting(values)
        } else {
          this.sortPaidDate = !this.sortPaidDate
          const values = { sort: this.sortPaidDate, sortby: val }
          this.Sorting(values)
        }
        this.sortAmount = null
      }
      if (val === 'amount') {
        if (this.sortAmount == false) {
          this.sortAmount = null
          const values = { sort: this.sortAmount, sortby: val }
          this.Sorting(values)
        } else {
          this.sortAmount = !this.sortAmount
          const values = { sort: this.sortAmount, sortby: val }
          this.Sorting(values)
        }
        this.sortPaidDate = null
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.title_header {
  font-size: 14px;
  font-weight: 600;
}
#paid_date,
#amount {
  cursor: pointer;
}
.arrow-icon {
  color: rgba(255, 255, 255, 0);
  cursor: pointer;
}
.active {
  color: rgb(0, 0, 0);
}
.title_header:hover .arrow-icon {
  color: rgb(189, 189, 189);
}
.title_header:hover .arrow-icon.active {
  color: rgb(0, 0, 0);
}
</style>
