<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <Detail title="总销售额" count="￥1561562">
            <template slot="charts">
              <span>周同比56.67%&nbsp;<i class="el-icon-arrow-up"/></span>
              <span>&nbsp;&nbsp;&nbsp;周同比56.67%&nbsp;<i class="el-icon-arrow-down"/></span>
            </template>

            <template slot="footer">
              <span>日销售额<i class="el-icon-money"/>15632</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <Detail title="访问量" count="88460">
            <template slot="charts">
              <LineChart/>
            </template>

            <template slot="footer">
              <span>日访问量&nbsp;1561561</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <Detail title="支付笔数" count="948965">
            <template slot="charts">
              <BarChart/>
            </template>

            <template slot="footer">
              <span>转换率&nbsp;15%</span>
            </template>
          </Detail>
        </el-card>
      </el-col>

      <el-col :span="6">
        <el-card class="box-card">
          <Detail title="运营活动效果" count="156%">
            <template slot="charts">
              <ProgressChart/>
            </template>

            <template slot="footer">
              <span>周同比56.67%&nbsp;<i class="el-icon-arrow-up"/></span>
              <span>&nbsp;&nbsp;&nbsp;周同比56.67%&nbsp;<i class="el-icon-arrow-down"/></span>
            </template>
          </Detail>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Detail from './Detail'
import LineChart from './LineChart'
import BarChart from './BarChart'
import ProgressChart from './ProgressChart'

export default {
  name: "Card",
  components: {Detail, LineChart, BarChart, ProgressChart}
}
</script>

<style scoped>

</style>
