<script>
import { Line, mixins } from 'vue-chartjs'

export default {
  extends: Line,
  mixins: [mixins.reactiveProp],
  data: () => ({
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  }),
  mounted() {
    this.renderChart(this.chartdata, this.options)
  },
}
</script>
