<template>
  <div class="echarts" ref="progressChart">
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  mounted() {
    let chart = echarts.init(this.$refs.progressChart)

    chart.setOption({
      xAxis: {
        show: false,
        min: 0,
        max: 100
      },
      yAxis: {
        show: false,
        type: 'category'
      },
      series: [
        {
          type: 'bar',
          data: [78],
          color: 'yellowgreen',
          barWidth: 10,
          showBackground: true,
          backgroundStyle: {
            color: '#eeeeee',
          },
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
  name: "ProgressChart",
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
