<template>
  <div :class="['page', theme]">
    <PageHeader />
    <PageAside />
    <div class="page-main">
      <slot></slot>
      <PageSideSheet @scroll="onScrollPageSideSheet" ref="pageSideSheet" />
    </div>
    <AppNotification />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import PageHeader from './components/page-header.vue';
import PageAside from './components/page-aside.vue';
import AppNotification from '@/app/notification/app-notification.vue';
import { getStorage } from '../app.service';
import PageSideSheet from './components/page-side-sheet.vue';

export default defineComponent({
  name: 'AppLayout',

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
      theme: 'layout/theme',
      sideSheetTouchdown: 'layout/sideSheetTouchdown',
    }),
  },

  /**
   * 已创建
   */
  created() {
    //主题
    const theme = getStorage('theme');
    if (theme) {
      this.setTheme(theme);
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setTheme: 'layout/setTheme',
      setSideSheetTouchdown: 'layout/setSideSheetTouchdown',
    }),

    onScrollPageSideSheet() {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = this.$refs.pageSideSheet.$el;

      if (clientHeight + scrollTop == scrollHeight) {
        this.setSideSheetTouchdown(true);
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    PageHeader,
    PageAside,
    AppNotification,
    PageSideSheet,
  },
});
</script>

<style scoped></style>
