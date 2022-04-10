import { Module } from 'vuex';
import { apiHttpClient } from '@/app/app.service';
import { RootState } from '../../app/app.store';

export interface PostCreateStoreState {
  loading: boolean;
}

export interface CreatePostData {
  title?: string;
  content?: string;
}

export interface CreatePostOptions {
  data?: CreatePostData;
}

export const postCreateStoreModule: Module<PostCreateStoreState, RootState> = {
  namespaced: true,

  state: {
    loading: false,
  } as PostCreateStoreState,

  getters: {
    loading(state) {
      return state.loading;
    },
  },

  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },
  },

  actions: {
    async createPost({ commit }, options: CreatePostOptions = {}) {
      commit('setLoading', true);
      const { data } = options;

      try {
        const response = await apiHttpClient.post(`posts`, data);
        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
