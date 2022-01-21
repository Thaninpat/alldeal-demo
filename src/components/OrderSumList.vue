<template>
  <v-row dense>
    <v-col
      class="pa-0"
      v-for="(list, idxList) in lists"
      :key="idxList"
      cols="12"
    >
      <v-card
        class="ma-1"
        v-for="(item, idxItem) in list.items"
        :key="idxItem"
        color="#f1f1f1"
      >
        <div class="d-flex flex-no-wrap justify-start">
          <v-avatar class="ma-3 mx-md-10" :size="size" tile>
            <v-img :src="list.thumbnailImg"></v-img>
          </v-avatar>
          <div class="pl-md-10 ml-md-10">
            <v-card-title>
              <label class="order_title" v-text="item.nameTh"></label>
            </v-card-title>
            <!-- <v-card-subtitle>{{ idxList + 1 }}</v-card-subtitle> -->
            <v-card-text class="pb-0 grey--text">
              <label>
                {{ list.effectiveStatus }} : {{ list.effectiveTms }} -
                {{ list.expireTms }}
              </label>
            </v-card-text>
            <div>
              <v-btn class="pa-0" text>
                <i class="ico-cart"></i>

                <label class="grey--text">
                  {{ item.sellOrder }}
                </label>
              </v-btn>
              <v-btn class="pa-0" text>
                <i class="ico-paid"></i>
                <label class="grey--text">
                  {{ item.sellPaid }}
                </label>
              </v-btn>
              <v-btn class="pa-0" text>
                <i class="ico-coupon"></i>
                <label class="grey--text">
                  {{ item.couponUsed }}
                </label>
              </v-btn>
            </div>

            <v-card-actions>
              <v-btn class="pa-0 pl-3" text>
                <v-icon small>mdi-forum</v-icon>
                <div class="grey--text">{{ list.reviewApi }} Review</div>
              </v-btn>
            </v-card-actions>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    lists: {
      type: Array,
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
