let ipUrl = 'http://127.0.0.1:7001/' 
let apiPath = {
    getIndex:ipUrl + 'api/index' ,  //  首页文章列表接口
    getList:ipUrl + 'api/getList',  // 根据分类id获取文章列表
    getDetail:ipUrl + 'api/getDetail',         // 文章详情
    getInfo:ipUrl + 'api/getInfo',         // 网站信息
    getAd:ipUrl + 'api/getAd',         // 广告
    getNav:ipUrl + 'api/getNav',         // 获取分类列表
}

export default apiPath;