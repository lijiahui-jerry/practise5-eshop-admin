<template>
  <div>
    <el-form ref="form" label-width="100px">
      <el-form-item label="SPU名称">
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称"></el-input>
      </el-form-item>

      <el-form-item label="价格（元）">
        <el-input placeholder="价格（元）"></el-input>
      </el-form-item>

      <el-form-item label="重量（千克）">
        <el-input placeholder="重量（千克）"></el-input>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" rows="3"></el-input>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form label-width="80px" inline>
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="value">
              <el-option
                value="1"
                label="1"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="无线通信">
            <el-select placeholder="请选择" value="value">
              <el-option
                value="1"
                label="1"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form label-width="80px" inline>
          <el-form-item label="屏幕尺寸">
            <el-select placeholder="请选择" value="value">
              <el-option
                value="1"
                label="1"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table
          :data="[{ date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄' }, { date: '2016-05-04', name: '王小虎', address: '上海市普陀区金沙江路 1517 弄' }]"
          style="width: 100%"
          border>
          <el-table-column
            type="selection"
            width="40">
          </el-table-column>

          <el-table-column
            prop="name"
            label="图片"
            width="180">
          </el-table-column>

          <el-table-column
            prop="address"
            label="名称">
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="{row}">
              <el-button type="primary" size="mini">保存</el-button>
              <el-button type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    async getFormData(category1Id, category2Id, spu) {
      let resSPUImageList = await this.$API.sku.reqSPUImageList(spu.id)
      if (resSPUImageList.code === 200) {
        this.spuImageList = resSPUImageList.data
      }

      let resSPUSaleAttrList = await this.$API.sku.reqSPUSaleAttrList(spu.id)
      if (resSPUSaleAttrList.code === 200) {
        this.spuSaleAttrList = resSPUSaleAttrList.data
      }

      let resAttrInfoList = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, spu.id)
      if (resAttrInfoList.code === 200) {
        this.attrInfoList = resAttrInfoList.data
      }
    }
  },
  data() {
    return {
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
    }
  },
  name: "SKUForm"
}
</script>

<style scoped>

</style>
