import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface User {
  id: number;
  name: string;
  avatar: number | null;
}

export interface UserShowStoreState {
  loading: boolean;
  user: User | null;
  touchdown: boolean;
}

export const userShowStoreModule: Module<UserShowStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    user: null,
    touchdown: false,
  } as UserShowStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    user(state) {
      return state.user;
    },

    touchdown(state) {
      return state.touchdown;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setUser(state, data) {
      state.user = data;
    },

    setTouchdown(state, data) {
      state.touchdown = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getUserById({ commit }, userId) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(`/users/${userId}`);
        commit('setUser', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
