<template>
  <div class="left-sticky">
    <div class="logo"></div>
    <div class="blog-author">Funkun</div>
    <div class="description">
      <p>Frontend Developer</p>
      <p>addicted to CODE</p>
    </div>

    <ul class="follow-list">
      <li>
        <div class="icon"></div>
        <div class="text">Shenzhen China</div>
      </li>
      <li>
        <div class="icon"></div>
        <div class="text">
          <a href="mailto:vivipureheart@gmail.com">Email</a>
        </div>
      </li>
      <li>
        <div class="icon"></div>
        <div class="text">Twitter</div>
      </li>
      <li>
        <div class="icon"></div>
        <div class="text">Github</div>
      </li>
      <li>
        <div class="icon"></div>
        <div class="text">Bilibili</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.left-sticky {
  position: sticky;
  margin-right: 4em;
  top: 2em;
  .logo {
    width: 5em;
    height: 5em;
    border-radius: 50%;
    background: #000;
    margin-bottom: 1em;
  }
  .blog-author {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .description {
    margin-bottom: 1em;
  }
}

.follow-list {
    li {
        display: flex;
        margin-bottom: .6em;
        align-items: center;
        .icon {
            margin-right: 0.4em;
            width: 1.2em;
            height: 1.2em;
            background: #000;
            border-radius: 50%;
        }
    }
}
</style>
