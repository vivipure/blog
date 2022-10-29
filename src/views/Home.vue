<template>
  <Layout>
    <PostList :name="listName"></PostList>
  </Layout>
</template>

<script setup lang="ts">
import PostList from "../components/PostList.vue";
import Layout from "../components/Layout.vue";
import { useRoute, useRouter } from "vue-router";
import { computed } from "@vue/reactivity";

const route = useRoute();
console.log(route);

const listName = computed(() => {
  if (route.path === "/") {
    return "blog";
  }
  return "til";
});
</script>

<style lang="less" scoped></style>
