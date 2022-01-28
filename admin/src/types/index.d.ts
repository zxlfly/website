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
export type ModelsState = ReturnType<typeof getDvaApp>