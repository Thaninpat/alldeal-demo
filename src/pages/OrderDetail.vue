<template>
  <base-layout pageTitle="Order Detail">
    <v-row class="pa-3" no-gutters>
      <order-detail-header v-for="(item, i) in items" :key="i" :item="item" />
    </v-row>
    <order-detail-lists
      v-for="(list, idx) in lists"
      :key="idx"
      :idx="idx"
      :list="list"
      :amounts="amounts"
      :customers="customers"
    />
    <div class="text-center mt-4">
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        total-visible="7"
        @input="handlePageChange"
      ></v-pagination>
    </div>
  </base-layout>
</template>

<script>
import OrderDetailLists from '../components/OrderDetailLists.vue'
import OrderDetailHeader from '../components/OrderDetailHeader.vue'
import userDataService from '../service/userDataService'

export default {
  components: {
    OrderDetailLists,
    OrderDetailHeader,
  },
  data: () => ({
    date: null,
    items: [
      { name: 'Id' },
      { name: 'Name' },
      { name: 'Email' },
      { name: 'Phone' },
      { name: '' },
    ],
    lists: [],
    netPrices: [],
    amounts: [],
    customers: [],
    currentPage: 1,
    totalPages: 0,
    pageSize: 4,
  }),
  mounted() {
    this.Fetch()
  },
  methods: {
    getRequestParams(currentPage, pageSize) {
      let params = {}
      if (currentPage) {
        params['_page'] = currentPage
      }
      if (pageSize) {
        params['_limit'] = pageSize
      }
      return params
    },
    async Fetch() {
      const params = await this.getRequestParams(
        this.currentPage,
        this.pageSize
      )
      await userDataService
        .getAll(params)
        .then((res) => {
          const order = res.data
          this.lists = order.map(this.getDisplay)
          const totalItems = parseInt(res.headers['x-total-count'])
          this.totalPages = Math.ceil(totalItems / this.pageSize)
        })
        .then((lists) => lists)
        .catch((e) => {
          console.error(e)
        })
    },
    getDisplay(list) {
      return {
        id: list.id,
        name: list.name.substr(0, 9) + '...',
        email: list.email.substr(0, 10),
        phone: list.phone,
        city: list.address.city,
        street: list.address.street,
        // status: list.published ? 'Published' : 'Pending',
      }
    },

    handlePageChange(value) {
      this.currentPage = value
      this.Fetch()
    },
  },
}
</script>
