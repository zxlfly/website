import {TOKEN_KEY } from '@/api/request';
import login from '@/service/user';
import { ApiRespone, UserInfo } from '@/types';
import { Effect, ImmerReducer, Subscription } from 'umi';

export interface UserModelState {
  name: string;
  login?: boolean;
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
    name: '',
    login:false
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
      state.login=true
      localStorage.setItem('userinfo', JSON.stringify(state))
    },
    loginOut(state) {
      state.name = '';
      state.login=false
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('userinfo')
    }
  },
  subscriptions: {
    setup(){}
  },
};

export default UserModel;