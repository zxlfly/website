import React from 'react'
import { Breadcrumb, Empty } from 'antd'
import styles from '../../styles/pages/detail.module.css'
import { CalendarOutlined } from '@ant-design/icons';
import { marked } from 'marked'
import hljs from "highlightjs";
import { useRouter } from 'next/router'
import apiPath from '../../config/request'
import axios from 'axios'
// 样式已在全局引入
const Home = (props) => {
  const router = useRouter()
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
  console.log('props',props);

  return props.code!=null&&props.code==200?(
    <>
      <div className={styles.bread_div}>
        <Breadcrumb>
          <Breadcrumb.Item><a onClick={() => router.back()}>返回文章列表</a></Breadcrumb.Item>
        </Breadcrumb>
      </div>

      <div>
        <div className={styles.detailed_title}>
          {props.data.title}
        </div>

        <div className={styles.center}>
          <span><CalendarOutlined /> {props.data.created_at}</span>
        </div>
        <div className={styles.center}>
          <span>{props.data.introduction}</span>
        </div>

        <div
          className={styles.detailed_content}
          dangerouslySetInnerHTML={{ __html: marked.parse(props.data.content) }}
        >
        </div>

      </div>

    </>
  ):(
    <Empty description={false} />
  )
}
Home.getInitialProps = async function (context) {
  let res = await axios.post(apiPath.getDetail, {
    id:context.query.id
  })
  return res.data
}
export default Home
