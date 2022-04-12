<template>
  <div class="post-actions">
    <button :class="submitButtonClasses" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'PostActions',

  /**
   * 属性
   */
  props: {
    size: {
      type: String,
    },
  },

  /**
   * 事件
   */
  emits: ['update', 'create'],

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
      postId: 'post/create/postId',
      title: 'post/create/title',
      unsaved: 'post/create/unsaved',
    }),

    submitButtonText() {
      return this.postId ? '更新' : '发布';
    },

    submitButtonClasses() {
      return ['button', this.size, { outline: this.unsaved }];
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
    onClickSubmitButton() {
      if (!this.title.trim()) return;

      if (this.postId) {
        this.$emit('update');
      } else {
        this.$emit('create');
      }
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/post-actions.css';
</style>
