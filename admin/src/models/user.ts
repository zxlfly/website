import { http, TOKEN_KEY } from '@/api/request';
import login from '@/service/user';
import { ApiRespone, UserInfo } from '@/types';
import { Effect, getDvaApp, ImmerReducer, Reducer, Subscription } from 'umi';

export interface UserModelState {
  name: string;
}

export interface UserModelType {
  namespace: 'User';
  state: UserModelState;
  effects: {
    toLogin: Effect;
    toLoginOut: Effect;
  };
  reducers: {
    login: ImmerReducer<UserModelState>;
    loginOut: ImmerReducer<UserModelState>;
  };
  subscriptions: { setup: Subscription };
}
const UserModel: UserModelType = {
  namespace: 'User',

  state: {
    name: localStorage.getItem('userinfo') ?? ''
  },

  effects: {
    *toLogin({ payload, cb }, { call, put }) {
      const res:ApiRespone<UserInfo> = yield call(login,payload.userName,payload.password)
      const {code,data,message} = res
      const {name} =data
      if (code==200) {
        yield put({ type: 'login',payload:{name} })
        cb(true)
      } else {
        cb(message)
      }
    },
    *toLoginOut({ payload }, { call, put }) {
      yield put({ type: 'loginOut' })
    },
  },
  reducers: {
    login(state, action) {
      state.name = action.payload.name;
      localStorage.setItem('userinfo', action.payload.name)
    },
    loginOut(state) {
      state.name = '';
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('userinfo')
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname !== '/login') {
          // dispatch({
          //   type: 'query',
          // });
        }
      });
    },
  },
};

export default UserModel;