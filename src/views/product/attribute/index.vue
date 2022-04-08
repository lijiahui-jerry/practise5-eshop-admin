<template>
  <div>
    <el-card
      style="margin: 20px 0;">
      <CategorySelect
        ref="componentCategorySelect"
        @getAttributeListEvent="getAttributeListEvent"
        @getCategoryFormEvent="getCategoryFormEvent">
      </CategorySelect>
    </el-card>
    <el-card>
      <div
        v-show=" this.tableVisible ">
        <el-button
          type="primary"
          icon="el-icon-plus"
          style="margin-bottom: 10px"
          :disabled="!this.categoryForm.id3"
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
                v-for="(attrValue) in scope.row.attrValueList"
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
              <!--              <el-button-->
              <!--                type="warning"-->
              <!--                icon="el-icon-edit"-->
              <!--                size="mini"-->
              <!--                @click="handleEdit(scope.row)">-->
              <!--              </el-button>-->

              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="handleDelete(scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-button
          style="margin-top: 20px;"
          type="primary"
          :disabled="!attributeInfo.attrName"
          @click="attributeValueAddSubmit()">
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
    attributeValueAddSubmit() {
      console.log('attrValueSubmit')
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
        valueName: undefined,
        // 用于控制属性值显示为input还是div，true为，false为
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
    handleDelete(row) {
      this.toggleTableVisible()

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
    },
    toggleTableVisible() {
      this.tableVisible = !this.tableVisible
    },
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
