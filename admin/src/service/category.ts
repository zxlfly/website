import { http } from "@/api/request";
import { HandleCategory, ApiRespone, Category } from "@/types";

async function getCategoryList(): Promise<ApiRespone<Category>> {
  return new Promise((resolve, reject) => {
    http.get<ApiRespone<Category>>('category',)
      .then(function (data) {
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        reject({ message: '获取分类失败' })
      });
  });
}
async function addCategory(name: string, id?: string,des?:string): Promise<ApiRespone<HandleCategory>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<HandleCategory>>('category/add', {
      name,
      id,
      des
    })
      .then(function (data) {
        console.log('qq:', data.data);
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        return reject({ message: '添加失败' })
      });
  });
}
async function editCategory(name: string, id: string,des:string): Promise<ApiRespone<HandleCategory>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<HandleCategory>>('category/edit', {
      name,
      id,
      des
    })
      .then(function (data) {
        console.log('qq:', data.data);
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        return reject({ message: '更新失败' })
      });
  });
}
async function delCategory(id: number): Promise<ApiRespone<HandleCategory>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<HandleCategory>>('category/del', {
      id
    })
      .then(function (data) {
        console.log('qq:', data.data);
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        return reject({ message: '删除失败' })
      });
  });
}
export default {
  addCategory,
  getCategoryList,
  editCategory,
  delCategory
}