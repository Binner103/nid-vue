<template>
  <div class="app-search">
    <AppSearchField />
    <AppSearchOptions />
    <AppSearchResultList v-if="hasSearchResults" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import AppSearchOptions from '@/app/search/components/app-search-options.vue';
import AppSearchField from '@/app/search/components/app-search-field.vue';
import AppSearchResultList from '@/app/search/components/app-search-result-list';
import { mapGetters } from 'vuex';

export default defineComponent({
  name: 'AppSearch',

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
   * 计算属性
   */
  computed: {
    ...mapGetters({
      hasSearchResults: 'search/hasSearchResults',
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
  methods: {},

  /**
   * 使用组件
   */
  components: {
    AppSearchResultList,
    AppSearchOptions,
    AppSearchField,
  },
});
</script>

<style scoped>
@import './styles/app-search.css';
</style>
