<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-row no-gutters>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            {{ list.orderNumber }}
          </v-col>
          <v-col class="item-list d-flex justify-center align-center" cols="3">
            {{ list.paidTms }}
          </v-col>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.5"
          >
            {{ list.sum_amount }}
          </v-col>
          <v-col class="item-list d-flex justify-center align-center" cols="3">
            {{ list.customerId }}
          </v-col>
          <v-col
            class="item-list d-flex justify-end justify-sm-center align-center"
          >
            <v-icon
              v-if="list.status === 'order'"
              dense
              v-text="'$mdiCashCheck'"
            ></v-icon>
            <v-icon
              v-if="list.status === 'paid'"
              dense
              v-text="'$mdiCart'"
            ></v-icon>
            <v-icon
              v-if="list.status === 'refund'"
              dense
              v-text="'$mdiCashRefund'"
            ></v-icon>
            <v-icon v-else dense></v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col class="item-list-detail d-flex justify-start" cols="6">
            Channel: {{ list.channel_code }}
          </v-col>
          <v-col class="item-list-detail d-flex justify-start" cols="6">
            Payment: {{ list.paymentTypeCode }}
          </v-col>
        </v-row>
        <!-- <div v-for="(campaign, index) in campaigns" :key="index"> -->
        <!-- <v-row
            v-if="list.campaign_item_id[index] === campaign.id"
            class="pt-1"
          > -->
        <v-row class="pt-1">
          <v-col class="item-list d-flex justify-start pt-0" cols="1">
            <v-avatar size="25" tile>
              <v-img :src="list.thumbImageFileUrl"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="5">
            <span> {{ list.campaignItemNameTh }}</span>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="3">
            {{ list.price_net }}฿
          </v-col>
          <v-col class="item-list d-flex justify-end pt-0" cols="3">
            <v-icon
              v-if="list.quantity > 0"
              dense
              v-text="'$mdiTicket'"
            ></v-icon>
            <v-icon v-else dense></v-icon>
          </v-col>
        </v-row>
        <!-- </div> -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: ['list', 'idx', 'campaigns'],
  // props: {
  //   list: {
  //     type: Object,
  //   },
  //   amounts: {
  //     type: Object,
  //   },
  //   customers: {
  //     type: Object,
  //   },
  //   idx: {
  //     type: Number,
  //   },
  // },
}
</script>

<style lang="scss">
.item-list {
  font-size: 13px;
}
.item-list-detail {
  font-size: 10px;
}
</style>
