import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, BackTop,ConfigProvider, message } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import zhCN from 'antd/lib/locale/zh_CN';
import axios from 'axios'
import apiPath from '../config/request'
const Layout = (props) => {
  const [info,setInfo] = useState({})
  async function getInfo(){
    const res = await axios.get(apiPath.getInfo)
    if(res.data.code==200){
      setInfo(res.data.data)
    }else{
      message.error('获取网站信息失败')
    }
  }
  useEffect(()=>{
    getInfo()
  },[])
  return (
    <ConfigProvider locale={zhCN}>
      <Head>
        <title>首页 | zxlfly</title>
        <meta name="viewport" content="width=device-width,initial-scale=1.0"></meta>
        <meta name="keywords" content="JavaScript, node,nodejs, react, js, css, html, 前端, web, 前端开发, web开发, vue, flutter, webgl, vr, ar, im, three.js, 源码, 全栈, 全栈开发, mysql, mongo, mongodb, sequelize, HTML5, CSS3, SVG, canvas,算法,3D"></meta>
        <meta name="description" content="zhaoxiaolong | zxlfly 的个人博客_web前端技术文章_"></meta>
        <link rel="icon" href="/favicon.ico" mce_href="/favicon.ico" type="image/x-icon" />
      </Head>
      <Affix offsetTop={0}>
        <Header info={info} />
      </Affix>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          {props.children}
          <BackTop visibilityHeight={10} />
        </Col>

        <Col className="comm-right" xs={24} sm={24} md={7} lg={5} xl={4}>
          <Author info={info} />
          <Nav />
        </Col>
      </Row>
      <Footer />
    </ConfigProvider>
  )
}

export default Layout
