<template>
  <div class="pagination">
    <div :class="['prev pagin-btn', prevBtnDisabled ? 'disabled' : '']" @click="subPageIdx">
      &lt;
    </div>
    <div class="page-btns">
      <div
        v-for="page in pageBtnList"
        :key="page"
        :class="['pagin-btn', curPageIdx === page ? 'active' : '']"
        @click="pageChange(page)"
      >
        {{ page }}
      </div>
    </div>
    <div
      :class="['next pagin-btn', nextBtnDisabled ? 'disabled' : '']"
      @click="addPageIdx"
    >
      &gt;
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "@vue/reactivity";

interface PropsInterface {
  pageSize?: number;
  total?: number;
  currentPage?: number;
}
const props = withDefaults(defineProps<PropsInterface>(), {
  pageSize: 10,
  total: 0,
  currentPage: 1,
});

const curPageIdx = ref<number>(props.currentPage);

// computed value
const pageBtnList = computed<number[]>(() => {
  if (props.total == 0) {
    return [1];
  }
  const pageCount = Math.ceil(props.total / props.pageSize);
  const pageArr = Array.from({ length: pageCount }, (v, i) => i + 1);

  return pageArr;
});

const nextBtnDisabled = computed(() => {
  return curPageIdx.value === pageBtnList.value[pageBtnList.value.length - 1];
});
const prevBtnDisabled = computed(() => {
  return curPageIdx.value === 1;
});


// methods
const pageChange = (page: number) => {
  if (page === curPageIdx.value) return;
  curPageIdx.value = page;
};

const addPageIdx = () => {
  if (curPageIdx.value < pageBtnList.value[pageBtnList.value.length - 1])
    curPageIdx.value++;
};
const subPageIdx = () => {
  if (curPageIdx.value > 1) curPageIdx.value--;
};
</script>

<style lang="less" scoped>
.pagination {
  display: inline-flex;
  align-items: center;
  user-select: none;
  .page-btns {
    display: flex;
  }
  .pagin-btn {
    color: #333;
    cursor: pointer;
    height: 1.2em;
    text-align: center;
    line-height: 1.2em;
    margin-right: 0.8em;
    &:hover,
    &.active {
      color: #2fa8d6;
    }
    &.next {
      margin-right: 0;
    }
    &.disabled {
      color: #c0c4cc;
    }
  }
}
</style>
