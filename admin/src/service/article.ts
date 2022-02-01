import { http } from "@/api/request";
import { ArticleCatche, ApiRespone, ArticleList, ArticleInfo } from "@/types";

async function getArticleList(): Promise<ApiRespone<ArticleList>> {
  return new Promise((resolve, reject) => {
    http.get<ApiRespone<ArticleList>>('article',)
      .then(function (data) {
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        reject({ message: '获取分类失败' })
      });
  });
}
async function addArticle(articleId:number,pid:number,title: string,introduction: string,
  content: string,): Promise<ApiRespone<ArticleList>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<ArticleList>>('article/add', {
      articleId,
      pid,
      title,
      introduction,
      content
    })
      .then(function (data) {
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        return reject({ message: '添加失败' })
      });
  });
}
async function editArticle(name: string, id: string, des: string): Promise<ApiRespone<ArticleList>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<ArticleList>>('article/edit', {
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
async function delArticle(id: number): Promise<ApiRespone<ArticleList>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<ArticleList>>('article/del', {
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

async function addCatcheArticle(id: number,pid:number,title: string,introduction: string,
content: string,):Promise<ApiRespone<ArticleCatche>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<ArticleCatche>>('article/addCache', {
      id,pid,title,introduction,content
    })
      .then((e) => {
        resolve(e.data)
        
      }).catch((err) => {
        reject({message:'缓存失败'})
      })
  })
}
async function getCatcheArticle():Promise<ApiRespone<ArticleInfo>> {
  return new Promise((resolve, reject) => {
    http.get<ApiRespone<ArticleInfo>>('article/getCache',)
      .then(function (data) {
        return resolve(data.data);
      })
      .catch(function (error) {
        reject({ message: '获取缓存失败' })
      });
  });
}
export default {
  addArticle,
  getArticleList,
  editArticle,
  delArticle,
  addCatcheArticle,
  getCatcheArticle,
}