<template>
  <component :is="layout">
    <router-view></router-view>
  </component>
</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import AppLayout from '@/app/layout/app-layout.vue';
import { getStorage } from './app.service';

export default {
  data() {
    return {
      layout: 'AppLayout',
    };
  },

  created() {
    // 用户令牌
    const token = getStorage('nid');

    if (token) {
      this.setToken(token);
      this.configApiHttpClientAuthHeader(token);
    }

    // 当前用户

    const userId = getStorage('uid');
    if (userId) {
      this.getCurrentUser(userId);
    }
  },

  methods: {
    ...mapMutations({
      setToken: 'auth/setToken',
    }),
    ...mapActions({
      configApiHttpClientAuthHeader: 'auth/configApiHttpClientAuthHeader',
      getCurrentUser: 'user/getCurrentUser',
    }),
  },

  components: {
    AppLayout,
  },
};
</script>

<style>
@import './styles/app.css';
@import './styles/normalize.css';
@import './styles/base.css';
@import './styles/theme.css';
@import './styles/page.css';
@import './styles/form.css';
@import './styles/button.css';
</style>
