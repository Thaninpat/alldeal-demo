<template>
  <v-col class="pa-0" cols="12" md="10">
    <v-card class="ma-1">
      <div class="d-flex flex-no-wrap justify-start">
        <v-avatar class="ma-3 mx-md-10" size="110" tile>
          <v-img
            :src="orderItems ? orderItems.orderImgUrl : '/img/thumbnail.png'"
          ></v-img>
        </v-avatar>
        <div class="py-4 ml-2">
          <v-row>
            <v-col cols="5" md="3">Redemption Code </v-col>
            <v-col cols="7">{{ value.couponCode }}</v-col>

            <v-col cols="5" md="3">Order No</v-col>
            <v-col cols="7">{{ value.orderNo }}</v-col>

            <v-col cols="5" md="3">Item ID </v-col>
            <v-col cols="7">{{ orderItems.orderItemId }}</v-col>

            <v-col cols="5" md="3">Name</v-col>
            <v-col cols="7">{{ orderItems.orderName }}</v-col>

            <v-col cols="5" md="3">Price</v-col>
            <v-col cols="7">{{ orderItems.orderPrice }} ฿</v-col>

            <v-col cols="5" md="3">Status</v-col>
            <v-col cols="7">{{ value.status }}</v-col>

            <v-col cols="5" md="3">Paid Date</v-col>
            <v-col cols="7">{{ orderItems.orderPaidTms }}</v-col>

            <v-col cols="5" md="3">Expire Date</v-col>
            <v-col cols="7">{{ value.redeemEndTms }}</v-col>

            <v-col cols="5" md="3">Used Date</v-col>
            <v-col cols="7">{{ value.redeemedTms }}</v-col>
          </v-row>
          <div class="mt-6">
            <dialog-btn
              v-if="value.status !== 'Used'"
              class="justify-center"
              :status="value.status"
              @isUsed="isUsed(value.couponCode)"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import DialogBtn from './DialogBtn.vue'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  components: { DialogBtn },
  props: {
    value: {
      type: Object,
    },
  },
  data: () => ({
    orderItems: '',
  }),
  mounted() {
    console.log('Value: ', this.value.couponCode)
    if (this.value != null) {
      this.getOrderDetail()
    }
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
    getRequestParams(orderNo) {
      let params = {}
      if (orderNo) {
        params['orderNo'] = orderNo
      }
      return params
    },

    async getOrderDetail() {
      const params = await this.getRequestParams(this.value.orderNo)
      try {
        await this.getOrders({
          path: '/paidorderitems',
          method: 'GET',
          params,
        })
        let paidOrderItems = this.orders.data.orders
        console.log('paid order: ', paidOrderItems)

        paidOrderItems = paidOrderItems.map((i) => ({
          orderItemId: i.campaignItemId,
          orderName: i.campaignItemNameEn
            ? i.campaignItemNameEn
            : i.campaignItemNameTh,
          orderPrice: i.priceNet,
          orderPaidTms: moment(i.paidTms).format('DD/MM/YY hh:mm'),
          orderImgUrl: i.thumbImageFileUrl,
        }))
        this.orderItems = paidOrderItems[0]
        console.log(this.orderItems)
      } catch (error) {
        console.log(error)
      }
    },
    isUsed(couponCode) {
      this.$emit('isUsed', couponCode)
    },
  },
}
</script>

<style lang="scss" scoped>
.col-md-3.col-5,
.col.col-5,
.col.col-7 {
  padding: 1px 0;
  font-size: 12px;
  font-weight: bold;
}
</style>
