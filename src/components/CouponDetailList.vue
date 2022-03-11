<template>
  <v-row>
    <v-col
      v-for="(value, index) in values"
      :key="index"
      class="pa-0"
      cols="12"
      md="10"
    >
      <v-card class="ma-1">
        <div class="d-flex flex-no-wrap justify-start">
          <v-avatar class="ma-3 mx-md-10" size="110" tile>
            <v-img src="/img/thumbnail.png"></v-img>
          </v-avatar>
          <div class="py-4 ml-2">
            <v-row>
              <v-col cols="5" md="3">Redemption Code </v-col>
              <v-col cols="7">{{ value.couponCode }}</v-col>

              <v-col cols="5" md="3">Order No</v-col>
              <v-col cols="7">{{ value.orderNo }}</v-col>

              <v-col cols="5" md="3">Item ID </v-col>
              <v-col cols="7">{{ value.itemId }}</v-col>

              <v-col cols="5" md="3">Name</v-col>
              <v-col cols="7">{{ value.name }}</v-col>

              <v-col cols="5" md="3">Price</v-col>
              <v-col cols="7">{{ value.price }}</v-col>

              <v-col cols="5" md="3">Status</v-col>
              <v-col cols="7">{{ value.status }}</v-col>

              <!-- <v-col cols="5" md="3">Paid Date</v-col>
              <v-col cols="7">{{ value.redeemStartTms }}</v-col> -->

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
  </v-row>
</template>

<script>
import DialogBtn from './DialogBtn.vue'
export default {
  components: { DialogBtn },
  props: {
    values: {
      type: Array,
    },
  },
  methods: {
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
