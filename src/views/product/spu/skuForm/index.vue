<template>
  <div>
    <el-form :model="SKU" label-width="100px">
      <el-form-item label="SPU名称">
        {{ this.SPU.spuName }}
      </el-form-item>

      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="SKU.name"/>
      </el-form-item>

      <el-form-item label="价格（元）">
        <el-input placeholder="价格（元）" v-model="SKU.price" type="number"/>
      </el-form-item>

      <el-form-item label="重量（千克）">
        <el-input placeholder="重量（千克）" v-model="SKU.weight"/>
      </el-form-item>

      <el-form-item label="规格描述">
        <el-input type="textarea" rows="3" v-model="SKU.description" placeholder="请输入描述"/>
      </el-form-item>

      <el-form-item label="平台属性">
        <el-form inline>
          <el-form-item :label="attr.attrName" v-for="attr in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrAndValueId">
              <el-option
                v-for="attrValue in attr.attrValueList"
                :key="attrValue.id"
                :value="`${attr.id}:${attrValue.id}`"
                :label="attrValue.valueName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-form inline>
          <el-form-item :label="saleAttr.saleAttrName" v-for="saleAttr in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.saleAttrAndValueId">
              <el-option
                v-for="saleAttrValue in saleAttr.spuSaleAttrValueList"
                :key="saleAttrValue.id"
                :value="`${saleAttr.id}:${saleAttrValue.id}`"
                :label="saleAttrValue.saleAttrValueName">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>

      <el-form-item label="图片列表">
        <el-table
          :data="spuImageList"
          style="width: 100%;"
          border @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="40"
            align="center"
          >
          </el-table-column>

          <el-table-column
            label="图片"
            width="150"
            align="center">
            <template slot-scope="{row}">
              <img :src="row.imgUrl" style="width: 100%;aspect-ratio:1/1;">
            </template>
          </el-table-column>

          <el-table-column
            prop="imgName"
            label="名称"
            align="center">
          </el-table-column>

          <el-table-column
            label="操作"
            width="200"
            align="center">
            <template slot-scope="{row}">
              <el-button type="primary" @click="setDefault(row)" v-if="row.isDefault===0">设为默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item style="text-align: center">
        <template slot-scope="{row}">
          <el-button type="primary" @click="handleFormSave">添加</el-button>
          <el-button type="danger" @click="emitEvent">取消</el-button>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    async handleFormSave() {
      const {attrInfoList, spuSaleAttrList, SKU, imgList} = this

      attrInfoList.reduce((pre, item) => {
        if (item.attrAndValueId) {
          const [attrId, valueId] = item.attrAndValueId.split(':')

          pre.push({attrId, valueId})
        }

        return pre
      }, [])

      spuSaleAttrList.reduce((pre, item) => {
        if (item.saleAttrAndValueId) {
          const [saleAttrId, saleAttrValueId] = item.saleAttrAndValueId.split(':')

          pre.push({saleAttrId, saleAttrValueId})
        }

        return pre
      }, [])

      SKU.imageList = imgList.map(item => {
        return {
          imgName: item.imgName,
          imgUrl: item.imgUrl,
          isDefault: item.isDefault,
          spuImgId: item.id
        }
      })

      let res = await this.$API.sku.reqAddSKU(SKU)

      if (res.code === 200) {
        this.$message.success('SKU添加成功')
        this.emitEvent()
      }
    },
    setDefault(row) {
      this.spuImageList.forEach(item => {
        item.isDefault = 0
      })

      row.isDefault = 1
    },
    handleSelectionChange(params) {
      this.imgList = params
      console.log(this.imgList)
    },
    async getFormData(category1Id, category2Id, spu) {
      this.SKU.category3Id = spu.category3Id
      this.SKU.name = spu.spuName
      this.SPU = spu

      let resSPUImageList = await this.$API.sku.reqSPUImageList(spu.id)
      if (resSPUImageList.code === 200) {
        let list = resSPUImageList.data

        list.forEach(item => {
          item.isDefault = 0
        })

        this.spuImageList = list
      }

      let resSPUSaleAttrList = await this.$API.sku.reqSPUSaleAttrList(spu.id)
      if (resSPUSaleAttrList.code === 200) {
        this.spuSaleAttrList = resSPUSaleAttrList.data
      }

      let resAttrInfoList = await this.$API.sku.reqAttrInfoList(category1Id, category2Id, spu.id)
      if (resAttrInfoList.code === 200) {
        this.attrInfoList = resAttrInfoList.data
      }
    },
    emitEvent() {
      this.$emit('sceneChange', {
        scene: 0,
        flag: '添加'
      })

      Object.assign(this._data, this.$options.data())
    },
  },
  data() {
    return {
      // 服务器返回
      spuImageList: [],
      spuSaleAttrList: [],
      attrInfoList: [],
      SPU: {},

      // 要上传给服务器的数据
      SKU: {
        category3Id: undefined,
        name: '',
        price: 0,
        weight: '',
        description: '',
        defaultImage: '',
        imageList: [],
        attrValueList: [],
        saleAttrValueList: [],
      },

      // 未处理的临时数据
      imgList: [],
    }
  },
  name: "SKUForm"
}
</script>

<style scoped>

</style>
