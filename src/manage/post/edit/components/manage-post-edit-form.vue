<template>
  <div class="manage-post-edit-form">
    <TextField
      v-model="currentEditPost.title"
      placeholder="标题"
      @dirty="onDirty"
      v-if="isSingleSelect"
    />
    <TextareaField
      class="bordered"
      :rows="1"
      v-model="currentEditPost.content"
      placeholder="描述"
      @dirty="onDirty"
      v-if="isSingleSelect"
    />
    <PostTagField :posts="selectedPosts" @updated="onUpdatePostTagField" />
    <div class="actions">
      <SubmitButton text="更新" :unsaved="unsaved" @submit="onSubmitButton" />
      <DeleteButton @delete="onDeleteButton" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import TextareaField from '@/app/components/textarea-field.vue';
import SubmitButton from '@/app/components/submit-button.vue';
import DeleteButton from '@/app/components/delete-button.vue';
import PostTagField from '@/post/components/post-tag-field.vue';

export default defineComponent({
  name: 'ManagePostEditForm',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {
      unsaved: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({
      currentEditPost: 'manage/select/currentEditPost',
      isSingleSelect: 'manage/select/isSingleSelect',
      selectedPosts: 'manage/select/selectedPosts',
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
    ...mapMutations({
      setPostItem: 'post/index/setPostItem',
    }),
    ...mapActions({
      updatePost: 'post/edit/updatePost',
      pushMessage: 'notification/pushMessage',
      deleteSelectedPosts: 'manage/select/deleteSelectedPosts',
      getSelectedPosts: 'manage/select/getSelectedPosts',
    }),

    onDirty() {
      this.unsaved = true;
    },

    async onSubmitButton() {
      if (!this.unsaved) return;

      try {
        await this.updatePost({
          postId: this.currentEditPost.id,
          data: this.currentEditPost,
        });

        this.setPostItem(this.currentEditPost);

        this.unsaved = false;
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },

    onDeleteButton() {
      this.deleteSelectedPosts();
    },

    onUpdatePostTagField() {
      this.getSelectedPosts();
    },
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    TextareaField,
    SubmitButton,
    DeleteButton,
    PostTagField,
  },
});
</script>

<style scoped>
@import './styles/manage-post-edit-form.css';
</style>
