<template>
  <v-container class="d-flex justify-center">
    <div class="table_container" style="overflow-x:auto;">
      <table>
        <tr class="item-list">
          <th class="th_img"></th>
          <th class="th_item_name">Order Id</th>
          <th>Paid Date</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Payment</th>
          <th>Customer</th>
          <th class="th_item_name">Name</th>
          <th>Price Net</th>
          <th>Qty</th>
        </tr>
        <tr
          class="item-list-detail"
          v-for="(list, index) in lists"
          :key="index"
        >
          <td>
            <v-avatar size="30" tile>
              <v-img
                :src="
                  list.campaigns.thumbnailImg
                    ? list.campaigns.thumbnailImg
                    : list.thumbImageFileUrl
                "
              />
            </v-avatar>
          </td>
          <td>{{ list.orderNumber }}</td>
          <td>{{ list.paidTms }}</td>
          <td>{{ list.campaigns.priceNet * list.quantity }}฿</td>
          <td>{{ list.status }}</td>
          <td>{{ list.paymentTypeCode }}</td>
          <td>{{ list.customerId }}</td>
          <td>{{ list.campaignItemNameTh }}</td>
          <td>{{ list.campaigns.priceNet }}฿</td>
          <td>{{ list.quantity }}</td>
        </tr>
      </table>
    </div>
  </v-container>
</template>

<script>
export default {
  //   props: {
  //     lists: {
  //       type: Array,
  //     },
  //   },
  props: ['lists'],
  updated() {
    console.log('this.lists', this.lists)
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
  background-color: #fff;
}

th.th_img {
  width: 30px;
}
th.th_item_name {
  width: 120px;
}

.table_container {
  display: block;
}
@media only screen and (min-width: 1280px) {
  th.th_item_name {
    width: 250px;
  }
}
</style>
