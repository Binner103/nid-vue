<template>
  <div class="post-show-actions">
    <PostLikeAction class="action" :post="post" />
    <PostCommentAction class="action" :post="post" actionType="switch" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations } from 'vuex';
import PostLikeAction from '@/post/components/post-like-action.vue';
import PostCommentAction from '@/post/components/post-comment-action.vue';

export default defineComponent({
  name: 'PostShowActions',

  /**
   * 属性
   */
  props: {
    post: {
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
    ...mapGetters({
      sideSheetComponent: 'layout/sideSheetComponent',
    }),
  },

  /**
   * 已创建
   */
  created() {
    this.setSideSheetComponent('CommentSideSheet');

    if (this.sideSheetComponent) {
      this.setSideSheetProps({
        filter: {
          post: this.post.id,
        },
      });
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setSideSheetProps: 'layout/setSideSheetProps',
    }),
  },

  /**
   * 使用组件
   */
  components: {
    PostLikeAction,
    PostCommentAction,
  },
});
</script>

<style scoped>
@import './styles/post-show-actions.css';
</style>
