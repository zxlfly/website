import { FC, useEffect, useState } from 'react';
import './index.css'
import { Row, Col, Input, Select, Button, DatePicker, ConfigProvider } from 'antd'
import { connect, ConnectProps, UserModelState } from 'umi';
interface AppProps extends ConnectProps {
  User: UserModelState;
}
const { Option } = Select;
const { TextArea } = Input
const ArticleList:FC<AppProps>= props=> {
  return (
    <>
    </>
  )
}
export default ArticleList