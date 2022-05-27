<template>
  <div class="user-create">
    <div class="form">
      <h1 class="header">注册用户</h1>
      <TextField v-model="name" placeholder="用户" />
      <TextField v-model="password" placeholder="密码" type="password" />
      <ButtonField text="注册" size="large" />
    </div>
    <div class="action">
      <router-link class="link" :to="loginLinkTo">登录 →</router-link>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import TextField from '@/app/components/text-field.vue';
import ButtonField from '@/app/components/button-field.vue';

export default defineComponent({
  name: 'UserCreate',

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
    ...mapGetters({}),
    loginLinkTo() {
      return { name: 'login' };
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
    ...mapMutations({}),
    ...mapActions({}),
  },

  /**
   * 使用组件
   */
  components: {
    TextField,
    ButtonField,
  },
});
</script>

<style scoped>
@import './styles/user-create.css';
</style>
