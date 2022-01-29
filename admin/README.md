# 注释
- ``types``文件夹下为类型声明
  - ``index``
    - api请求相关
  - ``connect``
    - 使用react-redux链接的类型
    - 所有的models都在此注入
    - 可代替``ConnectProps``
    - 可以去掉这个
- ``wrappers``权限相关操作
- ``service``api封装目录
- ``models``所有全局数据
- ``api``axios封装

# umi
- ``ConnectProps``
  - props类型的补强，页面组件的自定义props类型继承它就行了
  - 可以获得history、children等（dom，路由相关类型）
  - 使用``FC``
- ``connect``注入
  - 选择这种方式注入数据到页面时
  - 取数据直接结构即可，不需要单独写类型``({ User }: { User: UserModelState }) => ({User})``
- ``dispatch``type记得加上命名空间
- ``useSelector``获取数据同``connect``
  - ``const userinfo = useSelector(({ User }: { User: UserModelState }) => ({User}))``
- ``mapDispatchToProps``用法
  - 需要单独给事件写类型，麻烦
  - 例子：login页面
  - 待优化