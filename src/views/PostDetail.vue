<template>
  <Layout>
    <div class="page__inner-wrap">
      <header>
        <h1 class="post-title">Test Markdown Post</h1>
      </header>
      <section ref="contentRef" class="post-content" itemprop="text" ></section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Layout from "../components/Layout.vue";

import { useRoute, } from "vue-router";
import { useFetch } from "../hooks/useFetch";

const contentRef = ref<Element>();
const route = useRoute();
const { postId  } = route.params;

const path = `data/content.json`;
useFetch(path, postId as string,contentRef);

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
  ::deep {
    p {
      line-height: 1.5;
      margin-bottom: 1.3em;
    }

    h1,h2,h3 {
      font-size: 1.4em;
      margin: 2em 0;
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
