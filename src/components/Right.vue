<template>
  <div class="right-content">
    <PostItem v-for="item in 10"></PostItem>
  </div>
</template>

<script setup lang="ts">
import PostItem from "./PostItem.vue";
</script>

<style lang="less" scoped>
.right-content {
  float: right;
  width: calc(100% - 300px);
  overflow: hidden;
  
}
</style>
