<template>
    <div class="post-item">
        <div class="post-title">Implementing a timeline with scrolling and zooming - or how I failed at elementary school math</div>
        <div class="post-time">
            <div class="icon"></div>
            <div class="time">April 27, 2022</div>
        </div>
        <div class="post-excerpt ">
            这是一段无意义的中文文字，用于临时占位使用。可以不去阅读它，因为没啥用
        </div>
    </div>
</template>

<script setup lang="ts">

interface PropsInterface {
    title: string
    date: string
    
}

</script>

<style lang="less" scoped>
.post-item {
    cursor: pointer;
    margin-bottom: 3em;
    .post-title {
        color: #2f7d95;
        line-height: 1.5;
        font-size: 1.25em;
        font-weight: bold;
        text-decoration: underline;
        margin-bottom: .5em;
        transition: .3s;
        &:hover {
            color: #1b5e72;
        }
    }
    .post-time {
        display: flex;
        align-items: center;
        margin-bottom: 0.5em;
        .icon {
            border-radius: 50%;
            margin-right: .5em;
            width: 1em;
            height: 1em;
            background: #000;
        }
        .time {
            font-size: .8em;
            color: #a1a1a1;
        }
    }
    .post-excerpt  {
        font-size: .8em;
        color: #a1a1a1;
    }
}
</style>