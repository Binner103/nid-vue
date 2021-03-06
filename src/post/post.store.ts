import { Module } from 'vuex';
import { RootState } from '../app/app.store';
import {
  postCreateStoreModule,
  PostCreateStoreState,
} from './create/post-create.store';
import {
  postEditStoreModule,
  PostEditStoreState,
} from './edit/post-edit.store';
import {
  postIndexStoreModule,
  PostIndexStoreState,
} from './index/post-index.store';
import { postShowStoreModule } from './show/post-show.store';
import { PostDestroyStoreState, postDestroyStoreModule } from '@/post/destroy/post-destroy.store';

export interface PostStoreState {
  destroy: PostDestroyStoreState;
  create: PostCreateStoreState;
  index: PostIndexStoreState;
  edit: PostEditStoreState;
}

export const postStoreModule: Module<PostStoreState, RootState> = {
  namespaced: true,

  modules: {
    destroy: postDestroyStoreModule,
    create: postCreateStoreModule,
    index: postIndexStoreModule,
    show: postShowStoreModule,
    edit: postEditStoreModule,
  },
};
