<template>
  <base-layout
    pageTitle="Order Detail"
    :itemsFilter="lists"
    @response_filter="responseFilter"
    @clear_filter="clearFilter"
    @clear_all="clearAll"
    activated_filter
  >
    <!-- <v-row class="pa-3" no-gutters>
      <order-detail-header :itemSorting="lists" />
    </v-row>
    <order-detail-lists :lists="lists" /> -->
    <OrderDetailListItem :lists="lists" />
    <div class="text-center mt-4">
      <v-pagination
        v-model="pageNo"
        :length="totalPages"
        :total-visible="7"
        @input="handlePageChange"
      ></v-pagination>
    </div>
  </base-layout>
</template>

<script>
// import OrderDetailLists from '../components/OrderDetailLists.vue'
// import OrderDetailHeader from '../components/OrderDetailHeader.vue'
import OrderDetailListItem from '../components/OrderDetailListItem.vue'
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  components: {
    // OrderDetailLists,
    // OrderDetailHeader,
    OrderDetailListItem,
  },
  data: () => ({
    date: null,
    items: [
      { name: 'OrderId' },
      { name: 'Paid Date' },
      { name: 'Amount' },
      { name: 'Status' },
    ],
    lists: [],
    campaignItemId: [],
    pageNo: 1,
    totalPages: 0,
    pageSize: 10,
    result: {
      orderNo: null,
      campaignItemName: null,
      startDate: null,
      endDate: null,
      campaignId: null,
    },
  }),

  mounted() {
    let url_string = window.location.href
    let url = new URL(url_string)
    this.result.campaignId = url.searchParams.get('campaignItemId')
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
    getRequestParams(
      campaignId,
      pageSize,
      pageNo,
      orderNo,
      campaignItemName,
      startDate,
      endDate
    ) {
      let params = {}
      if (campaignId) {
        params['campaignItemId'] = campaignId
      }
      if (pageSize) {
        params['pageSize'] = pageSize
      }
      if (pageNo) {
        params['pageNo'] = pageNo
      }
      if (orderNo) {
        params['orderNo'] = orderNo
      }
      if (campaignItemName) {
        params['likeCampaignItemName'] = campaignItemName
      }
      if (startDate) {
        params['paidTmsFrom'] = startDate
      }
      if (endDate) {
        params['paidTmsTo'] = endDate
      }
      return params
    },
    async FetchPaidOrder() {
      const params = await this.getRequestParams(
        parseInt(this.result.campaignId),
        this.pageSize,
        this.pageNo,
        this.result.orderNo,
        this.result.campaignItemName,
        this.result.startDate,
        this.result.endDate
      )
      console.log('params: ', params)
      try {
        // Order Items
        await this.getOrders({
          path: '/paidorderitems',
          method: 'GET',
          params,
        })
        let paidOrderItems = this.orders.data.orders
        this.totalPages = this.orders.data.totalPage
        if (paidOrderItems) {
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
        } else {
          return
        }
        // console.log('Display campaigns: ', campaigns)
        // console.log('Display displayItems: ', displayItems)
        // console.log('Display this.lists: ', this.lists)
      } catch (error) {
        console.log(error)
      }
    },

    getDisplay(list, index) {
      if (list) {
        return {
          uid: `${index}${Date.now()}`,
          orderId: list.orderNumber,
          campaignItemId: list.campaignItemId,
          customerId: list.customerId,
          orderNumber: list.orderNumber,
          // window.screen.availWidth > 450
          //   ? list.orderNumber
          //   : '...' + list.orderNumber.toString().slice(-7),
          originalTms: list.paidTms,
          paidTms: moment(list.paidTms).format('DD/MM/YY HH:mm'),
          status: list.paidTms ? 'paid' : 'unpaid',
          paymentTypeCode: list.paymentTypeCode,
          campaignItemNameTh: list.campaignItemNameTh,
          quantity: list.quantity,
          thumbImageFileUrl: list.thumbImageFileUrl,
          amount: list.campaigns.priceFull * list.quantity,
          campaigns: list.campaigns,
        }
      } else console.log('No data list')
    },

    handlePageChange(value) {
      // console.log({ value })
      this.pageNo = value
      this.FetchPaidOrder()
    },
    responseFilter(val) {
      console.log('val response: ', val)
      this.result.orderNo = val.orderId
      this.result.campaignItemName = val.campaignItemName
      this.result.startDate = val.startDate ? Date.parse(val.startDate) : null
      this.result.endDate = val.endDate ? Date.parse(val.endDate) : null
      this.pageNo = 1
      this.FetchPaidOrder()
    },
    clearFilter(val) {
      if (val == true) {
        this.result.orderNo = null
        this.result.campaignItemName = null
        this.result.startDate = null
        this.result.endDate = null
        this.pageNo = 1
        this.FetchPaidOrder()
      }
    },
    clearAll(val) {
      if (val == true) {
        if (this.result.campaignId != null) {
          this.$router.push('/order-detail').catch((err) => {
            if (
              err.name !== 'NavigationDuplicated' &&
              !err.message.includes(
                'Avoided redundant navigation to current location'
              )
            ) {
              console.error(err)
            }
          })
        }
        this.result.orderNo = null
        this.result.campaignItemName = null
        this.result.startDate = null
        this.result.endDate = null
        this.result.campaignId = null
        this.pageNo = 1
        this.FetchPaidOrder()
      }
    },
  },
}
</script>
