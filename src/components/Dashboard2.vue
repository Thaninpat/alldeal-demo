<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="justify-center">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="black" v-bind="attrs" v-on="on">
                {{ sumName }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="getMonthlySum">
                  <a>Monthly Summary</a>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="getDailySum">
                  <a>Daily Summary</a>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-form @submit.prevent="getOrderData">
          <v-text-field
            v-if="defaultSum === 'monthlySum'"
            v-model="selectMonth"
            type="month"
            label="Date"
            :min="minOfMonth"
          ></v-text-field>
          <v-text-field
            v-else
            v-model="selectDate"
            type="date"
            label="Date"
            :min="minOfDate"
          ></v-text-field>
          <v-btn :loading="!loaded" block color="primary" type="submit">
            submit
          </v-btn>
        </v-form>
      </v-col>
      <v-col class="small">
        <LineChart v-if="loaded && haveData" :chartData="chartData" />
        <h4 v-else-if="!loaded" class="text-center mt-6">Loading...</h4>
        <h4 v-else-if="loaded && !haveData" class="text-center mt-6">
          No data.
        </h4>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import moment from 'moment'
import { mapActions, mapGetters } from 'vuex'
import LineChart from './LineChart.vue'
import { getMonth, getDay } from '../helper/utils'

export default {
  components: {
    LineChart,
  },
  data: () => ({
    loaded: false,
    haveData: false,
    sumName: 'Monthly Summary',
    defaultSum: 'monthlySum',
    dateNow: Date.now(),
    selectDate: moment(Date.now()).format('YYYY-MM-DD'),
    selectMonth: moment(Date.now()).format('YYYY-MM'),
    minOfMonth: moment()
      .subtract(5, 'month')
      .format('YYYY-MM'),
    minOfDate: moment()
      .subtract(5, 'month')
      .format('YYYY-MM-DD'),
    sDate: '',
    eDate: '',
    chartData: null,
    countOrder: null,
    countLabel: null,
    labels: [],
    colors: [],
    orderLists: {
      orderName: [],
      orderTms: [],
      priceNet: [],
      qty: 0,
    },
    datasetsData: [],
    dataCollections: [],
    lastMonthThisDay: moment()
      .startOf('day')
      .subtract(6, 'month'),
    last7DayStart: moment()
      .startOf('day')
      .subtract(1, 'week'),
  }),
  mounted() {
    this.getOrderSummary()
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
      getCampaignItems: 'supplier/getCampaignItems',
    }),
    getDailySum() {
      this.selectDate = moment(Date.now()).format('YYYY-MM-DD')
      this.sumName = 'Daily Summary'
      this.defaultSum = 'dailySum'
      this.getOrderSummary()
    },
    getMonthlySum() {
      this.selectMonth = moment(Date.now()).format('YYYY-MM')
      this.sumName = 'Monthly Summary'
      this.defaultSum = 'monthlySum'
      this.getOrderSummary()
    },
    getOrderData() {
      this.getOrderSummary()
    },
    getRequestParams(campaignItemId, paidTmsFrom, paidTmsTo, pageSize) {
      let params = {}
      if (campaignItemId) {
        params['campaignItemId'] = campaignItemId
      }
      if (paidTmsFrom) {
        params['paidTmsFrom'] = paidTmsFrom
      }
      if (paidTmsTo) {
        params['paidTmsTo'] = paidTmsTo
      }
      if (pageSize) {
        params['pageSize'] = pageSize
      }
      return params
    },
    async getOrderSummary() {
      this.haveData = false
      this.loaded = false
      try {
        await this.getOrders({ path: '/ordersummary', method: 'GET' })
        const orderSummary = this.orders.data
        if (orderSummary) {
          const orderLists = orderSummary.map(await this.orderDisplay)

          let campaignItemsId = []
          await orderLists.map((item) => {
            if (item.effectiveStatus == 'Y') {
              this.orderLists.orderName.push(item.itemName[0])
              campaignItemsId.push(item.campaignItemId[0])
            } else return
          })
          this.countOrder = campaignItemsId.length
          this.randomColor()

          // ---------------- get campaign ---------------------- //
          for (let camItemId of campaignItemsId) {
            await this.checkData(camItemId)
          }
          // ---------------- get campaign ---------------------- //
          // this.clearFile()
          this.datasetsData = []
          this.haveData = true
          this.loaded = true
        } else if (this.orders.code === 'CBE003') {
          this.getOrderSummary()
        } else {
          this.loaded = true
          this.haveData = false
          this.chartData = ''
        }
      } catch (error) {
        setTimeout(() => {
          this.loaded = true
        }, 1500)
        console.log(error.message)
      }
    },

    async checkData(camItemId) {
      try {
        // console.log('camItemId: ', camItemId)

        let dataCollection = []
        let labels = []
        let datasets = []
        let x = 0
        let y = 0
        const page_size = 9999

        if (this.defaultSum === 'monthlySum') {
          let value = [0, 0, 0, 0, 0, 0]
          const lastMonth = moment(this.selectMonth)
          this.labels = getMonth(lastMonth)
          this.countLabel = this.labels.length
          for (let i = 0; i <= 5; i++) {
            // -------------------- Monthly ------------------- //
            const month = moment(this.selectMonth)
              .subtract(5 - i, 'month')
              .startOf('month')
              .format('YYYY-MM-DD')

            const from = Date.parse(month)
            const to = Date.parse(moment(from).endOf('month'))

            const params = this.getRequestParams(camItemId, from, to, page_size)
            await this.getCampaignItems({
              path: '/paidorderitems',
              method: 'GET',
              params,
            })
            let campaignOrders = this.campaignItems.data.orders
            if (campaignOrders.length > 0) {
              let qty = 0
              await campaignOrders.map((obj) => {
                qty = qty + obj.quantity
                return obj.campaignItemNameTh
              })
              value.fill(qty, i, i + 1)
            }
          }
          this.datasetsData.push(value)
        }
        // ------------------ Daily ------------------ //
        if (this.defaultSum === 'dailySum') {
          let value = [0, 0, 0, 0, 0, 0, 0]
          const lastWeek = moment(this.selectDate)
          this.labels = getDay(lastWeek)
          this.countLabel = this.labels.length

          for (let j = 0; j <= 6; j++) {
            const day = moment(this.selectDate)
              .subtract(6 - j, 'day')
              .startOf('day')
              .format('YYYY-MM-DD')

            const from = Date.parse(moment(day).startOf('day'))
            const to = Date.parse(moment(day).endOf('day'))

            const params = this.getRequestParams(camItemId, from, to, page_size)
            await this.getCampaignItems({
              path: '/paidorderitems',
              method: 'GET',
              params,
            })
            let campaignOrders = this.campaignItems.data.orders
            if (campaignOrders.length > 0) {
              let qty = 0
              await campaignOrders.map((obj) => {
                qty = qty + obj.quantity
                return obj.campaignItemNameTh
              })
              value.fill(qty, j, j + 1)
            }
          }
          this.datasetsData.push(value)
        }

        while (x < this.countLabel) {
          if (this.defaultSum === 'monthlySum') {
            labels.push(moment(this.labels[x]).format('MMM-YY'))
          } else {
            labels.push(moment(this.labels[x]).format('DD-MMM-YY'))
          }
          x++
        }

        while (y < this.countOrder) {
          datasets.push({
            label: this.orderLists.orderName[y],
            borderColor: this.colors[y],
            pointBorderColor: this.colors[y],
            data: this.datasetsData[y],
            tension: 0.1,
          })
          y++
        }

        dataCollection.push({ labels: labels, datasets: datasets })
        this.chartData = dataCollection[0]

        // ------------------------------------------------------------------------------------------ //

        // console.log('labels data: ', labels)
        // console.log('datasets: ', datasets)
        // console.log('chartData: ', this.chartData)

        // return datasetsData
      } catch (error) {
        console.error(error.message)
      }
    },

    orderDisplay(list) {
      return {
        orderName: list.nameTh,
        orderTms: list.effectiveTms,
        campaignItemId: list.items.map((item) => item.id),
        sellPaid: list.items.map((item) => item.sellPaid),
        itemName: list.items.map((item) => item.nameTh),
        effectiveStatus: list.effectiveStatus,
      }
    },

    clearFile() {
      this.sDate = ''
      this.eDate = ''
      this.selectDate = ''
      this.selectMonth = ''
    },
    randomColor() {
      console.log('countOrder: ', this.countOrder)
      let colors = []
      for (let i = 0; i < this.countOrder; i++) {
        colors.push(
          '#' +
            Math.random()
              .toString(16)
              .substr(2, 6)
        )
      }
      this.colors = colors
      // console.log('color: ', this.colors)
    },
  },
}
</script>
