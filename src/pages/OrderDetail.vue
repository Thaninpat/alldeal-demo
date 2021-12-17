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
      :campaigns="campaigns"
    />
    <div class="text-center mt-4">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        total-visible="7"
        @input="handlePageChange"
      ></v-pagination>
    </div>
  </base-layout>
</template>

<script>
import OrderDetailLists from '../components/OrderDetailLists.vue'
import OrderDetailHeader from '../components/OrderDetailHeader.vue'
import userDataService from '../service/userDataService'
import moment from 'moment'

export default {
  components: {
    OrderDetailLists,
    OrderDetailHeader,
  },
  data: () => ({
    date: null,
    items: [
      { name: 'OrderId' },
      { name: 'Paid Date' },
      { name: 'Amount' },
      { name: 'Customer' },
      { name: 'Status' },
    ],
    lists: [],
    campaigns: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 4,
  }),
  mounted() {
    this.Fetch()
  },
  methods: {
    getRequestParams(currentPage, pageSize) {
      let params = {}
      if (currentPage) {
        params['_page'] = currentPage
      }
      if (pageSize) {
        params['_limit'] = pageSize
      }
      return params
    },
    async Fetch() {
      const params = await this.getRequestParams(
        this.currentPage,
        this.pageSize
      )
      try {
        // Orders
        const res = await userDataService.getOrder(params)
        this.lists = res.data.map(this.getDisplay)
        const totalItems = parseInt(res.headers['x-total-count'])
        this.totalPages = Math.ceil(totalItems / this.pageSize)
        // Campaigns
        const { data } = await userDataService.getCampaign()
        this.campaigns = data
      } catch (error) {
        console.log(error)
      }
    },
    getDisplay(list) {
      if (list) {
        return {
          order_no: '...' + list.order_no.toString().substr(-7),
          paid_tms: moment(list.paid_tms).format('DD/MM/YY hh:mm'),
          sum_amount: list.sum_amount,
          customer_id: list.customer_id,
          status: 'paid',
          channel_code: list.channel_code,
          paymen_type_code: list.paymen_type_code,
          campaign_item_id: list.items.map((i) => i.campaign_item_id),
          quantity: list.items.map((i) => i.quantity),
          // name: list.name.substr(0, 9) + '...',
          // status: list.published ? 'Published' : 'Pending',
        }
      } else console.log('No data list')
    },

    handlePageChange(value) {
      this.currentPage = value
      // this.Fetch()
    },
  },
}
</script>
