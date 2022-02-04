<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(list, idxList) in lists" :key="idxList">
      <v-expansion-panel-header>
        <v-row no-gutters>
          <v-col class="item-list d-flex justify-center" cols="3">
            {{ list.orderNumber }}
          </v-col>
          <v-col class="item-list d-flex justify-center" cols="3">
            {{ list.paidTms }}
          </v-col>
          <v-col class="item-list d-flex justify-end" cols="3">
            <label
              v-text="
                list.campaigns.priceFull
                  ? list.campaigns.priceFull * list.quantity + '฿'
                  : ''
              "
            ></label>
          </v-col>
          <v-col class="item-list d-flex justify-end pr-sm-2 pr-md-8">
            <i :class="list.status === 'paid' ? 'ico-paid' : ''"></i>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-row>
          <v-col class="item-list-detail d-flex justify-start" cols="4">
            <label
              v-text="list.channel ? 'Channel: ' + list.channel : 'Channel: -'"
            ></label>
          </v-col>
          <v-col class="item-list-detail d-flex justify-start" cols="4">
            Payment: {{ list.paymentTypeCode }}
          </v-col>
          <v-col class="item-list-detail d-flex justify-start" cols="4">
            Customer: {{ list.customerId }}
          </v-col>
        </v-row>
        <!-- <div v-for="(list, idxCampaign) in list.quantity" :key="idxCampaign"> -->
        <!-- <v-row
            v-if="list.campaign_item_id[index] === campaign.id"
            class="pt-1"
          > -->
        <div v-for="n in list.quantity" :key="n">
          <v-row class="pt-2">
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
              <i
                :class="list.campaigns.redemptionStartTms ? 'ico-coupon' : ''"
              ></i>
            </v-col>
          </v-row>
        </div>
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
  // async updated() {
  //   console.log(this.lists)
  //   await this.lists.map((x) => {
  //     const camP = x.campaigns
  //     const start = moment(camP.redemptionStartTms).format('DD/MM/YY')
  //     const end = moment(camP.redemptionEndTms).format('DD/MM/YY')
  //     console.log(`Start: ${start} - End: ${end}`)
  //   })
  // },
}
</script>

<style lang="scss"></style>
