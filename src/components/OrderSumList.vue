<template>
  <v-col class="pa-0" cols="12">
    <v-card
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
                `${list.status} : ${list.effectiveTms} - ${list.expireTms}`
              "
            >
            </label>
          </v-card-text>
          <v-list-item>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item class="pa-0" text v-bind="attrs" v-on="on">
                  <v-btn text>
                    <i class="ico-cart"></i>
                    <label class="grey--text pl-1">
                      {{ item.sellOrder }}
                    </label>
                  </v-btn>
                </v-list-item>
              </template>
              <span>Ordered</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item class="pa-0" text v-bind="attrs" v-on="on">
                  <v-btn
                    text
                    :to="
                      item.sellPaid != 0
                        ? `/order-detail?campaignItemId=${item.id}`
                        : ''
                    "
                  >
                    <i class="ico-paid"></i>
                    <label class="grey--text pl-1">
                      {{ item.sellPaid }}
                    </label>
                  </v-btn>
                </v-list-item>
              </template>
              <span>Paid</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item class="pa-0" text v-bind="attrs" v-on="on">
                  <v-btn text>
                    <i class="ico-coupon"></i>
                    <label class="grey--text pl-1">
                      {{ item.couponUsed }}
                    </label>
                  </v-btn>
                </v-list-item>
              </template>
              <span>Redeemed</span>
            </v-tooltip>
          </v-list-item>

          <v-card-actions>
            <!-- Add detail review -->
            <v-dialog
              v-model="dialog"
              fullscreen
              hide-overlay
              transition="dialog-bottom-transition"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-list-item class="pa-0 pl-3" text>
                  <v-btn text v-bind="attrs" v-on="on">
                    <v-icon small>mdi-forum</v-icon>
                    <div
                      class="grey--text pl-1"
                      v-text="
                        review ? `${review.items.length} Review` : '0 Review'
                      "
                    ></div>
                  </v-btn>
                </v-list-item>
              </template>
              <!-- Dialog review detail -->
              <ReviewDetail
                @closed_dialog="closedDialog"
                :campaignId="list.campaignId"
              />
              <!-- Dialog review detail -->
            </v-dialog>
          </v-card-actions>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import ReviewDetail from './ReviewLists.vue'
import axios from 'axios'
export default {
  components: {
    ReviewDetail,
  },
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
  data: () => ({
    review: null,
    dialog: false,
  }),
  mounted() {
    this.getReviewApi()
  },
  methods: {
    async getReviewApi() {
      try {
        if (this.list.reviewApi) {
          const reviewApi = await axios.get(this.list.reviewApi)
          this.review = reviewApi.data.data
        } else {
          console.log('review api:', this.review)
          return
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    closedDialog(val) {
      this.dialog = val
    },
  },
}
</script>

<style lang="scss" scoped>
.order_title {
  font-size: 0.875rem;
}
</style>
