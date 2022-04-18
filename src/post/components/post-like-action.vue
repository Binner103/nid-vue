<template>
  <div class="post-like-action">
    <div class="icon">
      <button class="button basic" @click="onClickLikeButton">
        <AppIcon :name="likeIcon" />
      </button>
    </div>
    <div class="text" v-if="post.totalLikes">
      {{ post.totalLikes }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapActions } from 'vuex';
import AppIcon from '@/app/components/app-icon.vue';

export default defineComponent({
  name: 'PostLikeAction',

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
    likeIcon() {
      return this.post.liked ? 'favorite' : 'favorite_border';
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
  methods: {
    ...mapActions({
      createUserLikePost: 'like/create/createUserLikePost',
      deleteUserLikePost: 'like/destroy/deleteUserLikePost',
    }),

    onClickLikeButton() {
      if (this.post.liked) {
        this.deleteUserLikePost({ postId: this.post.id });
      } else {
        this.createUserLikePost({ postId: this.post.id });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    AppIcon,
  },
});
</script>

<style scoped>
@import './styles/post-like-action.css';
</style>
