<template>
  <router-link :to="`/post/${post.id}`" class="post-item">
    <div class="post-title">
      {{post.title}}
    </div>
    <div class="post-time">
      <img class="icon" :src="post.avatar" />
      <div class="time">{{post.updated}}</div>
    </div>
    <div class="post-excerpt">
      {{post.slug}}
    </div>
  </router-link>
</template>

<script setup lang="ts">
interface PropsInterface {
  data: {
    id: string;
    title: string;
    slug: string;
    updated: string
    avatar: string
  };
}

const props = defineProps<PropsInterface>();
const post = props.data
</script>

<style lang="less" scoped>
.post-item {
  display: block;
  cursor: pointer;
  .post-title {
    line-height: 1.5;
    font-style: it;
    font-size: 1.25em;
    // font-weight: bold;
    margin-bottom: 0.5em;
    transition: 0.3s;
    &:hover {
      color: #1b5e72;
    }
  }
  .post-time {
    display: flex;
    align-items: center;
    margin-bottom: 0.5em;
    .icon {
      border-radius: 50%;
      margin-right: 0.5em;
      width: 1em;
      height: 1em;
    }
    .time {
      font-size: 0.8em;
      color: #a1a1a1;
    }
  }
  .post-excerpt {
    font-size: 0.8em;
    color: #bebebe;
  }
}
</style>
