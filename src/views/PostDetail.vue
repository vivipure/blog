<template>
  <Layout>
    <div class="page__inner-wrap">
      <template v-if="post.content">
        <header>
          <h1 class="post-title">{{ post.title }}</h1>
        </header>
        <section
          ref="contentRef"
          v-html="post.content"
          class="post-content"
          itemprop="text"
        ></section>
      </template>
      <Loading v-else></Loading>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Layout from "../components/Layout.vue";
import Loading from "../components/Loading.vue";

import { useRoute } from "vue-router";
import { useFetch } from "../hooks/useFetch";

const contentRef = ref<Element>();
const route = useRoute();
const { postId } = route.params;
const { type } = route.query;

const path = `data/${type}/${postId}.json`;
const { post } = useFetch(path, contentRef);
</script>

<style lang="less" scoped>
.post-title {
  font-size: 2em;
  margin-bottom: 0.5em;
  font-weight: bold;
}
.post-content {
  padding-bottom: 2em;
}

.post-content {
  :deep(p) {
    margin-bottom: 0.8em;
    line-height: 1.5;
  }

  :deep(h1) {
    font-size: 1.4em;
    margin: 0.5em 0;
  }
  :deep(h2) {
    font-size: 1.3em;
    margin: 0.5em 0;
  }
  :deep(h3) {
    font-size: 1.2em;
    margin: 0.5em 0;
  }
  :deep(h4) {
    font-size: 1em;
    margin: 0.5em 0;
  }

  :deep(li) {
    margin-bottom: 1em;
    list-style: decimal;
  }
  :deep(ol, ul) {
    padding-left: 2em;
    list-style: decimal;
  }
}


</style>
<style>
pre {
  border-radius: .2em;
  padding: .2em;
  
}
pre code.hljs {
  padding: 1em;
  border-radius: 0.2em;
  margin-bottom: 1.3em;
  background: #f6f6f6;
}</style>