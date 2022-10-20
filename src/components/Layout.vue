<template>
  <div class="fun-blog">
    <Header></Header>
    <main>
      <slot name="top"></slot>
      <div class="content-box">
        <div class="left-sticky">
          <SideBar></SideBar>
        </div>
        <div class="right-content">
          <slot></slot>
        </div>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import SideBar from "./SideBar.vue";
</script>

<style lang="less" scoped>
.fun-blog {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  main {
    flex: 1;
  }
}
.content-box {
  max-width: 1280px;
  padding: 0 1em;
  margin: 0 auto;
  clear: both;
  &::after {
    clear: both;
    content: "";
    display: table;
  }
  & > {
    margin-top: 2em;
  }
}

.left-sticky {
  position: sticky;
  top: 2em;
  float: left;
  width: calc(300px - 2em);
  &::after {
    clear: both;
    content: "";
    display: table;
  }
}
.right-content {
  float: right;
  width: calc(100% - 300px);
  overflow: hidden;
}

@media screen and (max-width: 992px) {
  .left-sticky {
    display: none;
  }
  .right-content {
    width: 100%;
  }
}
</style>
