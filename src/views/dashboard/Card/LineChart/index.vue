<template>
  <div class="echarts" ref="lineChart">

  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  mounted() {
    let lineChart = echarts.init(this.$refs.lineChart)

    lineChart.setOption({
      xAxis: {
        show: false,
        type: 'category'
      },
      yAxis: {
        show: false
      },
      series: [
        {
          type: 'line',
          smooth: true,
          data: [10, 7, 33, 12, 48, 9, 29, 10, 44],
          itemStyle: {
            opacity: 0,
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: 'purple'
                },
                {
                  offset: 1,
                  color: '#ffffff'
                }
              ],
              global: false,
            },
          }
        }
      ],
      grid: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
      },
    })
  },
  name: "LineChart",
}
</script>

<style scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
