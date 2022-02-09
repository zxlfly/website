import axios,{AxiosRequestConfig, AxiosRequestHeaders,AxiosResponse} from "axios";
import { history } from 'umi';
export const apiurl = "http://127.0.0.1:7001/admin/"
export const imgurl = "http://127.0.0.1:7001"
export const TOKEN_KEY = "BLOG_USER_TOKEN"
const service = axios.create({
    baseURL: apiurl,
})

// 请求拦截
service.interceptors.request.use((config:AxiosRequestConfig) => {
        // 请求加token
        const token = window.localStorage.getItem(TOKEN_KEY)
        // console.log('token:',token);
        // console.log('config.url:',config.url);
        // console.log(config.url!=='login');
        // 设置url白名单
        if (token&&config.url!=='login') {
            (config.headers as AxiosRequestHeaders).authorization = 'Bearer ' + token
        }
        // console.log('config',config);
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
        // 写token
        if (data.code === 200) {
            if (config.url === 'login') {
                localStorage.setItem(TOKEN_KEY, data.data.token)
            }
        } else if (data.code === -5) {
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

