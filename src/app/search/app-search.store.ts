import { Module } from 'vuex';
import { RootState } from '@/app/app.store';
import { apiHttpClient } from '@/app/app.service';

export interface UserResult {
  id: number;
  name: string;
  avatar: number;
  totalPosts: number;
}
export interface TagsResult {
  id: number;
  name: string;
  totalPosts: number;
}

export interface SearchOptions {
  title: string;
  value: string;
  query: string;
}

export interface AppSearchStoreState {
  loading: boolean;
  searchKeyword: string;
  searchResults: Array<UserResult | TagsResult> | null;
  searchOption: SearchOptions;
}

export const appSearchStoreModule: Module<AppSearchStoreState, RootState> = {
  /**
   * 命名空间
   */
  namespaced: true,

  /**
   * 数据
   */
  state: {
    loading: false,
    searchKeyword: '',
    searchResults: null,
    searchOption: {
      title: '标签',
      value: 'tags',
      query: 'name',
    },
  } as AppSearchStoreState,

  /**
   * 获取器
   */
  getters: {
    loading(state) {
      return state.loading;
    },

    searchKeyword(state) {
      return state.searchKeyword;
    },
    searchResults(state) {
      return state.searchResults
        ? state.searchResults.map(result => {
            let item, title, link, meta, extra;

            switch (state.searchOption.value) {
              case 'tags':
                item = result as TagsResult;
                title = item.name;
                meta = item.totalPosts;
                link = `/popular?tag=${item.name}`;
                break;
              case 'users':
                item = result as UserResult;
                title = item.name;
                meta = item.totalPosts;
                link = `/users=${item.id}`;
                extra = {
                  id: item.id,
                  avatar: item.avatar,
                };
                break;
            }
            return {
              title,
              meta,
              link,
              extra,
            };
          })
        : null;
    },
    searchOption(state) {
      return state.searchOption;
    },

    hasSearchResults(state) {
      return state.searchResults && state.searchResults.length > 0;
    },
  },

  /**
   * 修改器
   */
  mutations: {
    setLoading(state, data) {
      state.loading = data;
    },

    setSearchKeyword(state, data) {
      state.searchKeyword = data;
    },

    setSearchResults(state, data) {
      state.searchKeyword = data;
    },
    setSearchOption(state, data) {
      state.searchOption = data;
    },
  },

  /**
   * 动作
   */
  actions: {
    async search({ commit, state }) {
      commit('setLoading', true);

      try {
        const {
          searchOption: { value, query },
          searchKeyword,
        } = state;

        const response = await apiHttpClient.get(
          `/search/${value}?${query}=${searchKeyword}`,
        );
        commit('setSearchResults', response.data);

        commit('setLoading', false);

        return response;
      } catch (error) {
        commit('setLoading', false);

        throw error.response;
      }
    },
  },
};
