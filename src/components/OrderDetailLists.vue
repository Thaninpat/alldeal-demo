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
            {{ campaigns.priceFull }}
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
            Channel: -
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
            <v-avatar size="25" tile>
              <v-img :src="campaigns.thumbnailImg"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="5">
            <span> {{ campaigns.campaignItemNameTh }}</span>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="3">
            {{ campaigns.priceNet }}฿
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
import { mapActions, mapGetters } from 'vuex'

export default {
  props: ['list', 'idx'],
  data: () => ({
    campaigns: [],
  }),
  mounted() {
    this.FetchCampaignItems()
  },
  computed: {
    ...mapGetters({
      campaignItems: 'supplier/campaignItems',
    }),
  },
  methods: {
    ...mapActions({
      getCampaignItems: 'supplier/getCampaignItems',
    }),
    async FetchCampaignItems() {
      try {
        if (this.list && this.list.campaignItemId) {
          let campaignId = this.list.campaignItemId
          await this.getCampaignItems({
            path: `/campaignitems/${campaignId}`,
          })
          this.campaigns = this.campaignItems.data
        } else return
      } catch (error) {
        console.log(error.message)
      }
    },
  },
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
