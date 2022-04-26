<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div class="category-header">
        <span>销售额类别占比</span>
        <el-radio-group
          style="float: right"
          v-model="value"
          size="mini">
          <el-radio-button label="全部渠道"></el-radio-button>
          <el-radio-button label="线上"></el-radio-button>
          <el-radio-button label="门店"></el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div>
      <div class="chart" ref="pieChartInObserve"></div>
    </div>
  </el-card>
</template>

<script>
import echarts from 'echarts'

export default {
  mounted() {
    let chart = echarts.init(this.$refs.pieChartInObserve)

    chart.setOption({
      title: {
        left: 'center',
        top: 'center',
      },
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'outside'
          },
          labelLine: {
            show: true
          },
          data: [
            {value: 1048, name: '视频'},
            {value: 735, name: 'Direct'},
            {value: 580, name: 'Email'},
            {value: 484, name: 'Union Ads'},
            {value: 300, name: 'Video Ads'}
          ]
        }
      ]
    })

    chart.on('mouseover', params => {
      const {name, value} = params.data

      chart.setOption({
        title: {
          text: name,
          subtext: value
        }
      })
    })
  },
  data() {
    return {
      value: '全部渠道'
    }
  },
  name: "Category"
}
</script>

<style scoped>
.chart {
  width: 100%;
  height: 300px;
}
</style>
