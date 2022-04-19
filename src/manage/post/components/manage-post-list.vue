<template>
  <div class="manage-post-list" ref="managePostList">
    <ManagePostListItem v-for="post in posts" :key="post.id" :item="post" />
    <template v-if="loading">
      <ManagePostListItemSkeleton v-for="number in 20" :key="number" />
    </template>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import ManagePostListItem from '@/manage/post/components/manage-post-list-item.vue';
import ManagePostListItemSkeleton from '@/manage/post/components/manage-post-list-item-skeleton.vue';

export default defineComponent({
  name: 'ManagePostList',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      prevScrollTop: 0,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      currentUser: 'user/currentUser',
      loading: 'post/index/loading',
      posts: 'post/index/posts',
      hasMore: 'post/index/hasMore',
    }),

    filter() {
      return {
        user: this.currentUser ? this.currentUser.id : null,
        action: 'published',
      };
    },
  },

  /**
   * 已创建
   */
  created() {
    // 获取内容列表
    if (this.currentUser) {
      this.getPosts({ filter: this.filter });
    }

    if (window) {
      window.addEventListener('scroll', this.onScrollWindow);
      window.scrollTo({ top: 0 });
    }
  },

  /**
   * 取消挂载
   */
  unmounted() {
    if (window) {
      window.addEventListener('scroll', this.onScrollWindow);
    }
  },

  updated() {
    if (document) {
      const { clientHeight: documentHeight } = document.documentElement;
      const { clientHeight: componentHeight } = this.$refs.managePostList;

      if (componentHeight < documentHeight && this.hasMore && !this.loading) {
        this.getPosts({ filter: this.filter });
      }
    }
  },

  /**
   * 监视器
   */
  watch: {
    filter() {
      this.getPosts({ filter: this.filter });
    },
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({}),
    ...mapActions({
      getPosts: 'post/index/getPosts',
    }),

    onScrollWindow() {
      if (document) {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
        } = document.documentElement;

        const height = clientHeight + scrollTop + 200;
        const touchDown = scrollHeight - height < 0;
        const scrollDown = scrollTop > this.prevScrollTop;

        if (touchDown && scrollDown && !this.loading && this.hasMore) {
          this.getPosts({ filter: this.filter });
        }

        this.prevScrollTop = scrollTop;
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    ManagePostListItem,
    ManagePostListItemSkeleton,
  },
});
</script>

<style scoped>
@import './styles/manage-post-list.css';
</style>
