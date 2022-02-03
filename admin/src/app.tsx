import { UserModelState } from "umi";
import { CategoryModelState } from "./models/category";
let str = localStorage.getItem('userinfo')??null
let userinfo:UserModelState = {
  login: false,
  name: ""
}
if(str!==null){
  userinfo = JSON.parse(str)
}
let Category = localStorage.getItem('Category')
let data:CategoryModelState = {list:[]}
if(Category){
  data.list=JSON.parse(Category)
}else{
  data.list=[]
}

export const dva = {
  config: {
    onError(err: any) {
      err.preventDefault();
      console.log('dva:',err.message);
    },
    initialState: {
      User: {
        name: userinfo?.name ?? '',
        login:userinfo?.login?true:false
      },
      Category:{
        list:data.list
      }
    },
  },
};