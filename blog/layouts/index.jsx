import React from 'react'
import Head from 'next/head'
import { Row, Col, Affix, BackTop,ConfigProvider } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
import zhCN from 'antd/lib/locale/zh_CN';
const Layout = (props) => {
  return (
    <ConfigProvider locale={zhCN}>
      <Head>
        <title>首页 | zxlfly</title>
        <meta name="description" content=""></meta>
        <link rel="icon" href="../public/favicon.ico" mce_href="../public/favicon.ico" type="image/x-icon" />
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          {props.children}
          <BackTop visibilityHeight={10} />
        </Col>

        <Col className="comm-right" xs={24} sm={24} md={7} lg={5} xl={4}>
          <Author />
          <Nav />
        </Col>
      </Row>
      <Footer />
    </ConfigProvider>
  )
}

export default Layout
