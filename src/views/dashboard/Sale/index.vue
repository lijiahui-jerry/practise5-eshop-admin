<template>
  <div style="margin: 20px 0">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-tabs class="header-left" v-model="activeName">
          <el-tab-pane label="销售额" name="sale"></el-tab-pane>
          <el-tab-pane label="访问量" name="visit"></el-tab-pane>
        </el-tabs>

        <div class="header-right">
          <span @click="setToday">今日</span>
          <span @click="setWeek">本周</span>
          <span @click="setMonth">本月</span>
          <span @click="setYear">本年</span>

          <el-date-picker
            v-model="date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
            value-format="yyyy-MM-dd"
            style="width: 250px;margin-left: 10px"/>
        </div>
      </div>

      <div>
        <el-row :gutter="10">
          <el-col :span="18">
            <div class="chart" ref="barChartInSale"/>
          </el-col>

          <el-col :span="6">
            <div class="rank">
              <h3>门店{{ title }}排名</h3>
              <ul>
                <li>
                  <span class="rank-index">1</span>
                  <span>肯德基</span>
                  <span class="rank-value">1566</span>
                </li>
                <li>
                  <span class="rank-index">2</span>
                  <span>肯德基</span>
                  <span class="rank-value">1566</span>
                </li>
                <li>
                  <span class="rank-index">3</span>
                  <span>肯德基</span>
                  <span class="rank-value">1566</span>
                </li>
                <li>
                  <span class="">4</span>
                  <span>肯德基</span>
                  <span class="rank-value">1566</span>
                </li>
                <li>
                  <span class="">5</span>
                  <span>肯德基</span>
                  <span class="rank-value">1566</span>
                </li>
                <li>
                  <span class="">6</span>
                  <span>肯德基</span>
                  <span class="rank-value">1566</span>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import echarts from 'echarts'
import dayjs from 'dayjs'
import {mapState} from "vuex";

export default {
  methods: {
    setYear() {
      const start = dayjs().startOf('year').format('YYYY-MM-DD')
      const end = dayjs().endOf('year').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setMonth() {
      const start = dayjs().startOf('month').format('YYYY-MM-DD')
      const end = dayjs().endOf('month').format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setWeek() {
      const start = dayjs().day(1).format('YYYY-MM-DD')
      const end = dayjs().day(7).format('YYYY-MM-DD')
      this.date = [start, end]
    },
    setToday() {
      const day = dayjs().format('YYYY-MM-DD')
      this.date = [day, day]
    }
  },
  mounted() {
    this.$store.dispatch('home/getData')

    this.myChart = echarts.init(this.$refs.barChartInSale)

    this.myChart.setOption({
      title: {
        text: this.title + '趋势',
      },
      xAxis: {
        type: 'category',
        data: [],
        axisTick: {
          alignWithLabel: true,
        }
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [],
          color: 'purple'
        }
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        }
      },
    })
  },
  watch: {
    dataList() {
      const {dataList} = this
      this.myChart.setOption({
        title: {
          text: '销售额趋势'
        },
        xAxis: {
          data: dataList.orderFullYearAxis,
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: dataList.orderFullYear,
            color: 'purple'
          }
        ],
      })
    },
    title(newValue) {
      this.myChart.setOption({
        title: {
          text: newValue + '趋势'
        },
        xAxis: {
          data: this.title === '销售额'
            ? this.dataList.orderFullYearAxis
            : this.dataList.userFullYearAxis
        },
        series: [
          {
            name: 'Direct',
            type: 'bar',
            barWidth: '60%',
            data: this.title === '销售额'
              ? this.dataList.orderFullYear
              : this.dataList.userFullYear,
            color: 'purple'
          }
        ],
      })
    }
  },
  computed: {
    ...mapState({
      dataList: state => state.home.list
    }),
    title() {
      return this.activeName === 'sale' ? '销售额' : '访问量';
    }
  },
  data() {
    return {
      activeName: 'sale',

      myChart: null,

      date: []
    }
  },
  name: "Sale"
}
</script>

<style scoped>
>>> .el-card__header {
  border-bottom: none;
}

.clearfix {
  /*display: flex;*/
  /*justify-content: space-between;*/
  position: relative;
}

.clearfix::after {
  display: none;
}

.header-left {
  width: 100%;
}

.header-right {
  position: absolute;
  right: 0;
  top: 0;
  /*float: right;*/
}

.header-right span {
  margin: 0 10px;
}

.chart {
  width: 100%;
  height: 300px;
}

ul {
  list-style: none;
  width: 100%;
  height: 300px;
  padding: 0;
}

ul li {
  height: 8%;
  margin: 10px 0;
}

.rank-index {
  float: left;
  font-size: 18px;
  text-align: center;
  border-radius: 50%;
  height: 20px;
  line-height: 20px;
  width: 20px;
  background-color: #000000;
  color: #ffffff;
}

.rank-value {
  float: right;
}
</style>
