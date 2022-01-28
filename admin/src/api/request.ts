import axios,{AxiosRequestConfig, AxiosRequestHeaders,AxiosResponse} from "axios";
import { history } from 'umi';
const apiurl = "http://127.0.0.1:7001/admin/"
// const imgurl = "http://127.0.0.1:7001/public/admin/upload"
export const TOKEN_KEY = "BLOG_USER_TOKEN"
const service = axios.create({
    baseURL: apiurl,
})

// 请求拦截
service.interceptors.request.use((config:AxiosRequestConfig) => {
        // 请求加token
        const token = window.localStorage.getItem(TOKEN_KEY)
        // 设置url白名单
        if (token&&config.url!==apiurl+'login') {
            // config.headers.common['Authorization'] = 'Bearer ' + token
            (config.headers as AxiosRequestHeaders).authorization = localStorage.getItem('token') as string
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)
// 响应拦截
service.interceptors.response.use(
    async (response:AxiosResponse) => {
        let { data, config } = response
        // console.log('响应拦截',response)
        // 写token
        // 也可以卸载login的逻辑李
        if (data.code === 200) {
            if (config.url === apiurl+'login') {
                localStorage.setItem(TOKEN_KEY, data.data.token)
            }
        } else if (data.code === -1) {
            localStorage.removeItem(TOKEN_KEY)
            history.push('/login');
        }
        return {data}
    },
    err => {
        return Promise.reject(err)
    }
)
export const http = service

