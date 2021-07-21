<template>
  <base-layout pageTitle="Order Detail">
    <v-row class="pa-6" no-gutters>
      <order-detail-header v-for="(item, i) in items" :key="i" :item="item" />
    </v-row>
    <order-detail-lists
      v-for="(list, idx) in lists.order.length"
      :key="idx"
      :lists="lists"
      :idx="idx"
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
    lists: {
      order: [],
      paidDate: [],
      amount: [],
      customer: [],
      status: [],
      chanel: [],
      payment: [],
    },
  }),
  mounted() {
    this.Fetch()
  },
  methods: {
    async Fetch() {
      try {
        const { data } = await axios.get('/data/order.json/')

        this.lists.order = data.map((item) => item.orderNo)
        this.lists.paidDate = data.map((item) => item.paidDate)
        this.lists.amount = data.map((item) => item.netPrice)
        this.lists.customer = data.map((cus) => this.CuttingWord(cus.customer))
        this.lists.status = data.map((item) => item.status)
        this.lists.chanel = data.map((item) => item.chanel)
        this.lists.payment = data.map((item) => item.payment)
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
