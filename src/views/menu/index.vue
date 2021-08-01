<template>
  <div class="MenuIndex">
    <el-card>
      <el-button
        type="primary"
        size="small"
        @click="createMenu"
      >添加菜单</el-button>
    </el-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'MenuIndex',
  methods: {
    createMenu () {
      this.$router.push({
        name: 'create'
      })
    }
  }
})
</script>

<style lang="scss" scoped></style>
