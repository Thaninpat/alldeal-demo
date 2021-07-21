<template>
  <v-expansion-panels>
    <v-expansion-panel>
      <v-expansion-panel-header>
        <v-row no-gutters>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            {{ lists.order[idx] }}
          </v-col>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            {{ lists.paidDate[idx] }}
          </v-col>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            {{ lists.amount[idx] }}฿
          </v-col>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            {{ lists.customer[idx] }}
          </v-col>
          <v-col
            class="item-list d-flex justify-center align-center"
            cols="2.4"
          >
            <v-icon
              v-if="lists.status[idx] === 'Order'"
              dense
              v-text="'$mdiCashCheck'"
            ></v-icon>
            <v-icon
              v-if="lists.status[idx] === 'Paid'"
              dense
              v-text="'$mdiCart'"
            ></v-icon>
            <v-icon
              v-if="lists.status[idx] === 'Refund'"
              dense
              v-text="'$mdiCashRefund'"
            ></v-icon>
            <v-icon v-else dense></v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <!-- <v-divider /> -->
        <v-row>
          <v-col class="item-list-detail d-flex justify-start" cols="5">
            Chanel: {{ lists.chanel[idx] }}
          </v-col>
          <v-col class="item-list-detail d-flex justify-start" cols="5">
            Payment: {{ lists.payment[idx] }}
          </v-col>
        </v-row>
        <v-row>
          <v-col class="item-list d-flex justify-start pt-0" cols="1">
            <v-avatar size="25" tile>
              <!-- tile = เหลี่ยม -->
              <v-img src="/images/thumbnail.jpg/"></v-img>
            </v-avatar>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="5">
            <span>
              0001 - Deal Item 1
            </span>
          </v-col>
          <v-col class="item-list d-flex justify-start pt-0" cols="3">
            100฿
          </v-col>
          <v-col class="item-list d-flex justify-end pt-0" cols="3">
            <v-icon dense v-text="'$mdiTicket'"></v-icon>
          </v-col>
        </v-row>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  props: ['lists', 'idx'],
}
</script>

<style lang="scss" scoped>
.item-list {
  font-size: 13px;
  /* padding: 18px 0 0 0; */
}
.item-list-detail {
  font-size: 10px;
}
</style>
