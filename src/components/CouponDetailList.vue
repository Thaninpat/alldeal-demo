<template>
  <v-row>
    <v-col v-for="(value, index) in values" :key="index" cols="12" sm="6">
      <v-card class="pa-2">
        <div class="d-flex justify-start">
          <v-avatar class="ma-3" size="110" tile>
            <v-img :src="value.src"></v-img>
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
            <div class="mt-6">
              <dialog-btn
                class="justify-center"
                :status="value.status"
                @isUsed="isUsed(value.redemtionCode, value.markUsed)"
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
