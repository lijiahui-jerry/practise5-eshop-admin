<template>
  <div>
    <el-card
      class="box-card"
      style="margin:20px 0;">
      <CategorySelect
        ref="componentCategorySelect"
        @getCategoryFormEvent="getCategoryFormEvent"
        :able="scene===0"/>
    </el-card>

    <el-card
      class="box-card">
      <div v-show="scene===0">
        <el-button
          type="primary"
          icon="el-icon-plus"
          :disabled="!categoryForm.id3"
          @click="addSPU">
          添加SPU
        </el-button>

        <el-table
          :data="dataList"
          style="width: 100%;margin: 20px 0;"
          border>
          <el-table-column
            type="index"
            label="序号"
            width="80"/>

          <el-table-column
            prop="spuName"
            label="SPU名称"
            width="width"/>

          <el-table-column
            prop="description"
            label="SPU描述"
            width="width"/>

          <el-table-column
            prop="prop"
            label="操作"
            width="width">
            <template
              slot-scope="{row}">
              <!-- 仅练习，elbutton中直接写title也可以 -->
              <HintButton
                type="success"
                icon="el-icon-plus"
                size="mini"
                title="添加sku"
                @click="addSKU(row)"/>

              <ElButton
                type="warning"
                icon="el-icon-edit"
                size="mini"
                title="修改spu"
                @click="updateSPU(row)"/>

              <ElButton
                type="info"
                icon="el-icon-info"
                size="mini"
                title="查看当前spu的全部sku列表"
                @click="handleObseve(row)"/>

              <el-popconfirm
                style="margin-left:10px"
                confirm-button-text='确定'
                cancel-button-text='算了'
                icon="el-icon-info"
                icon-color="red"
                title="确定删除这个SPU吗？"
                @onConfirm="deleteSPU(row)">
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
          style="text-align: center"
          :current-page.sync="page"
          :page-sizes="[3,5,10]"
          :page-size.sync="limit"
          :total="total"
          layout="prev, pager, next,jumper,->,sizes,total"
          @size-change="getSPUList"
          @current-change="getSPUList"/>
      </div>

      <SPUForm v-show="scene===1" @sceneChange="handleSceneChange" ref="SPUForm"/>

      <SKUForm v-show="scene===2" @sceneChange="handleSceneChange" ref="SKUForm"/>
    </el-card>

    <el-dialog
      :title="`${SPU.spuName}的SKU列表`"
      :visible.sync="dialogVisible"
      :before-close="handleClose">
      <el-table
        :data="SKUList"
        style="width: 100%"
        v-loading="loading"
        border>
        <el-table-column
          prop="skuName"
          label="名称">
        </el-table-column>

        <el-table-column
          prop="price"
          label="价格"
          width="150">
        </el-table-column>

        <el-table-column
          prop="weight"
          label="重量"
          width="100">
        </el-table-column>

        <el-table-column
          label="默认图片"
          width="150">
          <template slot-scope="{row}">
            <img :src="row.skuDefaultImg" style="width: 100%;aspect-ratio:1/1">
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SKUForm from './skuForm'
import SPUForm from './spuForm'

export default ({
  name: "SPU",
  methods: {
    handleClose(done) {
      this.loading = true
      this.SKUList = []

      done()
    },
    async handleObseve(row) {
      this.dialogVisible = true
      this.SPU = row

      let res = await this.$API.sku.reqSKUById(row.id)

      if (res.code === 200) {
        this.SKUList = res.data
        this.loading = false
      }
    },
    addSKU(row) {
      this.scene = 2

      this.$refs.SKUForm.getFormData(this.categoryForm.id1, this.categoryForm.id2, row)
    },
    async deleteSPU(row) {
      let res = await this.$API.spu.reqDeleteSPU(row.id)
      if (res.code === 200) {
        this.$message.success('删除成功')
        if (this.dataList.length <= 1) {
          this.page--
        }
        await this.getSPUList()
      }
    },
    handleSceneChange({scene, flag}) {
      this.scene = scene
      if (flag === '修改') {
        this.getSPUList()
      } else {
        this.page = 1
        this.getSPUList()
      }
    },
    updateSPU(row) {
      this.scene = 1

      this.$refs.SPUForm.getFormData(row)
    },
    addSPU() {
      this.scene = 1

      this.$refs.SPUForm.addSPU(this.categoryForm.id3)
    },
    getCategoryFormEvent(categoryForm) {
      this.categoryForm = categoryForm
      this.getSPUList()
    },
    async getSPUList() {
      const {page, limit, categoryForm} = this

      let res = await this.$API.spu.reqSPUList(page, limit, categoryForm.id3)

      if (res.code === 200 || res.code === 20000) {
        this.dataList = res.data.records
        this.total = res.data.total
      }
    },
  },
  data() {
    return {
      loading: true,

      dialogVisible: false,
      SPU: {},
      SKUList: [],

      categoryForm: {},

      dataList: [],

      page: 1,
      limit: 3,
      total: 0,

      // 0为默认状态，1为添加或修改spu，2为添加sku
      scene: 0,
    }
  },
  components: {
    SKUForm,
    SPUForm,
  }
})
</script>

<style scoped>

</style>
