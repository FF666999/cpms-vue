<template>
  <el-popover placement="bottom"
              width="350"
              trigger="click">

    <el-tabs v-model="activeName">
      <el-tab-pane label="消息" name="first">
          <div class="notice-text">暂无消息！！！</div>      
      </el-tab-pane>
       <el-tab-pane label="通知" name="second">
          <div class="notice-text">暂无通知！！！</div>      
      </el-tab-pane>
    </el-tabs>
    <div slot="reference">
      <el-badge is-dot>
        <i class="el-icon-bell"></i>
      </el-badge>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "top-notice",
  data () {
    return {
      activeName: 'first',
      data: [],
    }
  },
  created () {

  },
  methods: {

  }
};
</script>

<style lang="scss" scoped>
.notice-text{
  text-align: center;
}
</style>
