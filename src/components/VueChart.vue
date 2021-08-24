<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="12" class="d-flex justify-center">
        <div class="text-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn text color="black" v-bind="attrs" v-on="on">
                {{ list }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item>
                <v-list-item-title @click="Daily">
                  <a>Daily Summary</a>
                </v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title @click="Monthly">
                  <a>Monthly Summary</a>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </v-col>
      <v-col class="small">
        <line-chart
          v-if="loaded"
          :chart-data="datacollection"
          :chart-labels="labels"
          :options="chartOptions"
        />
        <div class="text-center" v-else>
          <p>Loading...</p>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'
import moment from 'moment'
import LineChart from './LineChart.vue'

export default {
  name: 'VueChart',
  components: { LineChart },
  data: () => ({
    JsonFile: '',
    list: '',
    loaded: false,
    items1: null,
    items2: null,
    items3: null,
    items4: null,
    labels: null,
    chartOptions: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'bottom',
        labels: {
          fontColor: '#000',
        },
      },
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
          gridLines: {
            display: true,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    datacollection: [],
  }),
  created() {
    this.Daily()
  },
  methods: {
    async Daily() {
      this.loaded = false
      this.JsonFile = 'dashboardDaily.json'
      this.list = 'Daily Summary'
      try {
        const { data } = await axios.get(`/data/${this.JsonFile}`)
        this.loaded = true
        //   console.log('data:', data)
        this.items1 = data.map((item1) => item1.item1)
        this.items2 = data.map((item2) => item2.item2)
        this.items3 = data.map((item3) => item3.item3)

        this.labels = data.map((label) =>
          moment(label.day, 'DD/MM/YYYY').format('DD-MMM-YY')
        )

        this.datacollection = {
          labels: this.labels,
          datasets: [
            {
              label: 'Deal Item 1',
              // backgroundColor: 'rgba(255,255,255,.5)',
              borderColor: '#6666ff',
              pointBorderColor: '#6666ff',
              data: this.items1,
              tension: 0.1,
            },
            {
              label: 'Deal Item 2',
              // backgroundColor: 'rgba(255,255,255,.5)',
              borderColor: '#ff6666',
              pointBorderColor: '#ff6666',
              data: this.items2,
              tension: 0.1,
            },
            {
              label: 'Deal Item 3',
              // backgroundColor: 'rgba(255,255,255,.5)',
              borderColor: '#a3a3c2',
              pointBorderColor: '#a3a3c2',
              data: this.items3,
              tension: 0.1,
            },
          ],
        }
      } catch (error) {
        console.error(error)
      }
    },
    async Monthly() {
      this.loaded = false
      this.JsonFile = 'dashboardMonthly.json'
      this.list = 'Monthly Summary'

      try {
        const { data } = await axios.get(`/data/${this.JsonFile}`)
        this.loaded = true
        //   console.log('data:', data)
        this.items1 = data.map((item1) => item1.item1)
        this.items2 = data.map((item2) => item2.item2)
        this.items3 = data.map((item3) => item3.item3)
        this.items4 = data.map((item4) => item4.item4)

        this.labels = data.map((label) => label.day)

        this.datacollection = {
          labels: this.labels,
          datasets: [
            {
              label: 'Deal Item 1',
              // backgroundColor: 'rgba(255,255,255,.5)',
              borderColor: '#6666ff',
              pointBorderColor: '#6666ff',
              data: this.items1,
              tension: 0.1,
            },
            {
              label: 'Deal Item 2',
              // backgroundColor: 'rgba(255,255,255,.5)',
              borderColor: '#ff6666',
              pointBorderColor: '#ff6666',
              data: this.items2,
              tension: 0.1,
            },
            {
              label: 'Deal Item 3',
              // backgroundColor: 'rgba(255,255,255,.5)',
              borderColor: '#a3a3c2',
              pointBorderColor: '#a3a3c2',
              data: this.items3,
              tension: 0.1,
            },
            {
              label: 'Deal Item 4',
              // backgroundColor: 'rgba(255, 214, 51,.5)',
              borderColor: '#e6b800',
              pointBorderColor: '#e6b800',
              data: this.items4,
              tension: 0.1,
            },
          ],
        }
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.small {
  max-width: 1024px;
  margin: 0 auto 50px;
}
</style>
