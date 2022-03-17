<template>
  <base-layout pageTitle="Order Summary" :itemsFilter="lists">
    <v-container>
      <!-- <download-excel
        :data="lists"
        :fields="json_fields"
        :name="`${fileName}.xls`"
      >
        <v-btn icon>
          <v-icon>mdi-download</v-icon>
        </v-btn>
      </download-excel> -->
      <v-row dense>
        <order-sum-list
          v-for="(list, idxList) in lists"
          :key="idxList"
          :list="list"
          :size="size"
        />
      </v-row>
    </v-container>
  </base-layout>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import OrderSumList from '../components/OrderSumList.vue'
import { defaultFilter } from '../helper/filter'
// import axios from 'axios'

export default {
  components: {
    OrderSumList,
  },
  data: () => ({
    lists: [],
    reviewApi: null,
    size: 135,
    fileName:
      'Order Summary_' + moment(Date.now()).format('DD_MM_YYYY_hh_mm_ss'),
    json_fields: {
      campaignId: 'campaignId',
      campaignItemId: 'campaignItemId',
      effectiveStatus: 'effectiveStatus',
      effectiveTms: 'effectiveTms',
      expireTms: 'expireTms',
      nameEn: 'nameEn',
      nameTh: 'nameTh',
      priceFull: 'priceFull',
      priceNet: 'priceNet',
      sellOrder: 'sellOrder',
      sellPaid: 'sellPaid',
      sellStock: 'sellStock',
      couponUsed: 'couponUsed',
      thumbnailImg: 'thumbnailImg2',
    },
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
        const lists = orderSummary.data.map(this.getDisplay)
        this.lists = await defaultFilter(lists)
        // const reviewApi = this.lists.map((i) => i.reviewApi)
        // const { data } = await axios.get(reviewApi)
        // this.reviewApi = data
        // console.log('review api:', reviewApi[0])
        // console.log('lists api:', this.lists)

        // this.pagination.size = data.pagination.size
      } catch (error) {
        console.log(error)
      }
    },
    getDisplay(list) {
      if (list) {
        return {
          campaignItemId: list.items.map((x) => x.id),
          campaignId: list.campaignId,
          nameTh: list.items.map((x) => x.nameTh),
          nameEn: list.items.map((x) => x.nameEn),
          effectiveStatus: list.effectiveStatus,
          effectiveTms: moment(list.effectiveTms).format('D MMM YY'),
          expireTms: moment(list.expireTms).format('D MMM YY'),
          originEffectiveTms: moment(list.effectiveTms).unix(),
          originExpireTms: moment(list.expireTms).unix(),
          status:
            moment(list.expireTms).unix() > moment(Date.now()).unix()
              ? 'Active'
              : 'Period',
          thumbnailImg: list.thumbnailImg,
          items: list.items,
          // from items //
          priceFull: list.items.map((x) => x.priceFull),
          priceNet: list.items.map((x) => x.priceNet),
          sellOrder: list.items.map((x) => x.sellOrder),
          sellPaid: list.items.map((x) => x.sellPaid),
          sellStock: list.items.map((x) => x.sellStock),
          couponUsed: list.items.map((x) => x.couponUsed),
          thumbnailImg2: list.items.map((x) => x.thumbnailImg),
          reviewApi:
            list.reviewApi != null
              ? list.reviewApi
              : `https://cs-cms.jenosize.dev/api/v2/deal/review/${list.campaignId}`,
        }
      } else console.log('No data list')
    },
  },
}
</script>
