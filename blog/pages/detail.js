import React, { useState } from 'react'
import { Breadcrumb } from 'antd'
import styles from '../styles/pages/detail.module.css'
import { CalendarOutlined, FolderViewOutlined, FireOutlined, } from '@ant-design/icons';
import {marked} from 'marked'
import hljs from "highlightjs";
// 样式已在全局引入
const Home = () => {
  let markdown = `
  \`\`\`
  var a = 111;
  const b = 22;
  let v = 2;
  \`\`\`
  `
  const renderer = new marked.Renderer();

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });
  return (
    <>
      <div>
        <div className={styles.bread_div}>
          <Breadcrumb>
            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
            <Breadcrumb.Item>文章列表</Breadcrumb.Item>
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
            dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
          >
          </div>

        </div>

      </div>

    </>
  )
}

export default Home
