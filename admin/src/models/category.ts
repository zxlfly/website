import category from '@/service/category';
import { ApiRespone, Category, CategoryList, UserInfo } from '@/types';
import getChildren from '@/utils/getChildren';
import { Effect, ImmerReducer, Subscription } from 'umi';

export interface CategoryModelState {
  list:Array<CategoryList>
}

export interface CategoryModelType {
  namespace: 'Category';
  state: CategoryModelState;
  effects: {
    getList: Effect;
  };
  reducers: {
    upList: ImmerReducer<CategoryModelState>;
  };
  subscriptions: {  };
}
const CategoryModel: CategoryModelType = {
  namespace: 'Category',
  state: {
    list:[]
  },

  effects: {
    *getList({ payload, cb }, { call, put }) {
      
      const res:ApiRespone<Category> = yield call(category.getCategoryList)
      const {code,data,message} = res
      const {list} =data
      if (code==200) {
        let arr: CategoryList[] = []
        list.forEach((item: CategoryList) => {
          item.lv = 1
          arr.push(item)
          getChildren(item, arr, 2)
        })
        yield put({ type: 'upList',payload:{arr} })
        cb(true)
      } else {
        cb(message)
      }
    },
  },
  reducers: {
    upList(state, action) {
      state.list = action.payload.arr;
      localStorage.setItem('Category', JSON.stringify(state.list))
    },
  },
  subscriptions: {
    setup(){}
  },
};

export default CategoryModel;