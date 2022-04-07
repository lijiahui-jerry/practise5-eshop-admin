<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-plus"
      style="margin:10px 0"
      @click="showDialog">
      添加品牌
    </el-button>

    <!-- 品牌展示列表（表格组件） -->
    <el-table
      :data="list"
      style="width:100%;"
      border>
      <el-table-column
        type="index"
        label="序号"
        width="80px"
        align="center">
      </el-table-column>

      <el-table-column
        prop="tmName"
        label="品牌名称"
        width="width">
      </el-table-column>

      <el-table-column
        prop="logoUrl"
        label="品牌LOGO"
        width="width">
        <template slot-scope="scope">
          <img
            :src="scope.row.logoUrl"
            :key="scope.$index"
            style="width: 100px;aspect-ratio: 1/1;">
        </template>
      </el-table-column>

      <el-table-column
        prop="prop"
        label="操作"
        width="width">
        <template slot-scope="scope">
          <el-button
            type="warning"
            icon="el-icon-edit"
            size="mini"
            @click.native="updateOneTrademark(scope.row)">
            修改
          </el-button>

          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页器 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="limit"
      :page-sizes="[3,5,10]"
      @current-change="getList"
      @size-change="handleSizeChange"
      layout="prev,pager,next,jumper,->,sizes,total"
      style="text-align: center;margin-top: 10px;">
    </el-pagination>

    <!-- 对话框（点击添加品牌后显示） -->
    <el-dialog
      :title="this.trademarkForm.id?'修改品牌':'添加品牌'"
      :visible.sync="dialogFormVisible"
      destroy-on-close
    >
      <el-form
        :model="trademarkForm"
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        style="width: 80%;">
        <el-form-item
          label="品牌名称"
          label-width="100px"
          prop="tmName">
          <el-input
            v-model="trademarkForm.tmName"
            autocomplete="off"
            clearable>
          </el-input>
        </el-form-item>

        <el-form-item
          label="品牌LOGO"
          label-width="100px"
          prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/dev-api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img
              class="avatar"
              v-if="this.trademarkForm.logoUrl"
              :src="this.trademarkForm.logoUrl">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible=false">取 消</el-button>
        <el-button type="primary" @click="handleDialogSubmit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>

export default ({
  name: "Trademark",
  created() {
    // 获取列表数据
    this.getList()
  },
  methods: {
    // 添加或修改品牌页面点击确定后的处理
    handleDialogSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          this.dialogFormVisible = false
          let result = await this.$API.trademark.reqAddOrUpdateTrademark(this.trademarkForm)

          if (result.code === 200 || result.code === 20000) {
            this.$message.success(this.trademarkForm.id ? '修改品牌成功' : '添加品牌成功')
            // 修改或添加成功后刷新列表要显示的数据
            this.getList(this.trademarkForm.id ? this.page : 1)
          } else {
            this.$message.error(result.data)
          }
        } else {
          return false
        }
      })
    },
    // 修改一个品牌的信息
    updateOneTrademark(row) {
      this.trademarkForm = {...row}
      this.dialogFormVisible = true
    },
    // 获取品牌列表
    async getList(pager = 1) {
      this.page = pager
      const {page, limit} = this

      let result = await this.$API.trademark.reqTrademarkList(page, limit)

      if (result.code === 200 || result.code === 20000) {
        this.total = result.data.total
        this.page = result.data.current
        this.list = result.data.records
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleAvatarSuccess(res, file) {
      this.trademarkForm.logoUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    showDialog() {
      this.trademarkForm = {
        logoUrl: '',
        tmName: '',
      }
      this.dialogFormVisible = true
    },
    handleSizeChange(limit) {
      this.limit = limit

      this.getList()
    }
  },
  data() {
    return {
      trademarkForm: {
        logoUrl: '',
        tmName: '',
      },

      imageUrl: '',

      list: [],

      page: 1,
      limit: 3,
      total: 0,

      dialogFormVisible: false,

      // 验证规则
      rules: {
        // 品牌名称
        tmName: [
          {required: true, message: '请输入品牌名称', trigger: 'blur'},
          {min: 2, max: 15, message: '品牌名称应在2到15个字符', trigger: 'change'},
        ],
        // 品牌LOGO
        logoUrl: [
          {required: true, message: '请上传品牌LOGO'},
        ]
      }
    }
  }
})
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
