import { UserModelState, UserModelType } from "umi";
let str = localStorage.getItem('userinfo')??''
const userinfo:UserModelState | null = JSON.parse(str)
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