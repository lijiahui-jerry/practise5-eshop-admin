<template>
  <div>
    <el-form ref="form" label-width="80px" :model="SPU">
      <el-form-item label="SPU名称">
        <el-input placeholder="SPU名称" v-model="SPU.spuName"/>
      </el-form-item>

      <el-form-item label="品牌">
        <el-select v-model="SPU.tmId" placeholder="请选择品牌">
          <el-option
            v-for="tm in trademarkList"
            :label="tm.tmName"
            :value="tm.id"
            :key="tm.id"/>
        </el-select>
      </el-form-item>

      <el-form-item label="SPU描述">
        <el-input type="textarea" v-model="SPU.description" rows="4" placeholder="SPU描述"></el-input>
      </el-form-item>

      <el-form-item label="SPU图片">
        <el-upload
          action="/dev-api/admin/product/fileUpload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="handleUpload"
          :file-list="spuImageList">
          <i class="el-icon-plus"/>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

      <el-form-item label="销售属性">
        <el-select
          v-model="attrId"
          :placeholder='attrUnselected.length===0?"没有更多选择":`还有${attrUnselected.length}个未选择`'>
          <el-option
            v-for="unselect in attrUnselected"
            :key="unselect.id"
            :value='`${unselect.id}:${unselect.name}`'
            :label="unselect.name"/>
        </el-select>

        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin: 0 10px"
          :disabled="!attrId"
          @click="addSaleAttr">
          添加销售属性
        </el-button>

        <el-table
          :data="SPU.spuSaleAttrList"
          style="width: 100%;margin-top:20px;"
          border>
          <el-table-column
            type="index"
            label="序号"
            width="80"/>

          <el-table-column
            prop="saleAttrName"
            label="属性名"
            width="180"/>

          <el-table-column
            prop="prop"
            label="属性值名称列表">
            <template slot-scope="{row}">
              <el-tag
                :key="tag.id"
                v-for="(tag,index) in row.spuSaleAttrValueList"
                closable
                :disable-transitions="false"
                @close="row.spuSaleAttrValueList.splice(index,1)">
                {{ tag.saleAttrValueName }}
              </el-tag>

              <el-input
                class="input-new-tag"
                v-if="row.inputVisible"
                v-model="row.inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="$event.target.blur()"
                @blur="handleInputConfirm(row)"/>

              <el-button
                v-else
                class="button-new-tag"
                size="small"
                @click="addSaleAttrValue(row)">添加
              </el-button>
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作">
            <template slot-scope="{row,$index}">
              <el-button
                type="danger"
                size="mini"
                @click='SPU.spuSaleAttrList.splice($index,1)'>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleFormSave">保存</el-button>
        <el-button @click="emitEvent">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    async addSPU(category3Id) {
      this.SPU.category3Id = category3Id

      let resTrademarkLiST = await this.$API.spu.reqTrademarkList()
      if (resTrademarkLiST.code === 200) {
        this.trademarkList = resTrademarkLiST.data
      }

      let resSaleAttrList = await this.$API.spu.reqBaseSaleAttrList()
      if (resSaleAttrList.code === 200) {
        this.saleAttrList = resSaleAttrList.data
      }


    },
    emitEvent() {
      this.$emit('sceneChange', {
        scene: 0,
        flag: this.SPU.id ? '修改' : '添加'
      })

      Object.assign(this._data, this.$options.data())
    },
    async handleFormSave() {
      this.SPU.spuImageList = this.spuImageList.map(item => {
        return {
          imgName: item.name,
          imgUrl: (item.response && item.response.data) || item.url
        }
      })

      let res = await this.$API.spu.reqUpdateSPU(this.SPU)

      if (res.code === 200) {
        this.$message.success('保存成功')

        this.emitEvent()
      }
    },
    addSaleAttrValue(row) {
      this.$set(row, 'inputVisible', true)
      this.$set(row, 'inputValue', '')
    },
    handleInputConfirm(row) {
      const {baseSaleAttrId} = row

      const inputValue = row.inputValue.trim()
      // 判断属性值是否为空
      if (inputValue.trim() === '') {
        this.$message.error('属性值不能为空')
        return
      }

      // 判断属性值是否重复
      let result = row.spuSaleAttrValueList.every(item => item.saleAttrValueName !== inputValue)
      if (!result) {
        this.$message.error('属性值不能重复')
        return
      }

      let newSaleAttrValue = {baseSaleAttrId, saleAttrValueName: inputValue}
      row.spuSaleAttrValueList.push(newSaleAttrValue)
      row.inputVisible = false
    },
    addSaleAttr() {
      const [baseSaleAttrId, saleAttrName] = this.attrId.split(':')
      let newSaleAttr = {
        baseSaleAttrId: baseSaleAttrId.trim(),
        saleAttrName: saleAttrName.trim(),
        spuSaleAttrValueList: []
      }

      this.SPU.spuSaleAttrList.push(newSaleAttr)
      this.attrId = undefined
    },
    async getFormData(spu) {
      let resSPUById = await this.$API.spu.reqSPUById(spu.id)
      if (resSPUById.code === 200) {
        this.SPU = resSPUById.data
      }

      let resTrademarkList = await this.$API.spu.reqTrademarkList()
      if (resTrademarkList.code === 200) {
        this.trademarkList = resTrademarkList.data
      }

      let resImageList = await this.$API.spu.reqImageList(spu.id)
      if (resImageList.code === 200) {
        let listArr = resImageList.data

        listArr.forEach(item => {
          item.name = item.imgName
          item.url = item.imgUrl
        })

        this.spuImageList = listArr
      }

      let resBaseSaleAttrList = await this.$API.spu.reqBaseSaleAttrList()
      if (resBaseSaleAttrList.code === 200) {
        this.saleAttrList = resBaseSaleAttrList.data
      }
    },
    handleUpload(res, file, fileList) {
      this.spuImageList = fileList
    },
    handleRemove(file, fileList) {
      this.spuImageList = fileList
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },
  name: "SPUForm",
  computed: {
    attrUnselected() {
      return this.saleAttrList.filter(item => {
        return this.SPU.spuSaleAttrList.every(i => {
          return i.saleAttrName.trim() !== item.name.trim()
        })
      })
    }
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,

      SPU: {
        category3Id: undefined,
        description: '',
        spuName: '',
        tmId: undefined,
        spuImageList: [],
        spuSaleAttrList: [],
      },

      trademarkList: [],
      saleAttrList: [],
      spuImageList: [],

      attrId: undefined,
    }
  },
}
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}

.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}

.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
</style>
