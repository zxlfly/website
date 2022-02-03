import { http } from "@/api/request";
import { ArticleCatche, ApiRespone, ArticleList, ArticleInfo } from "@/types";

async function getArticleList(page:number,size:number): Promise<ApiRespone<ArticleList>> {
  return new Promise((resolve, reject) => {
    http.get<ApiRespone<ArticleList>>('article',{
      params:{
        page,
        size
      }
    })
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
  content: string,sort:number): Promise<ApiRespone<ArticleList>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<ArticleList>>('article/add', {
      articleId,
      pid,
      title,
      introduction,
      content,
      sort
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
async function getArticle(id: number): Promise<ApiRespone<ArticleInfo>> {
  return new Promise((resolve, reject) => {
    http.get<ApiRespone<ArticleInfo>>('article/getArticle', {
      params:{
        id
      }
    })
      .then(function (data) {
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        return reject({ message: '获取失文章失败' })
      });
  });
}

async function editArticle(id: number,pid:number,title: string,introduction: string,
  content: string,sort:number):Promise<ApiRespone<ArticleCatche>> {
    return new Promise((resolve, reject) => {
      http.post<ApiRespone<ArticleCatche>>('article/editArticle', {
        id,pid,title,introduction,content,sort
      })
        .then((e) => {
          resolve(e.data)
          
        }).catch((err) => {
          reject({message:'编辑失败'})
        })
    })
  }
async function delArticle(id: number): Promise<ApiRespone<ArticleInfo>> {
  return new Promise((resolve, reject) => {
    http.post<ApiRespone<ArticleInfo>>('article/delArticle', {
      id
    })
      .then(function (data) {
        return resolve(data.data);
      })
      .catch(function (error) {
        console.log(error);
        return reject({ message: '删除文章失败' })
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
  getArticle,
}