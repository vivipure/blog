<template>
  <div class="right-content">
    <PostItem v-for="(item, idx) in postList" :data="item" :key="idx" />
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import { ref } from "vue";
import PostItem from "./PostItem.vue";

const route = useRoute();

interface Post {
  title: string;
  created: string;
  updated: string;
  slug: string;
  avatar: string;
  id: string
}

const postList = ref<Post[]>([]);

fetch("./data/list.json")
  .then((res) => res.json())
  .then((r) => {
    postList.value = r;
  });
</script>

<style lang="less" scoped>
.right-content > * {
  margin-bottom: 1.5em;
}
</style>
