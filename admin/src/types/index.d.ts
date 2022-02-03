import { getDvaApp, useStore } from "umi"

export interface ApiRespone<T>{
  code:number,
  data:T,
  message:string
}
export type UserInfo = {
  name?: string,
  token?: string,
}
export interface CategoryList {
  id:number,
  name:string,
  des:string,
  lv:number,
  child:Array<CategoryList>,
  disable:boolean
}
export type Category={
  list:Array<CategoryList>,
  message:string
}
export interface HandleCategory{
  name:string,
  id?:string
  des?:string
}
export interface ArticleInfo{
  id:number,
  pid:number,
  title:string,
  introduction:string,
  content:string
}
export interface ArticleList{
  list:Array<ArticleInfo>,
  count:number,
  message:string
}
export interface ArticleCatche{
  data:ArticleInfo,
  message:string
}