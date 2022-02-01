import { FC, useEffect, useState } from 'react';
import './index.css'
import { Row, Col, Input, Select, Button, DatePicker, ConfigProvider, message, Spin } from 'antd'
import { connect, ConnectProps, UserModelState } from 'umi';
import article from '@/service/article';
import { ArticleInfo } from '@/types';
interface AppProps extends ConnectProps {
  User: UserModelState;
}
const { Option } = Select;
const { TextArea } = Input

const ArticleList:FC<AppProps>= props=> {
  const [list,setList]=useState<Array<ArticleInfo>>([])
  const [isLoading,setIsLoading]=useState(false)
  const getList = async()=>{
    setIsLoading(true)
    let res = await article.getArticleList()
    console.log('res:',res);
    setIsLoading(false)
    if(res.code===200){
      setList(res.data.list)
    }else{
      message.error(res.message)
    }
  }
  useEffect(()=>{
    getList()
  },[])
  return (
    <Spin tip="Loading..." spinning={isLoading}>
    ???
    </Spin>
  )
}
export default ArticleList