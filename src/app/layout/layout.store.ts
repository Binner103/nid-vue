import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface LayOutStoreState {
  theme: string;
  sideSheetComponent: string;
  // eslint-disable-next-line
  sideSheetProps: any;
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
    sideSheetComponent: '',
    sideSheetProps: null,
  } as LayOutStoreState,

  /**
   * 获取器
   */
  getters: {
    theme(state) {
      return state.theme;
    },

    sideSheetComponent(state) {
      return state.sideSheetComponent;
    },

    sideSheetProps(state) {
      return state.sideSheetProps;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setTheme(state, data) {
      state.theme = data;
    },

    setSideSheetComponent(state, data) {
      state.sideSheetComponent = data;
    },

    resetSideSheet(state) {
      state.sideSheetComponent = '';
      state.sideSheetProps = null;
    },

    setSideSheetProps(state, data) {
      state.sideSheetProps = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
