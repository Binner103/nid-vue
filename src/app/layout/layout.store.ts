import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface LayOutStoreState {
  theme: string;
}

export const layoutStoreModule: Module<LayOutStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    theme: 'light',
  } as LayOutStoreState,

  /**
   * 获取器
   */
  getters: {
    theme(state) {
      return state.theme;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setTheme(state, data) {
      state.theme = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
