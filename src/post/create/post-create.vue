<template>
  <div class="post-create">
    <FileCreate @change="onChangeFileCreate" />
    <PostTitleField />
    <PostContentField />
    <PostTagField :postId="postId" v-if="postId" />
    <PostActions
      @update="submitUpdatePost"
      @create="submitCreatePost"
      @delete="onDeletePost"
      size="large"
      :userDeleteButton="postId ? true : false"
    />
    <PostMeta v-if="postCache" :post="postCache" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import PostTagField from '@/post/components/post-tag-field.vue';
import PostTitleField from '@/post/components/post-title-field.vue';
import PostContentField from '@/post/components/post-content-field.vue';
import PostActions from '@/post/components/post-actions.vue';
import PostMeta from '@/post/components/post-meta.vue';
import FileCreate from '@/file/create/file-create.vue';

export default defineComponent({
  name: 'PostCreate',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      postCache: null,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      postId: 'post/create/postId',
      title: 'post/create/title',
      content: 'post/create/content',
      post: 'post/show/post',
      selectedFile: 'file/create/selectedFile',
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },

  /**
   * 监视
   */
  watch: {
    $route(to) {
      const { post: postId } = to.query;

      if (postId) {
        this.getPost(parseInt(postId, 10));
      } else {
        this.reset();
      }
    },

    post(newValue) {
      if (newValue) {
        this.postCache = newValue;
      }
    },
  },

  /**
   * 已创建
   */
  created() {
    const { post: postId } = this.$route.query;

    if (postId) {
      this.getPost(parseInt(postId, 10));
    }
  },

  /**
   * 组件方法
   */
  methods: {
    ...mapMutations({
      setTags: 'post/edit/setTags',
      setPostId: 'post/create/setPostId',
      setTitle: 'post/create/setTitle',
      setContent: 'post/create/setContent',
      setUnsaved: 'post/create/setUnsaved',
      setSelectedFile: 'file/create/setSelectedFile',
      setPreviewImage: 'file/create/setPreviewImage',
    }),

    ...mapActions({
      createPost: 'post/create/createPost',
      pushMessage: 'notification/pushMessage',
      getPostById: 'post/show/getPostById',
      updatePost: 'post/edit/updatePost',
      deletePost: 'post/destroy/deletePost',
      createFile: 'file/create/createFile',
    }),

    async submitCreatePost() {
      if (!this.isLoggedIn) {
        return this.pushMessage({ content: '请登录!' });
      }

      try {
        await this.createPost({
          data: {
            title: this.title,
            content: this.content,
          },
          file: this.selectedFile,
        });

        this.$router.push({
          name: 'postCreate',
          query: { post: this.postId },
        });

        this.setUnsaved(false);
        this.getPost(this.postId);
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async getPost(postId) {
      try {
        await this.getPostById(postId);
        const { title, content, tags, file } = this.post;

        this.setPostId(postId);
        this.setTitle(title);
        this.setContent(content);
        this.setTags(tags);

        if (file) {
          this.setPreviewImage(file.size.large);
        }
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    reset() {
      this.setPostId(null);
      this.setTitle('');
      this.setContent('');
      this.setTags(null);
      this.setUnsaved(false);
      this.setSelectedFile(null);
      this.setPreviewImage(null);
      this.postCache = null;
    },

    async submitUpdatePost() {
      try {
        await this.updatePost({
          postId: this.postId,
          data: {
            title: this.title,
            content: this.content,
          },
        });

        this.setUnsaved(false);
        this.getPost(this.postId);
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    async onDeletePost() {
      try {
        await this.deletePost({ postId: this.postId });

        this.$router.push({
          name: 'postCreate',
        });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    onChangeFileCreate(files) {
      console.log(files);
      const file = files[0];

      if (!file) return;

      if (!this.title) {
        this.setTitle(file.name.split('.')[0]);
      }

      if (this.postId) {
        this.submitCreateFile();
      } else {
        this.submitCreatePost();
      }
    },

    async submitCreateFile() {
      if (!this.isLoggedIn) {
        return this.pushMessage({ content: '请登录!' });
      }

      try {
        await this.createFile({ postId: this.postId, file: this.selectedFile });
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
  },

  /**
   * 使用组件
   */
  components: {
    PostTagField,
    PostTitleField,
    PostContentField,
    PostActions,
    PostMeta,
    FileCreate,
  },
});
</script>

<style scoped>
@import './styles/post-create.css';
</style>
