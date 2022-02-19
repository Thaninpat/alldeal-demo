<template>
  <v-col class="pa-0" cols="12">
    <v-card
      :to="item.sellPaid != 0 ? `/order-detail?campaignItemId=${item.id}` : ''"
      class="ma-1"
      v-for="(item, idxItem) in list.items"
      :key="idxItem"
      color="#f1f1f1"
    >
      <div class="d-flex flex-no-wrap justify-start">
        <v-avatar class="ma-3 mx-md-10" :size="size" tile>
          <v-img
            :src="item.thumbnailImg ? item.thumbnailImg : list.thumbnailImg"
            :alt="item.nameTh"
          ></v-img>
        </v-avatar>
        <div class="pl-md-10 ml-md-10">
          <v-card-title>
            <label class="order_title" v-text="item.nameTh"></label>
          </v-card-title>
          <!-- <v-card-subtitle>{{ idxList + 1 }}</v-card-subtitle> -->
          <v-card-text class="pb-0 grey--text">
            <label
              v-text="
                list.effectiveStatus === 'Y'
                  ? `Active : ${list.effectiveTms} - ${list.expireTms}`
                  : `End : ${list.effectiveTms} - ${list.expireTms}`
              "
            >
            </label>
          </v-card-text>
          <v-list-item>
            <v-list-item class="pa-0" text>
              <i class="ico-cart"></i>
              <label class="grey--text pl-1">
                {{ item.sellOrder }}
              </label>
            </v-list-item>
            <v-list-item class="pa-0" text>
              <i class="ico-paid"></i>
              <label class="grey--text pl-1">
                {{ item.sellPaid }}
              </label>
            </v-list-item>
            <v-list-item class="pa-0" text>
              <i class="ico-coupon"></i>
              <label class="grey--text pl-1">
                {{ item.couponUsed }}
              </label>
            </v-list-item>
          </v-list-item>

          <v-card-actions>
            <v-list-item class="pa-0 pl-3" text>
              <v-icon small>mdi-forum</v-icon>
              <div
                class="grey--text pl-1"
                v-text="list.reviewApi ? list.reviewApi + 'Review' : '0 Review'"
              ></div>
            </v-list-item>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      require: true,
    },
    size: {
      type: Number,
      require: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.order_title {
  font-size: 0.875rem;
}
</style>
