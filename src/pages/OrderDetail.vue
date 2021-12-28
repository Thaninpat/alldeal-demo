<template>
  <base-layout pageTitle="Order Detail">
    <v-row class="pa-3" no-gutters>
      <order-detail-header v-for="(item, i) in items" :key="i" :item="item" />
    </v-row>
    <order-detail-lists :lists="lists" />
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
    campaignItemId: [],
    pageNo: 1,
    totalPages: 0,
    pageSize: 4,
  }),
  mounted() {
    this.FetchPaidOrder()
  },
  computed: {
    ...mapGetters({
      orders: 'supplier/orders',
      campaignItems: 'supplier/campaignItems',
    }),
  },
  methods: {
    ...mapActions({
      getOrders: 'supplier/getOrders',
      getCampaignItems: 'supplier/getCampaignItems',
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
    async FetchPaidOrder() {
      const params = await this.getRequestParams(this.pageSize, this.pageNo)
      try {
        // Order Items
        await this.getOrders({
          path: '/paidorderitems',
          method: 'GET',
          params,
        })
        let paidOrderItems = this.orders.data.orders
        this.totalPages = this.orders.data.totalPage

        const promises = paidOrderItems.map(async (item) => {
          if (item) {
            // Have Array[item.campaignItemId] must 2loop
            await this.getCampaignItems({
              path: `/campaignitems/${item.campaignItemId}`,
            })
            let campaignItem = { campaigns: this.campaignItems.data }
            let inputToItem = Object.assign(item, campaignItem)
            return inputToItem
          }
        })
        const campaigns = await Promise.all(promises)
        const displayItems = campaigns.map(this.getDisplay)
        this.lists = displayItems
        // console.log('Display campaigns: ', campaigns)
        // console.log('Display displayItems: ', displayItems)
        // console.log('Display this.lists: ', this.lists)
      } catch (error) {
        console.log(error)
      }
    },

    getDisplay(list) {
      if (list) {
        return {
          campaignItemId: list.campaignItemId,
          customerId: list.customerId,
          orderNumber: '...' + list.orderNumber.toString().substr(-7),
          paidTms: moment(list.paidTms).format('DD/MM/YY hh:mm'),
          status: 'paid',
          paymentTypeCode: list.paymentTypeCode,
          campaignItemNameTh: list.campaignItemNameTh,
          quantity: list.quantity,
          thumbImageFileUrl: list.thumbImageFileUrl,
          campaigns: list.campaigns,
        }
      } else console.log('No data list')
    },

    handlePageChange(value) {
      console.log({ value })
      this.pageNo = value
      this.FetchPaidOrder()
    },
  },
}
</script>
