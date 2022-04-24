<template>
  <div>
    <el-card
      style="margin: 20px 0;">
      <CategorySelect
        ref="componentCategorySelect"
        @getAttributeListEvent="getAttributeListEvent"
        @getCategoryFormEvent="getCategoryFormEvent"
        :able="this.tableVisible">
      </CategorySelect>
    </el-card>
    <el-card>
      <div
        v-show=" this.tableVisible ">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 10px"
          :disabled="!categoryForm.id3"
          @click="attributeAdd()">
          添加属性
        </el-button>

        <el-table
          :data="attributeList"
          border
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>

          <el-table-column
            prop="attrName"
            label="属性名称"
            width="150">
          </el-table-column>

          <el-table-column
            prop="attrValueList"
            label="属性值列表">
            <template
              slot-scope="scope">
              <el-tag
                type="success"
                style="margin-right: 5px;"
                v-for="attrValue in scope.row.attrValueList"
                :key="attrValue.id">
                {{ attrValue.valueName }}
              </el-tag>
            </template>
          </el-table-column>

          <el-table-column
            prop="address"
            label="操作"
            width="150"
            align="center">
            <template
              slot-scope="scope">
              <el-button
                type="warning"
                icon="el-icon-edit"
                size="mini"
                @click="handleEdit(scope.row)">
              </el-button>

              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div
        v-show="!this.tableVisible">
        <el-form
          status-icon
          ref="ruleForm"
          label-width="80px">
          <el-form-item
            label-width="60px"
            label="属性名">
            <el-input
              v-model="attributeInfo.attrName"
              style="width: 20%;"
              placeholder="请输入属性名">
            </el-input>
          </el-form-item>
        </el-form>

        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 10px"
          :disabled="!attributeInfo.attrName"
          @click="attributeValueAdd()">
          添加属性值
        </el-button>

        <el-button
          @click="toggleTableVisible()">
          取消
        </el-button>

        <el-table
          :data="attributeInfo.attrValueList"
          border
          style="width: 50%;">
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center">
          </el-table-column>

          <el-table-column
            label="属性值"
            width="width">
            <template
              slot-scope="scope">
              <el-input
                v-if="scope.row.flag"
                v-model="scope.row.valueName"
                v-focus
                autofocus
                placeholder="请输入属性值"
                size="mini"
                @blur="scope.row.flag=false"
                @keyup.native.enter="scope.row.flag=false">
              </el-input>

              <div
                v-if="!scope.row.flag"
                @click="scope.row.flag=true">
                {{ scope.row.valueName }}
              </div>
            </template>
          </el-table-column>

          <el-table-column
            label="操作"
            align="center"
            width="150">
            <template
              slot-scope="scope">
              <el-popconfirm
                @onConfirm="handleDelete(scope.$index)"
                :title="`确定删除[${scope.row.valueName}]吗`">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  slot="reference">
                </el-button>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          style="margin-top: 20px;"
          type="primary"
          :disabled="!attributeInfo.attrName"
          @click="attributeValueUpdate">
          保存
        </el-button>

        <el-button
          type="danger"
          @click="toggleTableVisible()">
          取消
        </el-button>
      </div>
    </el-card>
  </div>

</template>

<script>
import cloneDeep from 'lodash/cloneDeep'

export default ({
  methods: {
    // 确认添加属性
    async attributeValueUpdate() {
      this.attributeInfo.attrValueList = this.attributeInfo.attrValueList.filter(item => {
        if (item.valueName.trim() !== '') {
          delete item.flag
          return true
        }
      })

      try {
        await this.$API.attribute.reqAttributeNameAdd(this.attributeInfo)
        this.toggleTableVisible()
        await this.getAttributeList(this.categoryForm.id1, this.categoryForm.id2, this.categoryForm.id3)
        this.$message({type: 'success', message: '保存成功'})
      } catch (e) {
      }
    },
    // 取消添加属性值
    attributeValueAddCancel() {
      this.toggleTableVisible()
    },
    // 添加属性值
    attributeValueAdd() {
      this.attributeInfo.attrValueList.push({
        attrId: this.attributeInfo.id,
        id: undefined,
        valueName: '',
        // 用于控制属性值显示为input还是div，true为input，false为div
        flag: true,
      })
    },
    // 添加一个属性
    attributeAdd() {
      this.attributeInfo = {
        attrName: undefined,
        attrValueList: [],
        categoryId: this.categoryForm.id3,
        categoryLevel: 3,
      }
      this.toggleTableVisible()
    },
    handleDelete(index) {
      this.attributeInfo.attrValueList.splice(index, 1)
    },
    // 编辑属性
    handleEdit(row) {
      this.toggleTableVisible()

      this.attributeInfo = cloneDeep(row)
    },
    getAttributeListEvent(attributeList) {
      this.attributeList = attributeList
    },
    getCategoryFormEvent(categoryForm) {
      this.categoryForm = categoryForm
      this.getAttributeList(categoryForm.id1, categoryForm.id2, categoryForm.id3)
    },
    toggleTableVisible() {
      this.tableVisible = !this.tableVisible
    },
    async getAttributeList(id1, id2, id3) {
      let result = await this.$API.attribute.reqAttributeList(id1, id2, id3)

      if (result.code === 200 || result.code === 20000) {
        // this.$emit('getAttributeListEvent', result.data)
        this.getAttributeListEvent(result.data)
      }
    }
  },
  data() {
    return {
      attributeInfo: {
        attrName: undefined,
        attrValueList: [],
        categoryId: undefined,
        categoryLevel: 3,
      },

      newAttribute: undefined,

      // 控制当前表格的显示，true为显示属性，false为添加属性
      tableVisible: true,

      form: [],

      attributeList: undefined,

      categoryForm: {
        id1: undefined,
        id2: undefined,
        id3: undefined,
      },
    }
  },
  name: "Attribute",
})
</script>

<style scoped>

</style>
