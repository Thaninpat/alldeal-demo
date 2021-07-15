<script>
import { Line } from 'vue-chartjs'
export default {
  extends: Line,
  props: {
    label: {
      type: String,
    },
    chartData: {
      type: Array,
    },
    options: {
      type: Object,
    },
    chartColor: {
      type: Object,
    },
  },
  mounted() {
    const dates = this.chartData.map((d) => d.date).reverse()
    const totals = this.chartData.map((d) => d.total).reverse()

    const { backgroundColor, borderColor, borderWidth } = this.chartColor

    this.renderChart(
      {
        labels: dates,
        datasets: [
          {
            label: this.label,
            data: totals,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
        ],
      },
      this.options
    )
    // this.renderChart(this.chartData, this.options)
  },
}
</script>
// import { Line } from 'vue-chartjs' // export default { // extends: Line, //
data() { // return { // datacollection: { // labels: [ // '1-Apr-21', //
'2-Apr-21', // '3-Apr-21', // '4-Apr-21', // '5-Apr-21', // '6-Apr-21', //
'7-Apr-21', // ], // datasets: [ // { // label: 'Deal Item 1', // data: [0, 0,
2, 10, 5, 8, 1], // backgroundColor: 'rgba(54,73,93,.5)', // borderColor:
'#36495d', // borderWidth: 3, // hoverBackgroundColor: '#f1f1f1', // tension:
0.1, // }, // { // label: 'Deal Item 2', // data: [22, 31, 39, 53, 33, 40,
40.5], // backgroundColor: 'rgba(71, 183,132,.5)', // borderColor: '#47b784', //
borderWidth: 3, // hoverBackgroundColor: '#f1f1f1', // tension: 0.1, // }, // {
// label: 'Deal Item 3', // data: [32, 41.5, 48, 60, 48, 49, 60], //
backgroundColor: 'rgba(59, 227,227,.5)', // borderColor: '#138686', //
borderWidth: 3, // hoverBackgroundColor: '#f1f1f1', // tension: 0.1, // }, // ],
// }, // options: { // // title: { // // display: true, // // text: 'Daily
Summary', // // fontSize: 18, // // }, // legend: { // display: true, //
position: 'bottom', // }, // layout: { // padding: { // left: 0, // right: 0, //
bottom: 50, // top: 0, // }, // }, // scales: { // yAxes: [ // { // ticks: { //
beginAtZero: true, // }, // gridLines: { // display: true, // }, // }, // ], //
xAxes: [ // { // gridLines: { // display: false, // }, // }, // ], //
responsive: true, // maintainAspectRatio: false, // }, // }, // } // }, //
mounted() { // this.renderChart(this.datacollection, this.options) // }, // }
