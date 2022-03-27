import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient, queryStringProcess } from '@/app/app.service';
import { filterProcess } from '../../post/post.service';
import { StringifiableRecord } from 'query-string';
import { COMMENTS_PER_PAGE } from '../../app/app.config';

export interface CommentListItem {
  id: number;
  content: string;
  user: {
    id: number;
    name: string;
    avatar: number;
  };
  post: {
    id: number;
    title: string;
  };
  totalReplies: number | null;
}

export type Comments = Array<CommentListItem>;

export interface CommentIndexStoreState {
  loading: boolean;
  comments: Comments;
  filter: { [name: string]: string } | null;
  queryString: string;
  nextPage: number;
  totalPage: number;
}

export interface GetCommentOptions {
  filter?: { [name: string]: string };
}

export const commentIndexStoreModule: Module<
  CommentIndexStoreState,
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
    comments: [],
    filter: null,
    queryString: '',
    nextPage: 1,
    totalPage: 1,
  } as CommentIndexStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    comments(state) {
      return state.comments;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setComments(state, data) {
      state.comments = data;
    },

    setFilter(state, data) {
      const filter = filterProcess(data);
      state.filter = filter;
    },

    setQueryString(state, data) {
      state.queryString = data;
    },

    setNextPage(state, data) {
      if (data) {
        state.nextPage = data;
      } else {
        state.nextPage++;
      }
    },

    setTotalPage(state, data) {
      state.totalPage = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async getComments({ commit, state, dispatch }, options: GetCommentOptions) {
      let getCommentsQueryString = '';

      if (Object.keys(options).length) {
        getCommentsQueryString = await dispatch(
          'getCommentsPreProcess',
          options,
        );
      } else {
        getCommentsQueryString = state.queryString;
      }

      try {
        const response = await apiHttpClient.get(
          `comments?page=${state.nextPage}&${getCommentsQueryString}`,
        );

        dispatch('getCommentsPostProcess', response);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },

    getCommentsPreProcess({ commit, state }, options: GetCommentOptions) {
      commit('setLoading', true);
      commit('setFilter', options.filter);

      const getCommentsQueryObject: StringifiableRecord = {
        ...state.filter,
      };

      const getCommentsQueryString = queryStringProcess(getCommentsQueryObject);

      if (state.queryString !== getCommentsQueryString) {
        commit('setNextPage', 1);
      }

      commit('setQueryString', getCommentsQueryString);

      return getCommentsQueryString;
    },

    getCommentsPostProcess({ commit, state }, response) {
      if (state.nextPage === 1) {
        commit('setComments', response.data);
      } else {
        commit('setComments', [...state.comments, ...response.data]);
      }

      commit('setLoading', false);

      const total =
        response.header['X-Total-Count'] || response.header['x-total-count'];

      const totalPages = Math.ceil(total / COMMENTS_PER_PAGE);

      commit('setTotalPages', totalPages);

      commit('setNextPage');
    },
  },
};