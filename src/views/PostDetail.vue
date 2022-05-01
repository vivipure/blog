<template>
  <Layout>
    <div class="page__inner-wrap">
      <header>
        <h1 id="page-title" class="page__title p-name" itemprop="headline">
          Using TypeScript to validate translations at compile time
        </h1>
      </header>
      <section
        ref="contentRef"
        class="page__content e-content"
        itemprop="text"
        v-html="postHTML"
      ></section>
    </div>
  </Layout>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from "vue";
import Layout from "../components/Layout.vue";
import { marked } from "marked";

import { useRoute, useRouter } from "vue-router";

const postHTML = ref<string>("");

const contentRef = ref<Element>();

const route = useRoute();
const router = useRouter()

const { postId } = route.params;

fetch(`../content/${postId}.markdown`)
  .then((res) => {
    console.log(res)
    if(res.status == 200)  return res.text()
    router.push('/')
  })
  .then((res) => {
    const html = marked(res as string);
    postHTML.value = html;
    nextTick(() => {
      contentRef.value?.querySelectorAll("pre code").forEach((codeElement) => {
        window.hljs.highlightElement(codeElement);
      });
    });
  })


</script>

<style lang="less" scoped>
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
// :deep() .hljs-title  {
//   color: #2196f3;
// }
p {
  line-height: 1.5;
  margin-bottom: 1.3em;
}
pre code.hljs {
  padding: 1em;
  border-radius: 0.2em;
  margin-bottom: 1.3em;
}
</style>
