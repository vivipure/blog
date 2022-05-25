<template>
  <Layout>
    <div class="page__inner-wrap">
      <header>
        <h1 class="post-title">Test Markdown Post</h1>
      </header>
      <section ref="contentRef" class="page__content e-content" itemprop="text" ></section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Layout from "../components/Layout.vue";

import { useRoute, } from "vue-router";
import { useMarkdown } from "../hooks/useMarkdown";

const contentRef = ref<Element>();
const route = useRoute();
const { postId } = route.params;

const path = `content/${postId}.md`;
useMarkdown(path, contentRef);

</script>

<style lang="less" scoped>
.post-title {
  font-size: 2em;
  margin-bottom: 0.5em;
  font-weight: bold;
}

section {
  ::deep {
    p {
      line-height: 1.5;
      margin-bottom: 1.3em;
    }

    h2 {
      font-size: 1.4em;
      margin-bottom: 1.3em;
    }

    li {
      margin-bottom: 1em;
    }
  }
}

p>code,
a>code,
li>code,
figcaption>code,
td>code {
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
