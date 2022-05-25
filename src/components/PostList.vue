<template>
  <div class="right-content">
    <PostItem v-for="item in postDatList" :data="item"></PostItem>
    <Pagination
      :total="100"
      style="float: right; margin: 20px 0"
      @pageChange="pageChange"
    ></Pagination>
  </div>
</template>

<script setup lang="ts">
import Pagination from "./Pagination.vue";
import PostItem from "./PostItem.vue";
import { useRoute, useRouter } from "vue-router";
import { ref, watch } from "vue";

const route = useRoute();
const router = useRouter();

console.log(route.params.page);


const postDatList = [
  {
    id: 1,
    title: "我的第一篇文章",
    slug: "这是一段无意义的中文文字，用于临时占位使用。可以不去阅读它，因为没啥用",
  },
  {
    id: 2,
    title: "2",
    slug: "这是一段无意义的中文文字，用于临时占位使用。可以不去阅读它，因为没啥用",
  },
];

watch(route, () => {
  const { page } = route.params;
  //
  console.log(page)
});

const pageChange = (page: number) => {
  router.push({
    path: `/page/${page}`,
  });
};
</script>

<style lang="less" scoped></style>
