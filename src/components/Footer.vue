<template>
  <div id="footer" class="blog-footer">
    <footer>
      <ul class="social-icons">
        <li>
          <a href="#" rel="nofollow noopener noreferrer"
            ><i class="fab fa-fw fa-github" aria-hidden="true"></i> GitHub</a
          >
        </li>

        <li>
          <a href="/feed.xml"
            ><i class="fas fa-fw fa-rss-square" aria-hidden="true"></i> Feed</a
          >
        </li>
      </ul>

      <div class="blog-footer-copyright">
        &copy; 2022 Funkun. Inspired by
        <a
          href="https://mademistakes.com/work/minimal-mistakes-jekyll-theme/"
          rel="nofollow"
          >Minimal Mistakes</a
        >.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="less" scoped>
.blog-footer {
  background: #f2f3f3;

  footer {
    padding: 3em 1em;
    max-width: 1280px;
    margin: 0 auto;
  }
  .social-icons {
    display: flex;
    margin-bottom: 0.5em;
    li {
      margin-right: 2em;
      font-weight: bold;
    }
  }
}
</style>
