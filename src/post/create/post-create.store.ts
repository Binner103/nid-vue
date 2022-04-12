import { Module } from 'vuex';
import { apiHttpClient } from '@/app/app.service';
import { RootState } from '../../app/app.store';

export interface PostCreateStoreState {
  unsaved: boolean;
  postId: number | null;
  title: string;
  content: string;
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
    unsaved: false,
    postId: null,
    title: '',
    content: '',
    loading: false,
  } as PostCreateStoreState,

  getters: {
    unsaved(state) {
      return state.unsaved;
    },

    postId(state) {
      return state.postId;
    },

    title(state) {
      return state.title;
    },

    content(state) {
      return state.content;
    },

    loading(state) {
      return state.loading;
    },
  },

  mutations: {
    setUnsaved(state, data) {
      state.unsaved = data;
    },

    setPostId(state, data) {
      state.postId = data;
    },

    setTitle(state, data) {
      state.title = data;
    },

    setContent(state, data) {
      state.content = data;
    },

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
        commit('setPostId', response.data.insertId);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
