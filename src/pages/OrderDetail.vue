<template>
  <base-layout pageTitle="Order Detail">
    <v-row class="pa-3" no-gutters>
      <order-detail-header v-for="(item, i) in items" :key="i" :item="item" />
    </v-row>
    <order-detail-lists
      v-for="(list, idx) in lists"
      :key="idx"
      :idx="idx"
      :list="list"
      :amounts="amounts"
      :customers="customers"
    />
  </base-layout>
</template>

<script>
import axios from 'axios'
import OrderDetailLists from '../components/OrderDetailLists.vue'
import OrderDetailHeader from '../components/OrderDetailHeader.vue'
export default {
  components: { OrderDetailLists, OrderDetailHeader },
  data: () => ({
    date: null,
    items: [
      { name: 'Order No' },
      { name: 'Paid Date' },
      { name: 'Amount' },
      { name: 'Customer' },
      { name: 'Status' },
    ],
    lists: [],
    netPrices: [],
    amounts: [],
    customers: [],
  }),
  mounted() {
    this.Fetch()
  },
  methods: {
    async Fetch() {
      try {
        const { data } = await axios.get('/data/order.json/')
        this.lists = data
        this.netPrices = this.lists.map((i) => i.items.map((j) => j.netPrice))
        this.amounts = this.netPrices.map((i) =>
          i.reduce((acc, curr) => acc + curr)
        )
        this.customers = data.map((i) => this.CuttingWord(i.customer))
      } catch (error) {
        console.log(error)
      }
    },
    CuttingWord(src) {
      try {
        if (src) {
          let idx = src.length
          if (idx > 9) {
            return (src = src.slice(0, 9) + '...')
          } else {
            return (src = src.slice(0, 9))
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
