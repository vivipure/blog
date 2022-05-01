<template>
  <div class="right-content">
    <PostItem v-for="item in postDatList" :data="item" ></PostItem>
    <Pagination :total="66" style="float: right;margin: 20px 0;"></Pagination>
  </div>
</template>

<script setup lang="ts">
import Pagination from "./Pagination.vue";
import PostItem from "./PostItem.vue";

const postDatList= [
  {
    id: 1,
    title: '2',
    slug: '这是一段无意义的中文文字，用于临时占位使用。可以不去阅读它，因为没啥用',
  },
  {
    id: 2,
    title: '2',
    slug: '这是一段无意义的中文文字，用于临时占位使用。可以不去阅读它，因为没啥用',
  }
]

</script>

<style lang="less" scoped>

</style>
