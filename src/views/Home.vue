<template>
  <div class="fun-blog">
    <Header></Header>
    <main>
      <div class="banner"></div>
      <div class="content-box">
        <Left></Left>
        <Right></Right>
      </div>
    </main>
    <Footer></Footer>
  </div>
</template>

<script setup lang="ts">
import Header from "../components/Header.vue";
import Left from "../components/Left.vue";
import Right from "../components/Right.vue";
import Footer from "../components/Footer.vue";
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
.banner {
  height: 15em;
  background-image: url(https://thomas.preissler.me/assets/images/teaser.jpeg);
  background-size: 100% auto;
  background-position: center;
  margin-bottom: 5em;
}
.content-box {
  max-width: 1280px;
  padding: 0 1em;
  margin: 0 auto;
  display: flex;
}
</style>
