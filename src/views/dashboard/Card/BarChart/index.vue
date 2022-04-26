<template>
  <div class="echarts" ref="barChart">

  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  mounted() {
    let chart = echarts.init(this.$refs.barChart)

    chart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'bar',
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44, 33, 22, 8],
          color: 'cyan'
        }
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
      tooltip: {},
    })
  },
  name: "BarChart",
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
