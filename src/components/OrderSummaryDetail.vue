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
          <v-avatar :size="size" tile>
            <v-img :src="list.thumbnailImg"></v-img>
          </v-avatar>
          <div>
            <v-card-subtitle class="pt-2">
              {{ item.nameTh }}
            </v-card-subtitle>
            <v-card-subtitle class="pa-3 pb-0 grey--text">
              {{ list.effectiveStatus }} : {{ list.effectiveTms }} -
              {{ list.expireTms }}
            </v-card-subtitle>
            <div>
              <v-btn class="pa-0" text>
                <v-icon small v-text="'$mdiCart'"></v-icon>
                <div class="grey--text">
                  {{ item.sellOrder }}
                </div>
              </v-btn>
              <v-btn class="pa-0" text>
                <v-icon small v-text="'$mdiCashCheck'"></v-icon>
                <div class="grey--text">
                  {{ item.sellPaid }}
                </div>
              </v-btn>
              <v-btn class="pa-0" text>
                <v-icon small v-text="'$mdiTicket'"></v-icon>
                <div class="grey--text">
                  {{ item.couponUsed }}
                </div>
              </v-btn>
            </div>
            <v-btn class="pa-0 pl-3" text>
              <v-icon small>mdi-forum</v-icon>
              <div class="grey--text">{{ list.reviewApi }} Review</div>
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['lists', 'size'],
}
</script>

<style></style>
