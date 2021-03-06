import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface LikeDestroyStoreState {
  loading: boolean;
}

export interface DeleteUserLikePostOptions {
  postId?: number;
}

export const likeDestroyStoreModule: Module<
  LikeDestroyStoreState,
  RootState
> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
  } as LikeDestroyStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async deleteUserLikePost(
      { commit },
      options: DeleteUserLikePostOptions = {},
    ) {
      commit('setLoading', true);

      const { postId } = options;

      try {
        const response = await apiHttpClient.delete(`posts/${postId}/like`);
        commit('setLoading', false);

        commit(
          'post/index/setPostItemLiked',
          { postId, liked: 0 },
          { root: true },
        );

        commit(
          'post/index/setPostItemTotalLikes',
          { postId, actionType: 'decrease' },
          { root: true },
        );

        commit('post/show/setPostLiked', { postId, liked: 0 }, { root: true });

        commit(
          'post/show/setPostTotalLikes',
          { postId, actionType: 'decrease' },
          { root: true },
        );

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },

  /**
   * 模块
   */
  modules: {},
};
