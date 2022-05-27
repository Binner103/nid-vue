<template>
  <div class="user-create">
    <div class="content" v-if="isSuccessful">
      <h1 class="header">注册成功 :)</h1>
      <div class="description">恭喜，您成功注册了用户: {{ name }}</div>
    </div>
    <div class="form" v-if="!isSuccessful">
      <h1 class="header">注册用户</h1>
      <TextField v-model="name" placeholder="用户" />
      <TextField v-model="password" placeholder="密码" type="password" />
      <ButtonField
        text="注册"
        size="large"
        :type="registerButtonType"
        @click="onClickRegisterButton"
      />
    </div>
    <div class="action" v-if="!isSuccessful">
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
    return {
      name: '',
      password: '',
      isSuccessful: false,
    };
  },

  /**
   * 计算属性
   */
  computed: {
    ...mapGetters({}),

    loginLinkTo() {
      return { name: 'login' };
    },

    registerButtonType() {
      return this.name && this.password ? '' : 'outline';
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
    ...mapActions({
      createUser: 'user/create/createUser',
      pushMessage: 'notification/pushMessage',
      login: 'auth/login/login',
    }),

    async onClickRegisterButton() {
      const data = {
        name: this.name,
        password: this.password,
      };

      try {
        await this.createUser({ data });
        await this.login(data);

        this.pushMessage({ content: '注册并登录成功！' });

        this.isSuccessful = true;
      } catch (error) {
        this.pushMessage({ content: error.data.message });
      }
    },
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
