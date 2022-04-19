<template>
  <div :class="managePostListItemClasses">managePostListItem</div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ManagePostListItem',

  /**
   * 属性
   */
  props: {
    item: {
      type: Object,
    },
  },

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
    managePostListItemClasses() {
      return ['manage-post-list-item', { selected: false }];
    },
  },

  /**
   * 已创建
   */
  created() {
    //
  },

  /**
   * 组件方法
   */
  methods: {},

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/manage-post-list-item.css';
</style>
