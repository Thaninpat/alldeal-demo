<template>
  <v-row class="mt-3">
    <v-col v-for="(value, index) in values" :key="index" cols="12" sm="6">
      <v-card class="pa-2">
        <div class="d-flex justify-start">
          <v-avatar class="ma-3" size="110" tile>
            <v-img src="/images/thumbnail.jpg/"></v-img>
          </v-avatar>
          <div class="py-4 ml-2">
            <v-row>
              <v-col cols="6">Redemption Code </v-col>
              <v-col cols="6">{{ value.redemtionCode }}</v-col>

              <v-col cols="6">Order ID</v-col>
              <v-col cols="6">{{ value.orderId }}</v-col>

              <v-col cols="6">Item ID </v-col>
              <v-col cols="6">{{ value.itemId }}</v-col>

              <v-col cols="6">Name</v-col>
              <v-col cols="6">{{ value.name }}</v-col>

              <v-col cols="6">Price</v-col>
              <v-col cols="6">{{ value.price }}</v-col>

              <v-col cols="6">Status</v-col>
              <v-col cols="6">{{ value.status }}</v-col>

              <v-col cols="6">Paid Date</v-col>
              <v-col cols="6">{{ value.paidDate }}</v-col>

              <v-col cols="6">Expire Date</v-col>
              <v-col cols="6">{{ value.expireDate }}</v-col>

              <v-col cols="6">Used Date</v-col>
              <v-col cols="6">{{ value.usedDate }}</v-col>
            </v-row>
            <div class="d-flex justify-center mt-6">
              <v-btn
                v-if="value.status === 'Avaliable'"
                dark
                class="px-8"
                x-small
                rounded
                v-text="value.status === 'Avaliable' ? 'used' : 'cancel'"
                :color="value.status === 'Avaliable' ? 'success' : 'error'"
                @click="isUsed(value.redemtionCode, value.markUsed)"
              >
              </v-btn>
              <v-btn
                v-if="value.status === 'Used'"
                dark
                class="px-8"
                x-small
                rounded
                v-text="value.status === 'Used' ? 'cancel' : 'used'"
                :color="value.status === 'Used' ? 'error' : 'success'"
                @click="isUsed(value.redemtionCode, value.markUsed)"
              >
              </v-btn>
              <v-btn
                v-if="value.status === 'Refund'"
                class="px-5"
                x-small
                rounded
                disabled
                v-text="'Refund'"
              >
              </v-btn>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ['values'],
  methods: {
    isUsed(redemCode, markUsed) {
      this.$emit('isUsed', redemCode, markUsed)
    },
  },
}
</script>

<style lang="scss" scoped>
.col.col-6 {
  padding: 1px 0;
  font-size: 12px;
  font-weight: bold;
}
</style>
