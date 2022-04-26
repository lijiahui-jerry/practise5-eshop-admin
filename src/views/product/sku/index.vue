<template>
  <div>
    <el-table
      :data="records"
      border
      style="width: 100%">
      <el-table-column
        type="index"
        label="序号"
        width="60">
      </el-table-column>

      <el-table-column
        prop="skuName"
        label="名称">
      </el-table-column>

      <el-table-column
        prop="skuDesc"
        label="描述">
      </el-table-column>

      <el-table-column
        label="默认图片"
        width="80">
        <template slot-scope="{row}">
          <img :src="row.skuDefaultImg" style="width: 100%;aspect-ratio:1/1">
        </template>
      </el-table-column>

      <el-table-column
        prop="weight"
        label="重量"
        width="80">
      </el-table-column>

      <el-table-column
        prop="price"
        label="价格"
        width="80">
      </el-table-column>

      <el-table-column
        label="操作">
        <template
          slot-scope="{row}">
          <el-button
            v-if="row.isSale===1"
            type="success"
            icon="el-icon-sort-down"
            size="mini"
            @click="downSale(row)"/>

          <el-button
            v-else
            type="success"
            icon="el-icon-sort-up"
            size="mini"
            @click="upSale(row)"/>

          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="handleEdit"/>

          <el-button
            type="info"
            icon="el-icon-info"
            size="mini"
            @click="getSKUInfo(row)"/>

          <el-popconfirm
            style="margin-left:10px"
            confirm-button-text='确定'
            cancel-button-text='算了'
            icon="el-icon-info"
            icon-color="red"
            title="确定删除这个SPU吗？">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              title="删除SPU"
              slot="reference"/>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="text-align: center;"
      layout="prev, pager, next,jumper,->,sizes,total"
      :current-page.sync="page"
      :page-sizes="[3,5,10]"
      :page-size="limit"
      :total="total"
      @current-change="getSKUList"
      @size-change="handleSizeChange">
    </el-pagination>

    <el-drawer
      :visible.sync="drawerShow"
      :show-close="false"
      size="50%"
      @closed="SKUInfo={}">
      <el-row>
        <el-col :span="5">名称</el-col>
        <el-col :span="16">{{ SKUInfo.skuName }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">描述</el-col>
        <el-col :span="16">{{ SKUInfo.skuDesc }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">价格</el-col>
        <el-col :span="16">{{ SKUInfo.price }}</el-col>
      </el-row>

      <el-row>
        <el-col :span="5">平台属性</el-col>
        <el-col :span="16">
          <el-tag
            v-for="attr in SKUInfo.skuAttrValueList"
            :key="attr.id"
            type="success"
            style="margin-right: 10px;">
            {{ attr.attrId }}-{{ attr.attrName }}
          </el-tag>
        </el-col>
      </el-row>

      <el-row v-if="carouselIfShow">
        <el-col :span="5">商品图片</el-col>
        <el-col :span="16">
          <el-carousel height="150px">
            <el-carousel-item v-for="item in SKUInfo.skuImageList" :key="item.id">
              <img :src="item.imgUrl">
            </el-carousel-item>
          </el-carousel>
        </el-col>
      </el-row>
    </el-drawer>
  </div>
</template>

<script>

export default ({
  name: "SKU",
  methods: {
    async getSKUInfo(sku) {
      let res = await this.$API.sku.reqSKUDetailById(sku.id)

      if (res.code === 200) {
        this.SKUInfo = res.data
        this.drawerShow = true
      } else {
        this.$message.error('出错！')
      }
    },
    handleEdit() {
      this.$message('正在开发中')
    },
    async downSale(row) {
      let res = await this.$API.sku.reqCancel(row.id)

      if (res.code === 200) {
        row.isSale = 0
        this.$message.success('下架成功')
      }
    },
    async upSale(row) {
      let res = await this.$API.sku.reqSale(row.id)

      if (res.code === 200) {
        row.isSale = 1
        this.$message.success('上架成功')
      }
    },
    handleSizeChange(size) {
      this.limit = size
      this.page = 1
      this.getSKUList()
    },
    async getSKUList() {
      const {page, limit} = this

      let res = await this.$API.sku.reqSKUList(page, limit)
      if (res.code === 200) {
        this.total = res.data.total
        this.records = res.data.records
      }
    },
  },
  computed: {
    carouselIfShow() {
      return this.SKUInfo.skuImageList && this.SKUInfo.skuImageList.length;
    }
  },
  data() {
    return {
      drawerShow: false,

      page: 1,
      limit: 10,
      total: 0,

      records: [],

      SKUInfo: {},
    }
  },
  mounted() {
    this.getSKUList()
  }
})
</script>

<style scoped>
>>> .el-carousel__button {
  width: 10px;
  height: 10px;
  background-color: red;
  border-radius: 50%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.el-col-5 {
  font-size: 18px;
  text-align: right;
}

.el-col {
  margin: 10px;
}
</style>
