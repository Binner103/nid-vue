<template>
  <transition name="page-side-sheet">
    <div class="page-side-sheet" v-if="isSideSheetActive">
      <CloseButton @click="onClickCloseButton" />
      <component :is="sideSheetComponent"></component>
    </div>
  </transition>
</template>



<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import CommentSideSheet from '@/comment/components/comment-side-sheet.vue';
import CloseButton from '@/app/components/close-button.vue';
import ManagePostSideSheet from '@/manage/post/components/manage-post-side-sheet';

export default defineComponent({
  name: 'PageSideSheet',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      sideSheetComponent: 'layout/sideSheetComponent',
      isSideSheetActive: 'layout/isSideSheetActive',
    }),
  },

  /**
   * 已创建
   */
  created() {
    if (window) {
      window.addEventListener('keyup', this.onKeyUpWindow);
    }
  },

  unmounted() {
    if (window) {
      window.removeEventListener('keyup', this.onKeyUpWindow);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      resetSideSheet: 'layout/resetSideSheet',
    }),

    ...mapActions({
      closeSideSheet: 'layout/closeSideSheet',
    }),

    onClickCloseButton() {
      this.closeSideSheet();
    },

    onKeyUpWindow(event) {
      if (event.key === 'Escape') {
        this.closeSideSheet();
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    ManagePostSideSheet,
    CommentSideSheet,
    CloseButton,
  },
});
</script>



<style scoped>
@import './styles/page-side-sheet.css';
</style>
