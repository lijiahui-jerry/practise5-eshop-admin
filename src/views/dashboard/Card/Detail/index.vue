<template>
  <div>
    <div class="header">
      <span>{{ title }}</span>
      <i class="el-icon-info"></i>
    </div>

    <div class="content">
      {{ count }}
    </div>

    <div class="charts">
      <slot name="charts"/>
    </div>

    <div class="footer">
      <slot name="footer"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'count'],
  name: "Detail"
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  color: #d9d9d9;
}

.content {
  font-size: 30px;
  padding: 10px 0;
}

.charts {
  height: 50px;
}

.footer {
  border-top: 1px solid #eeeeee;
  padding-top: 10px;
}
</style>
