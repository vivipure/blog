<template>
  <router-link :to="`/post/${post.id}`" class="post-item">
    <div class="post-title">
      {{post.title}}
    </div>
    <div class="post-time">
      <div class="icon"></div>
      <div class="time">April 27, 2022</div>
    </div>
    <div class="post-excerpt">
      {{post.slug}}
    </div>
  </router-link>
</template>

<script setup lang="ts">
interface PropsInterface {
  data: {
    id: number;
    title: string;
    slug: string;
  };
}

const props = defineProps<PropsInterface>();
const post = props.data
</script>

<style lang="less" scoped>
.post-item {
  cursor: pointer;
  margin-bottom: 3em;
  .post-title {
    color: #2f7d95;
    line-height: 1.5;
    font-size: 1.25em;
    font-weight: bold;
    text-decoration: underline;
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
      background: #000;
    }
    .time {
      font-size: 0.8em;
      color: #a1a1a1;
    }
  }
  .post-excerpt {
    font-size: 0.8em;
    color: #a1a1a1;
  }
}
</style>
