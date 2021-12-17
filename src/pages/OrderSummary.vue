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
// import axios from 'axios'
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
    getRequestParams(pageSize, pageNo) {
      let params = {}
      if (pageSize) {
        params['pageSize'] = pageSize
      }
      if (pageNo) {
        params['pageNo'] = pageNo
      }
      return params
    },
    async FetchData() {
      const params = await this.getRequestParams(4, 1)
      console.log('params: ', params)
      try {
        const resOrderSum = await userDataService.getOrderSummary()
        const resPaidOrder = await userDataService.getPaidOrderItems(params)
        console.log('Response orderS: ', resOrderSum)
        console.log('Response paidO: ', resPaidOrder)
        this.lists = resOrderSum.data.map(this.getDisplay)
        // const url =
        //   'https://ccufsf0ym3.execute-api.ap-southeast-1.amazonaws.com/qa/supplier/v1'
        // const idToken = localStorage.getItem('id_token')
        // console.log({ idToken })
        // const res = await axios.get(`${url}/ordersummary`, {
        //   headers: {
        //     'content-type': 'application/json',
        //     Authorization: `Bearer ${idToken}`,
        //   },
        // })

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
