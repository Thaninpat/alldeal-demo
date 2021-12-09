<template>
  <base-layout pageTitle="Order Summary">
    <v-container>
      <order-summary-detail
        :lists="lists"
        :page="pagination.page"
        :size="pagination.size"
      />
    </v-container>
  </base-layout>
</template>

<script>
import moment from 'moment'
import axios from 'axios'
import OrderSummaryDetail from '../components/OrderSummaryDetail.vue'
import userDataService from '../service/userDataService'

export default {
  components: { OrderSummaryDetail },
  data: () => ({
    lists: [],
    reviewApi: null,
    pagination: {
      page: '',
      size: '',
    },
  }),
  mounted() {
    this.FetchData()
  },
  methods: {
    async FetchData() {
      try {
        const res = await userDataService.getOrderSummary()
        this.lists = res.data.map(this.getDisplay)

        const reviewApi = this.lists.map((i) => i.review_api)
        const { data } = await axios.get(reviewApi)
        this.reviewApi = data
        this.pagination.page = data.pagination.page
        this.pagination.size = data.pagination.size
      } catch (error) {
        console.log(error)
      }
    },
    getDisplay(list) {
      if (list) {
        return {
          campaign_id: list.campaign_id,
          name_th: list.name_th,
          effective_status: list.effective_status === 'Y' ? 'Active' : 'End',
          effective_tms: moment(list.effective_tms).format('D MMM YY'),
          expire_tms: moment(list.expire_tms).format('D MMM YY'),
          items: list.items,
          review_api: list.review_api,
        }
      } else console.log('No data list')
    },
  },
}
</script>
