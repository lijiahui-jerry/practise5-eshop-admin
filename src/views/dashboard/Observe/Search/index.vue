<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <div
        style="display: flex;justify-content: space-between;">
        <span>线上热门搜索</span>
        <el-dropdown>
          <span class="el-dropdown-link">
             <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>双皮奶</el-dropdown-item>
            <el-dropdown-item>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>

    <div>
      <el-row :gutter="10">
        <el-col :span="12">
          <LineChart/>
        </el-col>

        <el-col :span="12">
          <LineChart/>
        </el-col>
      </el-row>
    </div>

    <el-table
      :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
      style="width: 100%;margin-top: 10px"
      border>
      <el-table-column
        type="index"
        label="排名"
        width="80">
      </el-table-column>

      <el-table-column
        prop="name"
        label="搜索关键字"
        width="180">
      </el-table-column>

      <el-table-column
        prop="address"
        sortable
        label="用户数">
      </el-table-column>

      <el-table-column
        prop="address"
        sortable
        label="周涨幅">
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align: right"
      layout="prev, pager, next"
      :total="50">
    </el-pagination>
  </el-card>
</template>

<script>
import LineChart from './LineChart'

export default {
  components: {
    LineChart
  },
  name: "Search"
}
</script>

<style scoped>

</style>
