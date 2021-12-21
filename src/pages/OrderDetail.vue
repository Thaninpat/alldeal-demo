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
    }),
  },
  methods: {
    ...mapActions({
      getOrders: 'supplier/getOrders',
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
        let paidOrderItems = this.orders
        this.lists = paidOrderItems.data.orders.map(this.getDisplay)
        this.totalPages = paidOrderItems.data.totalPage
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
          thumbImageFileUrl: list.thumbImageFileUrl,
          customer_id: list.customerId,
          status: 'paid',
          paymentTypeCode: list.paymentTypeCode,
          campaignItemNameTh: list.campaignItemNameTh,
          quantity: list.quantity,
          // status: list.published ? 'Published' : 'Pending',
        }
      } else console.log('No data list')
    },

    handlePageChange(value) {
      this.pageNo = value
      this.FetchPaidOrder()
    },
  },
}
</script>
