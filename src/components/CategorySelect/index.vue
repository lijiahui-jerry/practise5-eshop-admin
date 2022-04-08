<template>
  <div>
    <el-form
      :inline="true"
      :model="categoryForm"
      class="demo-form-inline">
      <el-form-item
        label="一级分类">
        <el-select
          v-model="categoryForm.id1"
          placeholder="请选择"
          @change="handleChange1()">
          <el-option
            :label="c.name"
            :value="c.id"
            :key="c.id"
            v-for="(c) in categoryList1">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="二级分类">
        <el-select
          v-model="categoryForm.id2"
          placeholder="请选择"
          @change="handleChange2()">
          <el-option
            :label="c.name"
            :value="c.id"
            :key="c.id"
            v-for="(c) in categoryList2">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item
        label="三级分类">
        <el-select
          v-model="categoryForm.id3"
          placeholder="请选择"
          @change="handleChange3()">
          <el-option
            :label="c.name"
            :value="c.id"
            :key="c.id"
            v-for="(c) in categoryList3">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    handleChange1() {
      const {id1} = this.categoryForm
      this.categoryList2 = []
      this.categoryForm.id2 = undefined
      this.categoryList3 = []
      this.categoryForm.id3 = undefined

      this.getCategoryList2(id1)
    },
    handleChange2() {
      const {id2} = this.categoryForm
      this.categoryList3 = []
      this.categoryForm.id3 = undefined

      this.getCategoryList3(id2)
    },
    handleChange3() {
      const {id1, id2, id3} = this.categoryForm

      this.getAttributeList(id1, id2, id3)
    },
    async getCategoryList1() {
      let result = await this.$API.attribute.reqCategoryList1()

      if (result.code === 200 || result.code === 20000) {
        this.categoryList1 = result.data
      }
    },
    async getCategoryList2(id) {
      let result = await this.$API.attribute.reqCategoryList2(id)

      if (result.code === 200 || result.code === 20000) {
        this.categoryList2 = result.data
      }
    },
    async getCategoryList3(id) {
      let result = await this.$API.attribute.reqCategoryList3(id)

      if (result.code === 200 || result.code === 20000) {
        this.categoryList3 = result.data
      }
    },
    async getAttributeList(id1, id2, id3) {
      let result = await this.$API.attribute.reqAttributeList(id1, id2, id3)

      if (result.code === 200 || result.code === 20000) {
        this.$emit('getAttributeListEvent', result.data)
      }
    }
  },
  data() {
    return {
      categoryList1: [],
      categoryList2: [],
      categoryList3: [],

      categoryForm: {
        id1: undefined,
        id2: undefined,
        id3: undefined,
      },
    }
  },
  mounted() {
    this.getCategoryList1()
    this.$emit('getCategoryFormEvent', this.categoryForm)
  },
  name: "CategorySelect",
}
</script>

<style scoped>

</style>
