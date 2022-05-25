<template>
  <div class="card-info">
    <TextAvatar text="FK"></TextAvatar>
    <div class="blog-author">Funkun</div>
    <div class="description">
      <p>Frontend Developer</p>
      <p>addicted to code</p>
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

<script setup lang="ts">
import TextAvatar from './TextAvatar.vue';
</script>

<style lang="less" scoped>
.card-info {
  .blog-author {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 0.5em;
  }
  .description {
    margin-bottom: 1em;
    font-size: .8em;
  }
}

.follow-list {
  li {
    display: flex;
    margin-bottom: 0.6em;
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
