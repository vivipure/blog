<template>
  <Layout>
    <div class="page__inner-wrap">
      <header>
        <h1 class="post-title">{{ post.title }}</h1>
      </header>
      <section ref="contentRef" class="post-content" itemprop="text"></section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Layout from "../components/Layout.vue";

import { useRoute } from "vue-router";
import { useFetch } from "../hooks/useFetch";

const contentRef = ref<Element>();
const route = useRoute();
const { postId } = route.params;

const path = `data/content.json`;
const { post } = useFetch(path, postId as string, contentRef);
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

p > code,
a > code,
li > code,
figcaption > code,
td > code {
  padding-top: 0.1rem;
  padding-bottom: 0.1rem;
  font-size: 0.8em;
  background: #fafafa;
  border-radius: 4px;
}

pre code.hljs {
  padding: 1em;
  border-radius: 0.2em;
  margin-bottom: 1.3em;
}
</style>
