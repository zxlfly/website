const apiurl = "http://127.0.0.1:7001/"
export const imgurl = "http://127.0.0.1:7001"
let apiPath = {
    getIndex:apiurl + 'api/index' ,  //  首页文章列表接口
    getList:apiurl + 'api/getList',  // 根据分类id获取文章列表
    getDetail:apiurl + 'api/getDetail',         // 文章详情
    getInfo:apiurl + 'api/getInfo',         // 网站信息
    getAd:apiurl + 'api/getAd',         // 广告
    getNav:apiurl + 'api/getNav',         // 获取分类列表
}

export default apiPath;