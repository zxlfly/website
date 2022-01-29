import { UserModelState } from "umi";
let str = localStorage.getItem('userinfo')??null
let userinfo:UserModelState = {
  login: false,
  name: ""
}
if(str!==null){
  userinfo = JSON.parse(str)
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
    },
  },
};