import { http } from "@/api/request";
import { ApiRespone, UserInfo } from "@/types";
import md5 from "md5";

export default async function login (userName:string,password:string):Promise<ApiRespone<UserInfo>>{
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<UserInfo>>('login', {
      name: userName,
      pwd:md5(password)
    })
    .then(function (data) {
      return resolve(data.data);
    })
    .catch(function (error) {
      console.log(error);
      reject({message:'登录失败'}) 
    });
  });
}