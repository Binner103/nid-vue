<template>
  <div class="file-create">
    <FileCreateDragZone @change="onChangeDragZone" />
    <FileCreateMedia />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapMutations, mapActions } from 'vuex';
import FileCreateDragZone from './components/file-create-drag-zone.vue';
import FileCreateMedia from './components/file-create-media.vue';

export default defineComponent({
  name: 'FileCreate',

  /**
   * 属性
   */
  props: {},

  /**
   * 数据
   */
  data() {
    return {};
  },

  /**
   * 事件
   */
  emits: ['change'],

  /**
   * 计算属性
   */
  computed: {},

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
    ...mapActions({}),

    onChangeDragZone(files) {
      this.$emit('change', files);
    },
  },

  /**
   * 使用组件
   */
  components: {
    FileCreateDragZone,
    FileCreateMedia,
  },
});
</script>

<style scoped>
@import './styles/file-create.css';
</style>
