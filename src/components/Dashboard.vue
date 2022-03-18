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
                <v-list-item-title @click="getDailySum">
                  <a>Daily Summary</a>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="getMonthlySum">
                  <a>Monthly Summary</a>
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
    defaultSum: 'monthlySum',
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
    sumName: 'Monthly Summary',
    chartData: null,
    countOrder: null,
    countLabel: null,
    labels: [],
    colors: [],
    orderLists: {
      orderName: [],
      orderTms: [],
      priceNet: [],
    },
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
    }),
  },
  methods: {
    ...mapActions({
      getOrders: 'supplier/getOrders',
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
    async getOrderSummary() {
      this.haveData = false
      this.loaded = false
      try {
        await this.getOrders({ path: '/ordersummary', method: 'GET' })
        const orderSummary = this.orders.data
        // console.log('orderSummary: ', orderSummary)
        if (orderSummary) {
          const compareDate = await this.filterDateOrder(
            orderSummary,
            this.sDate,
            this.eDate
          )
          const orderLists = compareDate.map(await this.orderDisplay)
          this.orderLists.orderName = orderLists.map((item) => item.itemName)
          this.checkData(orderLists)
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

    // Filter
    async filterDateOrder(orderSummary, start_date, end_date) {
      const startDate = moment(start_date).format('yyyy-MM-DD')
      const endDate = moment(end_date).format('yyyy-MM-DD')
      if (this.defaultSum == 'dailySum') {
        return await this.getLastWeek(orderSummary)
      } else if (this.defaultSum == 'monthlySum') {
        return await this.getLastMonth(orderSummary)
      } else if (this.defaultSum == 'byDate') {
        return await this.getByDate(orderSummary, startDate, endDate)
      }
    },
    async getLastWeek(orderSummary) {
      const lastWeek = moment(this.selectDate).format('yyyy-MM-DD')
      this.labels = getDay(lastWeek)
      this.countLabel = this.labels.length
      // console.log({ lastWeek })
      // console.log(this.labels)
      return await this.getOrder({
        orderSummary: orderSummary,
        lastWeek: lastWeek,
      })
    },
    async getLastMonth(orderSummary) {
      const lastMonth = moment(this.selectMonth).format('yyyy-MM')
      this.labels = getMonth(lastMonth)
      this.countLabel = this.labels.length
      return await this.getOrder({
        orderSummary: orderSummary,
        lastMonth: lastMonth,
      })
    },
    async getByDate(orderSummary, startDate, endDate) {
      const data = {
        orderSummary: orderSummary,
        startDate: startDate,
        endDate: endDate,
      }
      return await this.getOrder(data)
    },

    async getOrder(data) {
      let orderSummary = data.orderSummary
      let lastWeek = data.lastWeek
      let lastMonth = data.lastMonth
      let startDate = data.startDate
      let endDate = data.endDate
      const compareDate = await orderSummary.filter((a) => {
        const date = moment(a.effectiveTms).format('yyyy-MM-DD')
        const date2 = moment(a.effectiveTms).format('yyyy-MM')
        if (startDate !== undefined && endDate !== undefined) {
          return date >= startDate && date <= endDate
        }
        if (lastWeek != undefined) {
          return (
            date >= moment(this.labels[0]).format('yyyy-MM-DD') &&
            date <= lastWeek
          )
        }
        if (lastMonth != undefined) {
          return (
            date2 >= moment(this.labels[0]).format('yyyy-MM') &&
            date2 <= lastMonth
          )
        }
      })
      if (compareDate.length == 0) {
        this.loaded = false
        this.clearFile()
        return
      } else {
        this.countOrder = compareDate.length
        await this.randomColor()
        return compareDate
      }
    },

    checkData(orderLists) {
      // console.log('checkData: ', orderLists)
      let datasetsData = []
      let dataCollection = []
      let labels = []
      let datasets = []
      let i = 0
      let j = 0
      orderLists.map((list) => {
        let value = []
        this.labels.map((x) => {
          if (this.defaultSum === 'monthlySum') {
            if (
              moment(x).format('MMMM') === moment(list.orderTms).format('MMMM')
            ) {
              let sell_paid = list.sellPaid.map((y) => y)
              value.push(sell_paid.reduce((prev, cur) => prev + cur, 0))
            } else value.push(0)
          }
          if (this.defaultSum === 'dailySum') {
            if (
              moment(x).format('DD-MMMM') ===
              moment(list.orderTms).format('DD-MMMM')
            ) {
              let sell_paid = list.sellPaid.map((y) => y)
              value.push(sell_paid.reduce((prev, cur) => prev + cur, 0))
            } else value.push(0)
          }
        })
        datasetsData.push(value)
      })

      while (i < this.countLabel) {
        if (this.defaultSum === 'monthlySum') {
          labels.push(moment(this.labels[i]).format('MMM-YY'))
        } else {
          labels.push(moment(this.labels[i]).format('DD-MMM-YY'))
        }
        i++
      }
      while (j < this.countOrder) {
        datasets.push({
          label: this.orderLists.orderName[j],
          borderColor: this.colors[j],
          pointBorderColor: this.colors[j],
          data: datasetsData[j],
          tension: 0.1,
        })
        j++
      }

      dataCollection.push({ labels: labels, datasets: datasets })
      this.chartData = dataCollection[0]
      // console.log('labels data: ', labels)
      // console.log('datasets: ', datasets)
      // console.log('chartData: ', this.chartData)

      // return datasetsData
    },

    orderDisplay(list) {
      return {
        orderName: list.nameTh,
        orderTms: list.effectiveTms,
        campaignItemId: list.items.map((item) => item.id),
        sellPaid: list.items.map((item) => item.sellPaid),
        itemName: list.items.map((item) => item.nameTh),
      }
    },
    clearFile() {
      this.sDate = ''
      this.eDate = ''
      this.selectDate = ''
      this.selectMonth = ''
    },
    randomColor() {
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
