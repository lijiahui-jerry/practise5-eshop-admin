<template>
  <div>
    <div class="header">
      <span>搜索用户数量<i class="el-icon-info"/></span>
    </div>

    <div class="content">
      <span style="font-size: 20px;">151648</span>
      <span style="margin-left: 20px;color: #777777">17.1<i class="el-icon-arro `w-up"/></span>
    </div>

    <div class="footer">
      <div class="chart" ref="lineChartInSearchOfObserve"/>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  mounted() {
    let lineChart = echarts.init(this.$refs.lineChartInSearchOfObserve)

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
          lineStyle: {
            color: 'blue',
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
                  color: 'blue'
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
        left: 10,
        right: 10,
        top: 0,
        bottom: 0,
      },
    })
  },
  name: "LineChart"
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 50px;
}
</style>
