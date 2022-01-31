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
  child:Array<CategoryList>
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