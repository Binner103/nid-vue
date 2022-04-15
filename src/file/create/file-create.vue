<template>
  <div :class="fileCreateClasses">
    <FileCreateMedia v-if="previewImage" />
    <FileCreateDragZone @change="onChangeDragZone" v-if="!uploading" />
    <FileCreateStatus v-if="uploading" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import FileCreateDragZone from './components/file-create-drag-zone.vue';
import FileCreateMedia from './components/file-create-media.vue';
import FileCreateStatus from './components/file-create-status.vue';

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
  computed: {
    ...mapGetters({
      previewImage: 'file/create/previewImage',
      uploading: 'file/create/uploading',
    }),

    fileCreateClasses() {
      return ['file-create', { active: this.previewImage }];
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
      setSelectedFile: 'file/create/setSelectedFile',
      setPreviewImage: 'file/create/setPreviewImage',
    }),
    ...mapActions({}),

    onChangeDragZone(files) {
      const file = files[0];

      if (file) {
        this.setSelectedFile(file);
        this.createImagePreview(file);
      }

      this.$emit('change', files);
    },

    createImagePreview(file) {
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = event => {
        this.setPreviewImage(event.target.result);
      };
    },
  },

  /**
   * 使用组件
   */
  components: {
    FileCreateDragZone,
    FileCreateMedia,
    FileCreateStatus,
  },
});
</script>

<style scoped>
@import './styles/file-create.css';
</style>
