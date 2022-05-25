<template>
  <div
    class="text-avatar"
    :style="{
      background: avatarBgColor,
    }"
    :data-text="text"
  ></div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";

const props = defineProps<{
  text: string;
}>();

const avatarBgColor = computed(() => {
  const charRed = props.text.charCodeAt(0);
  const charGreen = props.text.charCodeAt(1) || charRed;

  const red = Math.pow(charRed, 7) % 200;
  const green = Math.pow(charGreen, 7) % 200;
  const blue = Math.pow(charGreen + charRed, 7) % 200;

  return `rgb(${red},${green},${blue})`;
});
</script>

<style lang="less" scoped>
.text-avatar {
  width: 2em;
  height: 2em;
  border-radius: 50%;
  margin-bottom: 0.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-size: 2em;
  &::before {
    content: attr(data-text);
    font-weight: bold;
    font-family: "Readex Pro", sans-serif;
    color: #fff;
  }
}
</style>
