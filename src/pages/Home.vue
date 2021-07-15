<template>
  <base-layout>
    <v-container>
      <div class="text-center">
        <h1>Covid-19 Chart</h1>
      </div>
      <v-row v-if="arrConfirmed.length > 0">
        <v-col>
          <div class="small">
            <h2>Confirmed</h2>
            <line-chart
              :chartData="arrConfirmed"
              :options="chartOptions"
              :chartColor="confirmedChartColor"
              label="Confirmed"
            ></line-chart>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="arrDeaths.length > 0">
        <v-col>
          <div class="small">
            <h2>Deaths</h2>
            <line-chart
              :chartData="arrDeaths"
              :options="chartOptions"
              :chartColor="deathsChartColor"
              label="Deaths"
            ></line-chart>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </base-layout>
</template>

<script>
import LineChart from '../components/LineChart.vue'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'Home',
  components: { LineChart },
  data() {
    return {
      datacollection: null,
      // arrPositive: [],
      arrConfirmed: [],
      arrHospitalized: [],
      arrRecovered: [],
      arrDeaths: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      confirmedChartColor: {
        backgroundColor: 'rgba(54,73,93,.5)',
        borderColor: '#36495d',
        borderWidth: 3,
      },
      deathsChartColor: {
        backgroundColor: '',
        borderColor: 'red',
        borderWidth: 3,
      },
    }
  },
  async mounted() {
    try {
      // const { data } = await axios.get('/data.json/')
      const { data } = await axios.get(
        'https://covid19.th-stat.com/json/covid19v2/getTimeline.json'
      )
      data.Data.forEach((d) => {
        const date = moment(d.Date, 'L').format('MM/DD')

        const { Confirmed, Deaths, Hospitalized, Recovered } = d

        this.arrConfirmed.push({ date, total: Confirmed })
        this.arrDeaths.push({ date, total: Deaths })
        this.arrHospitalized.push({ date, total: Hospitalized })
        this.arrRecovered.push({ date, total: Recovered })
      })
    } catch (error) {
      console.error(error)
    }
  },

  methods: {},
}
</script>
<style>
.small {
  max-width: 600px;
  margin: 0 auto 50px;
}
</style>
