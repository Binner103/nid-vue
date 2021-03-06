import { Module } from 'vuex';
import { RootState } from '@/app/app.store';

export interface AppToolbarStoreState {
  showPostListLayoutSwitcher: boolean;
  showPostShowNavigator: boolean;
  showSideSheetItem: boolean;
  showAppSearch: boolean;
}

export const appToolbarStoreModule: Module<AppToolbarStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    showPostListLayoutSwitcher: false,
    showPostShowNavigator: false,
    showSideSheetItem: false,
    showAppSearch: false,
  } as AppToolbarStoreState,

  /**
   * 获取器
   */
  getters: {
    showPostListLayoutSwitcher(state) {
      return state.showPostListLayoutSwitcher;
    },

    showPostShowNavigator(state, _, rootState) {
      return state.showPostShowNavigator && rootState.post.index.posts.length;
    },

    showSideSheetItem(state) {
      return state.showSideSheetItem;
    },

    showAppSearch(state) {
      return state.showAppSearch;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setShowPostListLayoutSwitcher(state, data) {
      state.showPostListLayoutSwitcher = data;
    },

    setShowPostShowNavigator(state, data) {
      state.showPostShowNavigator = data;
    },

    setShowSideSheetItem(state, data) {
      state.showSideSheetItem = data;
    },

    setShowAppSearch(state, data) {
      state.showAppSearch = data;
    },
  },

  /**
   * 动作
   */
  actions: {},
};
