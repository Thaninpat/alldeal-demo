<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(list, idxList) in lists" :key="idxList">
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
            <label
              v-text="
                list.campaigns.priceFull ? list.campaigns.priceFull + '฿' : ''
              "
            ></label>
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
            <label
              v-text="list.channel ? 'Channel: ' + list.channel : 'Channel: -'"
            ></label>
          </v-col>
          <v-col class="item-list-detail d-flex justify-start" cols="6">
            Payment: {{ list.paymentTypeCode }}
          </v-col>
        </v-row>
        <!-- <div v-for="(campaign, idxCampaign) in campaigns" :key="idxCampaign"> -->
        <!-- <v-row
            v-if="list.campaign_item_id[index] === campaign.id"
            class="pt-1"
          > -->
        <v-row class="pt-1">
          <v-col class="item-list d-flex justify-start pt-0" cols="1">
            <v-avatar size="30" tile>
              <v-img
                :src="
                  list.campaigns.thumbnailImg
                    ? list.campaigns.thumbnailImg
                    : list.thumbImageFileUrl
                "
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="5">
            <span> {{ list.campaignItemNameTh }}</span>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="3">
            <label
              v-text="
                list.campaigns.priceNet ? list.campaigns.priceNet + '฿' : ''
              "
            ></label>
          </v-col>
          <v-col class="item-list d-flex justify-end pt-0" cols="3">
            <v-icon
              dense
              v-text="list.quantity > 0 ? '$mdiTicket' : ''"
            ></v-icon>
          </v-col>
        </v-row>
        <!-- </div> -->
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  // props: ['lists'],
  props: {
    lists: {
      type: Array,
    },
  },
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
