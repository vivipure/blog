<template>
    <div class="right-content">
        <PostItem v-for="item in 10"></PostItem>
        <!--  -->
        <!-- <Pagination></Pagination> -->
    </div>
</template>

<script setup lang="ts">
import PostItem from './PostItem.vue';
</script>

<style lang="less" scoped>
.right-content {
    flex: 1;
}
</style>