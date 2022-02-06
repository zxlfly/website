import axios from "axios";
import { history } from 'umi';
const apiurl = "http://127.0.0.1:7001/admin/"
// const imgurl = "http://127.0.0.1:7001/public/admin/upload"
const service = axios.create({
    baseURL: apiurl,
})

// 请求拦截
service.interceptors.request.use((config) => {
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// 响应拦截
service.interceptors.response.use(
    async (response) => {
        let { data, config } = response
        return {data}
    },
    err => {
        return Promise.reject(err)
    }
)
export const http = service

