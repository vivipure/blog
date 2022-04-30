<template>
  <Layout>
    <template #top>
      <div class="banner"></div>
    </template>
    <PostList></PostList>
  </Layout>
</template>

<script setup lang="ts">
import PostList from "../components/PostList.vue";
import Layout from "../components/Layout.vue";
</script>

<style lang="less" scoped>
.banner {
  height: 15em;
  background-image: url(https://thomas.preissler.me/assets/images/teaser.jpeg);
  background-size: 100% auto;
  background-position: center;
  margin-bottom: 5em;
}

</style>
