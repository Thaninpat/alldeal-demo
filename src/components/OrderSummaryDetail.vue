<template>
  <v-row dense>
    <v-col v-for="(list, indexList) in lists" :key="indexList" cols="12" md="6">
      <v-card
        class="mb-3 pa-2"
        v-for="(item, indexItem) in list.items"
        :key="indexItem"
        color="#f1f1f1"
        height="170"
      >
        <div class="d-flex justify-flex-start">
          <v-avatar :size="size * 15" tile>
            <v-img :src="item.thumbnail_img"></v-img>
          </v-avatar>
          <div>
            <v-card-subtitle class="pt-2">
              {{ item.name_th }}
            </v-card-subtitle>
            <v-card-subtitle class="pa-3 pb-0 grey--text">
              {{ list.effective_status }} : {{ list.effective_tms }} -
              {{ list.expire_tms }}
            </v-card-subtitle>
            <div>
              <v-btn class="pa-0" text>
                <v-icon small v-text="'$mdiCart'"></v-icon>
                <div class="grey--text">
                  {{ item.sell_order }}
                </div>
              </v-btn>
              <v-btn class="pa-0" text>
                <v-icon small v-text="'$mdiCashCheck'"></v-icon>
                <div class="grey--text">
                  {{ item.sell_paid }}
                </div>
              </v-btn>
              <v-btn class="pa-0" text>
                <v-icon small v-text="'$mdiTicket'"></v-icon>
                <div class="grey--text">
                  {{ item.coupon_used }}
                </div>
              </v-btn>
            </div>
            <v-btn class="pa-0 pl-3" text>
              <v-icon small>mdi-forum</v-icon>
              <div class="grey--text">{{ item.review }} Review</div>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['lists', 'page', 'size'],
}
</script>

<style></style>
