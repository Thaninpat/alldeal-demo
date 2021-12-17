<template>
  <base-layout pageTitle="Order Summary">
    <v-container>
      <order-summary-detail :lists="lists" :size="size" />
    </v-container>
  </base-layout>
</template>

<script>
import moment from 'moment'
import OrderSummaryDetail from '../components/OrderSummaryDetail.vue'
import userDataService from '../service/userDataService'

export default {
  components: { OrderSummaryDetail },
  data: () => ({
    lists: [],
    reviewApi: null,
    size: 150,
  }),
  mounted() {
    this.FetchData()
  },
  methods: {
    async FetchData() {
      try {
        const res = await userDataService.getOrderSummary()
        this.lists = res.data.map(this.getDisplay)

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
