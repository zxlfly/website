import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import styles from '../styles/pages/detail.module.css'
import { CalendarOutlined, FolderViewOutlined, FireOutlined, } from '@ant-design/icons';
import { marked } from 'marked'
import hljs from "highlightjs";
import 'highlightjs/styles/monokai_sublime.css';
import classNames from 'classnames/bind';
const Home = () => {
  let markdown = '# P01:课程介绍和环境搭建\n' +
    '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
    '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
    '**这是加粗的文字**\n\n' +
    '*这是倾斜的文字*`\n\n' +
    '***这是斜体加粗的文字***\n\n' +
    '~~这是加删除线的文字~~ \n\n' +
    '\`console.log(111)\` \n\n'
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(markdown)
  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className={classNames('comm-main')} justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className={classNames({ bread_div: styles.bread_div })}>
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className={styles.detailed_title}>
                React实战视频教程-技术胖Blog开发(更新08集)
              </div>

              <div className={styles.center}>
                <span><CalendarOutlined /> 2019-06-28</span>
                <span><FolderViewOutlined /> 视频教程</span>
                <span><FireOutlined /> 5498人</span>
              </div>

              <div
                className={styles.detailed_content}
                dangerouslySetInnerHTML={{ __html: html }}
              >
              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />

        </Col>
      </Row>
      <Footer />

    </>
  )
}

export default Home
