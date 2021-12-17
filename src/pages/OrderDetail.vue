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
        v-model="pageNo"
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
// import userDataService from '../service/userDataService'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

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
    pageNo: 1,
    totalPages: 0,
    pageSize: 4,
  }),
  mounted() {
    this.Fetch()
  },
  computed: {
    ...mapGetters({
      supplier: 'supplier/supplier',
    }),
  },
  methods: {
    ...mapActions({
      getSupplier: 'supplier/getSupplier',
    }),
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
    async Fetch() {
      const params = await this.getRequestParams(this.pageSize, this.pageNo)
      try {
        // Orders
        await this.getSupplier({
          path: '/paidorderitems',
          params,
        })
        let paidOrderItems = this.supplier
        console.log({ paidOrderItems })
        this.lists = paidOrderItems.data.orders.map(this.getDisplay)
        console.log('lists', this.lists)
        this.totalPages = paidOrderItems.data.totalPage

        // const res = await userDataService.getOrder(params)
        // this.lists = res.data.map(this.getDisplay)
        // const totalItems = parseInt(res.headers['x-total-count'])
        // this.totalPages = Math.ceil(totalItems / this.pageSize)

        // Campaigns
        // const { data } = await userDataService.getCampaign()
        // this.campaigns = data
      } catch (error) {
        console.log(error)
      }
    },
    getDisplay(list) {
      if (list) {
        return {
          orderNumber: '...' + list.orderNumber.toString().substr(-7),
          paidTms: moment(list.paidTms).format('DD/MM/YY hh:mm'),
          thumbImageFileUrl: list.thumbImageFileUrl,
          // sum_amount: list.sum_amount,
          customer_id: list.customerId,
          // status: 'paid',
          // channel_code: list.channel_code,
          paymentTypeCode: list.paymentTypeCode,
          campaignItemNameTh: list.campaignItemNameTh,
          // campaign_item_id: list.items.map((i) => i.campaign_item_id),
          // quantity: list.items.map((i) => i.quantity),
          // name: list.name.substr(0, 9) + '...',
          // status: list.published ? 'Published' : 'Pending',
        }
      } else console.log('No data list')
    },

    handlePageChange(value) {
      this.pageNo = value
      this.Fetch()
    },
  },
}
</script>
