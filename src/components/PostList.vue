<template>
  <div class="right-content">
    <PostItem
      v-for="item in postList"
      :path="props.name"
      :data="item"
      :key="props.name + item.id"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import PostItem from "./PostItem.vue";

const props = defineProps<{
  name: string;
}>();

interface Post {
  title: string;
  created: string;
  updated: string;
  excerpt: string;
  avatar: string;
  id: string;
}

const postList = ref<Post[]>([]);

onMounted(() => {
  getPostList();
});

watch(
  () => props.name,
  () => {
    getPostList();
  }
);

function getPostList() {
  postList.value = [];

  fetch(`./data/${props.name}/list.json`)
    .then((res) => res.json())
    .then((r) => {
      postList.value = r;
    });
}
</script>

<style lang="less" scoped>
.right-content > * {
  margin-bottom: 1.5em;
}
</style>
