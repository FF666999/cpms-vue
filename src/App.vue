<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.question-tips{
    margin-left:5px;
    color:#E6A23C;
    cursor:pointer;
}
.grid-button{
    margin-left:-20px;
}
.question-tips-content.el-popover {
   font-size: 10px !important;
}
.tetee  .el-dialog__header{
    border-bottom: 1px solid #e5e4e4 !important;
}
.page-list {
    margin-top:20px;
}
.top-menu .el-menu-item.is-active{
  color:#25ada6 !important;
}
.el-icon-search-class{
    margin-top:4px ;
}
</style>