<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-row no-gutters>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            {{ list.orderNo }}
          </v-col>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            {{ list.paidDate }}
          </v-col>
          <v-col
            class="item-list d-flex justify-sm-center align-center"
            cols="2.4"
          >
            {{ amounts[idx] }}฿
          </v-col>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            {{ customers[idx] }}
          </v-col>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            <v-icon
              v-if="list.status === 'Order'"
              dense
              v-text="'$mdiCashCheck'"
            ></v-icon>
            <v-icon
              v-if="list.status === 'Paid'"
              dense
              v-text="'$mdiCart'"
            ></v-icon>
            <v-icon
              v-if="list.status === 'Refund'"
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
            Chanel: {{ list.chanel }}
          </v-col>
          <v-col class="item-list-detail d-flex justify-start" cols="6">
            Payment: {{ list.payment }}
          </v-col>
        </v-row>
        <v-row v-for="(order, index) in list.items" :key="index">
          <v-col class="item-list d-flex justify-start pt-0" cols="1">
            <v-avatar size="25" tile>
              <v-img src="/images/thumbnail.jpg/"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="5">
            <span> {{ order.itemId }} - {{ order.name }} </span>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="3">
            {{ order.netPrice }}฿
          </v-col>
          <v-col class="item-list d-flex justify-end pt-0" cols="3">
            <v-icon
              v-if="order.coupon.length > 0"
              dense
              v-text="'$mdiTicket'"
            ></v-icon>
            <v-icon v-else dense></v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: ['list', 'amounts', 'customers', 'idx'],
}
</script>

<style lang="scss" scoped>
.item-list {
  font-size: 13px;
}
.item-list-detail {
  font-size: 10px;
}
</style>
