<template>
  <v-container>
    <v-row>
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
    JsonFile: 'dashboard.json',
    loaded: false,
    items1: [],
    items2: [],
    items3: [],
    labels: [],
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
  async created() {
    this.loaded = false
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
      //   this.labels = moment(label.day, 'DD/MM/YYYY').format('D-MM-YY')

      //   console.log('dealItem1:', this.items1)
      //   console.log('dealItem2:', this.items2)
      //   console.log('dealItem3:', this.items3)

      //   console.log('labels:', this.labels)

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
      //   console.log('datacollection', this.datacollection)
    } catch (error) {
      console.error(error)
    }
  },
}
</script>

<style>
.small {
  max-width: 1024px;
  margin: 0 auto 50px;
}
</style>
