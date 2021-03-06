<template>
  <PostShowSkeleton :class="postShowClasses" v-if="!showPost" />
  <div :class="postShowClasses" v-if="showPost">
    <PostShowMedia :post="post" @click="onClickPostShowMedia" />
    <div class="section meta actions">
      <PostShowFileMeta :post="post" />
      <PostShowActions :post="post" />
    </div>
    <PostShowHeader :post="post" @click="onClickPostHeader" />
    <PostShowContent :post="post" />
    <PostShowTags v-if="post.tags" :tags="post.tags" />
    <PostShowEdit :post="post" v-if="showPostEdit" />
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { defineComponent } from 'vue';
import PostShowMedia from './components/post-show-media.vue';
import { getStorage } from '@/app/app.service';
import PostShowHeader from './components/post-show-header.vue';
import PostShowContent from './components/post-show-content.vue';
import PostShowActions from './components/post-show-actions.vue';
import PostShowFileMeta from './components/post-show-file-meta.vue';
import PostShowTags from './components/post-show-tags.vue';
import PostShowSkeleton from './components/post-show-skeleton.vue';
import PostShowEdit from './components/post-show-edit.vue';

export default defineComponent({
  title() {
    if (this.showPost) {
      return this.post.title;
    }
  },

  props: {
    postId: String,
  },

  data() {
    return {
      showPostEdit: false,
    };
  },

  created() {
    this.getPostById(this.postId);

    // 布局
    const layout = getStorage('post-show-layout');

    if (layout) {
      this.setLayout(layout);
    }

    if (window) {
      window.addEventListener('keyup', this.onKeyUpWindow);
    }
  },

  unmounted() {
    if (window) {
      window.removeEventListener('keyup', this.onKeyUpWindow);
    }
  },

  computed: {
    ...mapGetters({
      loading: 'post/show/loading',
      post: 'post/show/post',
      layout: 'post/show/layout',
      sideSheetComponent: 'layout/sideSheetComponent',
      posts: 'post/index/posts',
      isSideSheetActive: 'layout/isSideSheetActive',
    }),

    showPost() {
      return !this.loading && this.post;
    },

    postShowClasses() {
      return ['post-show', this.layout, { aside: this.isSideSheetActive }];
    },
  },

  methods: {
    ...mapMutations({
      setLayout: 'post/show/setLayout',
    }),
    ...mapActions({
      getPostById: 'post/show/getPostById',
    }),

    onClickPostShowMedia() {
      this.setLayout(`${this.layout ? '' : 'flow'}`);
    },

    onKeyUpWindow(event) {
      if (event.ctrlKey || event.metaKey) return;
      switch (event.key) {
        case 'b':
          if (this.posts && this.posts.length) {
            this.$router.back();
          }
          break;
      }
    },

    onClickPostHeader() {
      this.showPostEdit = !this.showPostEdit;
    },
  },

  components: {
    PostShowMedia,
    PostShowHeader,
    PostShowContent,
    PostShowActions,
    PostShowFileMeta,
    PostShowTags,
    PostShowSkeleton,
    PostShowEdit,
  },
});
</script>

<style>
@import './styles/post-show.css';
</style>
