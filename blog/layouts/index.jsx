import React from 'react'
import Head from 'next/head'
import { Row, Col, Affix ,BackTop} from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import Nav from '../components/Nav'
const Layout = (props) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Affix offsetTop={0}>
        <Header />
      </Affix>
      <Row className="comm-main" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          {props.children}
          <BackTop visibilityHeight={10} />
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Nav />
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export default Layout
