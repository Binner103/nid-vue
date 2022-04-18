<template>
  <div class="post-list-item-content">
    <div class="thumbnail">
      <UserAvatar :user="item.user" link="user" />
    </div>
    <div class="header">
      <div class="text">
        <router-link class="link" :to="itemLinkTo">
          {{ item.title }}
        </router-link>
      </div>
      <div class="meta">
        <UserName :user="item.user" />
      </div>
    </div>
    <div class="actions">
      <PostLikeAction class="action" :post="item" />
      <div class="action">
        <div class="icon">
          <button class="button basic" @click="onClickCommentsButton">
            <AppIcon name="comment" />
          </button>
        </div>
        <div class="text">
          {{ item.totalComments }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations } from 'vuex';
import UserAvatar from '@/user/components/user-avatar.vue';
import UserName from '@/user/components/user-name.vue';
import AppIcon from '@/app/components/app-icon.vue';
import PostLikeAction from '@/post/components/post-like-action.vue';

export default defineComponent({
  name: 'PostListItemContent',

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
    itemLinkTo() {
      return { name: 'postShow', params: { postId: this.item.id } };
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
    ...mapMutations({
      setSideSheetComponent: 'layout/setSideSheetComponent',
      setSideSheetProps: 'layout/setSideSheetProps',
    }),

    onClickCommentsButton() {
      this.setSideSheetComponent('CommentSideSheet');

      this.setSideSheetProps({
        filter: {
          post: this.item.id,
        },
      });
    },
  },

  /**
   * 使用组件
   */
  components: {
    UserAvatar,
    UserName,
    AppIcon,
    PostLikeAction,
  },
});
</script>

<style scoped>
@import './styles/post-list-item-content.css';
</style>
