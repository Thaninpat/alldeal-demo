<template>
  <v-card color="#fff" flat height="100vh">
    <v-toolbar color="grey lighten-4">
      <v-btn icon @click="backToDefaultPage">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-toolbar-title>{{ titleNameOrder }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container class="d-flex justify-center">
      <div class="table_container" style="overflow-x:auto;">
        <table>
          <tr class="item-list">
            <th class="th_img"></th>
            <th class="th_item_name">Item Name</th>
            <th>Paid Date</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Order No</th>
          </tr>
          <tr
            class="item-list-detail"
            v-for="item in paidOrderItems"
            :key="item.id"
          >
            <td>
              <v-avatar size="30" tile>
                <v-img :src="item.thumbImageFileUrl" />
              </v-avatar>
            </td>
            <td>{{ item.campaignItemNameTh }}</td>
            <td>{{ item.paidTms }}</td>
            <td>{{ item.priceNet }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.priceNet * item.quantity }}฿</td>
            <td>{{ item.orderNumber }}</td>
          </tr>
        </table>
      </div>
    </v-container>
  </v-card>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'

export default {
  data: () => ({
    campaignItemId: null,
    paidOrderItems: null,
    titleNameOrder: '',
  }),
  mounted() {
    this.campaignItemId = this.$route.params.id
    this.FetchPaidOrder()
  },
  computed: {
    ...mapGetters({
      orders: 'supplier/orders',
      campaignItems: 'supplier/campaignItems',
    }),
  },
  methods: {
    ...mapActions({
      getOrders: 'supplier/getOrders',
    }),
    getRequestParams(campaignItemId) {
      let params = {}
      if (campaignItemId) {
        params['campaignItemId'] = campaignItemId
      }

      return params
    },
    async FetchPaidOrder() {
      const params = await this.getRequestParams(parseInt(this.campaignItemId))
      console.log('params', params)
      try {
        // Order Items
        await this.getOrders({
          path: '/paidorderitems',
          method: 'GET',
          params,
        })
        const paidOrderItems = this.orders.data.orders
        console.log(paidOrderItems)
        this.paidOrderItems = paidOrderItems.map(this.getDisplay)
        paidOrderItems.map((t) => {
          if (t) this.titleNameOrder = t.campaignItemNameTh
          else this.titleNameOrder = ''
        })
        console.log(paidOrderItems)
      } catch (error) {
        console.log(error)
      }
    },
    backToDefaultPage() {
      this.$router.push({ name: 'orderSummary' })
    },
    getDisplay(list) {
      if (list) {
        return {
          campaignItemNameTh: list.campaignItemNameTh,
          paidTms: moment(list.paidTms).format('DD/MM/YY hh:mm'),
          priceNet: list.priceNet,
          quantity: list.quantity,
          orderNumber: list.orderNumber,
          thumbImageFileUrl: list.thumbImageFileUrl,
        }
      } else console.log('No data list')
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  width: 720px;
}

th,
td {
  text-align: left;
  padding: 8px;
}
tr:nth-child(even) {
  background-color: #ffffff;
}
th.th_img {
  width: 30px;
}
/* th.th_item_name {
  width: 100px;
} */
.table_container {
  display: block;
}
</style>
