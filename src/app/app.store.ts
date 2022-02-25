import { createStore } from 'vuex';
import { authStoreModule } from '../auth/auth.store';
import { AuthLoginStoreState } from '../auth/login/auth.login.store';
import { postStoreModule, PostStoreState } from '../post/post.store';
import { userStoreModule, UserStoreState } from '../user/user.store';
import { localStorageStorePlugin } from './app.store.plugin';
import { layoutStoreModule, LayOutStoreState } from './layout/layout.store';
import {
  appNotificationStoreModule,
  AppNotificationStoreState,
} from './notification/app.notification.store';

export interface RootState {
  appName: string;
  post: PostStoreState;
  layout: LayOutStoreState;
  auth: AuthLoginStoreState;
  notification: AppNotificationStoreState;
  user: UserStoreState;
}

/**
 * 创建 Store
 */
const store = createStore({
  state: {
    appName: '宁皓网',
  } as RootState,

  modules: {
    post: postStoreModule,
    layout: layoutStoreModule,
    auth: authStoreModule,
    notification: appNotificationStoreModule,
    user: userStoreModule,
  },

  plugins: [localStorageStorePlugin],
});

/**
 * 默认导出
 */
export default store;
