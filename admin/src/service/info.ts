import { http } from "@/api/request";
import { ApiRespone, WebInfo } from "@/types";


async function getWebInfo(): Promise<ApiRespone<WebInfo>> {
  return new Promise((resolve, reject) => {
    http.get<ApiRespone<WebInfo>>('webinfo')
      .then(function (data) {
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        return reject({ message: '获取网站信息失败' })
      });
  });
}
async function upInfo (weixin:string,qq:string,zhihu:string,juejin:string,bilibili:string,github:string,des:string,email:string,avatar:string):Promise<ApiRespone<WebInfo>>{
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<WebInfo>>('webinfo/edit', {
      weixin,qq,zhihu ,juejin,bilibili,github,des,email,avatar
    })
    .then(function (data) {
      
      return resolve(data.data);
    })
    .catch(function (error) {
      console.log(error);
      reject({message:'提交失败'}) 
    });
  });
}
export default  {
  getWebInfo,
  upInfo
}