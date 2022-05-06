<template>
  <div class="manage-post-edit">
    <PageSideSheetStatus v-if="!hasSelected" content="请选择要编辑的项目" />
    <ManagePostEditSelected v-if="hasSelected" />
    <ManagePostEditForm v-if="hasSelected" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import ManagePostEditSelected from '@/manage/post/edit/components/manage-post-edit-selected';
import PageSideSheetStatus from '@/app/layout/components/page-side-sheet-status';
import ManagePostEditForm from '@/manage/post/edit/components/manage-post-edit-form.vue';

export default defineComponent({
  name: 'ManagePostEdit',

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
      hasSelected: 'manage/select/hasSelected',
    }),
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
  components: {
    PageSideSheetStatus,
    ManagePostEditSelected,
    ManagePostEditForm,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit.css';
</style>
