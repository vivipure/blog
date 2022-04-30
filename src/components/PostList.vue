<template>
  <div class="right-content">
    <PostItem v-for="item in 10"></PostItem>
    <Pagination :total="66" style="float: right;margin-bottom: 20px;"></Pagination>
  </div>
</template>

<script setup lang="ts">
import Pagination from "./Pagination.vue";
import PostItem from "./PostItem.vue";

</script>

<style lang="less" scoped>

</style>
