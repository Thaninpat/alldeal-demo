<template>
  <base-layout
    pageTitle="Order Summary"
    :itemsFilter="lists"
    :filterLists="filterLists"
  >
    <v-container>
      <order-sum-list :lists="lists" :size="size" />
    </v-container>
  </base-layout>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import OrderSumList from '../components/OrderSumList'

export default {
  components: {
    OrderSumList,
  },
  data: () => ({
    lists: [],
    reviewApi: null,
    size: 135,
    filterLists: ['Id', 'Name', 'Date'],
  }),
  mounted() {
    this.FetchData()
  },
  computed: {
    ...mapGetters({
      orders: 'supplier/orders',
    }),
  },
  methods: {
    ...mapActions({
      getOrders: 'supplier/getOrders',
    }),
    async FetchData() {
      try {
        await this.getOrders({ path: '/ordersummary', method: 'GET' })
        let orderSummary = this.orders
        this.lists = orderSummary.data.map(this.getDisplay)

        // const reviewApi = this.lists.map((i) => i.reviewApi)
        // const { data } = await axios.get(reviewApi)
        // this.reviewApi = data
        // this.pagination.size = data.pagination.size
      } catch (error) {
        console.log(error)
      }
    },
    getDisplay(list) {
      if (list) {
        return {
          campaignId: list.campaignId,
          nameTh: list.nameTh,
          effectiveStatus: list.effectiveStatus === 'Y' ? 'Active' : 'End',
          effectiveTms: moment(list.effectiveTms).format('D MMM YY'),
          expireTms: moment(list.expireTms).format('D MMM YY'),
          thumbnailImg: list.thumbnailImg,
          items: list.items,
          reviewApi: list.reviewApi,
        }
      } else console.log('No data list')
    },
  },
}
</script>
