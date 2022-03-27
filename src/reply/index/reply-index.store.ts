import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface ReplyListItem {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: number;
  };
}

export type Replies = Array<ReplyListItem>;

export interface ReplyIndexStoreState {
  loading: boolean;
  replies: Replies;
}

export const replyIndexStoreModule: Module<ReplyIndexStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    replies: [],
  } as ReplyIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    replies(state) {
      return state.replies;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setReplies(state, data) {
      state.replies = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getReplies({ commit }, commentId: number) {
      commit('setLoading', true);

      try {
        const response = await apiHttpClient.get(
          `comments/${commentId}/replies`,
        );
        commit('setReplies', response.data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
