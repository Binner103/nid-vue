<template>
  <div class="submit-button">
    <button :class="submitButtonClasses" @click="onClickSubmitButton">
      {{ submitButtonText }}
    </button>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SubmitButton',

  /**
   * 属性
   */
  props: {
    text: {
      type: String,
      default: '提交',
    },

    unsaved: {
      type: Boolean,
    },
  },

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 事件
   */
  emits: ['submit'],

  /**
   * 计算属性
   */
  computed: {
    submitButtonText() {
      return this.text;
    },

    submitButtonClasses() {
      return ['button', { outline: this.unsaved }];
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
      this.$emit('submit');
    },
  },

  /**
   * 使用组件
   */
  components: {},
});
</script>

<style scoped>
@import './styles/submit-button.css';
</style>
