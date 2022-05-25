<template>
    <Layout>
        <div ref="contentRef" class="about-container">

        </div>
        <h2>关于我</h2>
        <p>我是一名前端开发工程师，平时主要的乐趣也是coding. 这个博客的目的主要是为了分享自己在开发中遇到的问题，或者学习到的新技术。</p>
        <p>作为一名开发者，我的文档撰写能力还是偏弱的，也希望通过平时的文章写作提高自己的文档能力。</p>
        <h2>我的作品</h2>

    </Layout>
</template>

<script setup lang="ts">
import Layout from "../components/Layout.vue";
import { useMarkdown } from "../hooks/useMarkdown";
import { ref } from 'vue'

const contentRef = ref<Element>()
const path = 'about.md'
useMarkdown(path, contentRef);

</script>

<style lang="less" scoped>
h2 {
    margin-bottom: .5em;
}

p {
    line-height: 1.5;
}
</style>
