<template>
  <div class="post-tag-field">
    <div class="content">
      <TextField
        placeholder="标签"
        v-model="name"
        @keyup.enter="onKeyUpEnterTag"
      />
      <button class="button basic" @click="onClickAddButton">
        <AppIcon name="add" />
      </button>
    </div>
    <div class="meta" v-if="hasTags">
      <transition-group name="post-tag">
        <PostTag
          v-for="tag in tags"
          :key="tag.id"
          :tag="tag"
          userDeleteButton
          @delete="onDeletePostTag"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations, mapActions, mapGetters } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import AppIcon from '@/app/components/app-icon.vue';
import PostTag from '@/post/components/post-tag.vue';

export default defineComponent({
  name: 'PostTagField',

  /**
   * 属性
   */
  props: {
    postId: {
      type: Number,
    },

    posts: {
      type: Array,
    },
  },

  /**
   * 数据
   */
  data() {
    return {
      name: '',
    };
  },

  /**
   * 事件
   */
  emits: ['updated'],

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      tags: 'post/edit/tags',
      hasTags: 'post/edit/hasTags',
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
  methods: {
    ...mapMutations({}),
    ...mapActions({
      createPostTag: 'post/edit/createPostTag',
      pushMessage: 'notification/pushMessage',
      deletePostTag: 'post/edit/deletePostTag',
    }),

    onClickAddButton() {
      this.submitCreatePostTag();
    },

    onKeyUpEnterTag() {
      if (this.posts) {
        this.batchCreatePostTag();
      } else {
        this.submitCreatePostTag();
      }
    },

    async batchCreatePostTag() {
      for (const post of this.posts) {
        if (post.tags && post.tags.some(tag => tag.name === this.name.trim()))
          continue;

        try {
          await this.createPostTag({
            postId: post.id,
            data: {
              name: this.name,
            },
          });
        } catch (error) {
          continue;
        }
      }

      this.$emit('updated');
      this.name = '';
    },

    async submitCreatePostTag() {
      if (!this.name) return;

      try {
        await this.createPostTag({
          postId: this.postId,
          data: {
            name: this.name,
          },
        });

        this.name = '';
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async onDeletePostTag(tagId) {
      if (this.posts) {
        this.batchDeletePostTag(tagId);
      } else {
        this.submitDeletePostTag(tagId);
      }
    },

    async submitDeletePostTag(tagId) {
      try {
        await this.deletePostTag({ postId: this.postId, tagId });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async batchDeletePostTag(tagId) {
      for (const post of this.posts) {
        if (post.tags && !post.tags.some(tag => tag.id === tagId)) continue;

        try {
          await this.deletePostTag({
            postId: post.id,
            tagId,
          });
        } catch (error) {
          continue;
        }
      }

      this.$emit('updated');
      this.name = '';
    },
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    AppIcon,
    PostTag,
  },
});
</script>

<style scoped>
@import './styles/post-tag-field.css';
</style>
