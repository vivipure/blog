<template>
  <div class="fun-header">
    <div class="menu-box">
      <div class="site-title">
        <router-link to="/"> Funkun's blog</router-link>
      </div>
      <ul class="menus">
        <li class="item">
          <router-link to="/">Blog</router-link>
        </li>
        <li class="item">
          <router-link to="/about">About</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.router-link-active {
  font-weight: bold;
}
.fun-header {
  max-width: 1280px;
  margin: 0 auto;
  padding: 1em;
  border-bottom: 1px solid #f2f3f3;
  width: 100%;
}
.menu-box {
  display: flex;
  font-size: 20px;
  .site-title {
    font-weight: bold;
    color: #53595e;
  }
}
.menus {
  flex: 1;
  display: flex;
  justify-content: flex-end;
  .item {
    cursor: pointer;
    a {
      margin: 0 1em;

      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 100%;
        left: 0;
        width: 0;
        transition: width 0.3s ease-in-out;
        height: 2px;
        background: #000;
      }
      &:hover::before {
        width: 100%;
      }
    }
  }
}
</style>
