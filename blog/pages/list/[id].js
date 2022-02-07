import React, {  useEffect, useState } from 'react'
import Head from 'next/head'
import { List, Pagination, Affix, Skeleton, message } from 'antd'
import styles from '../../styles/pages/index.module.css'
import apiPath from '../../config/request'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  CalendarOutlined,
} from '@ant-design/icons';
const Home = (props) => {
  // console.log('props',props);
  const [isLoading,setIsLoading] = useState(false)
  const router= useRouter()
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(props.data.count)
  const [list, setList] = useState(props.data.list)
  function onChange(pageNumber, pageSize) {
    if (pageSize !== size) {
      setSize(pageSize)
    }
    if (pageNumber != page) {
      setPage(pageNumber)
    }
    console.log(pageNumber, pageSize);
    getList(pageNumber,pageSize)
  }
  const getList = async(page,size)=>{
    setIsLoading(true)
    let res = await axios.post(apiPath.getList, {
      page,
      size,
      id:router.query.id
    })
    let data = res.data  
    // console.log(data);  
    setIsLoading(false)
    if(data.code==200){
      setList(data.data.list)
    }else{
      message.error('加载失败')
    }
  }
  const toDetail = (id) => {
    console.log(id);
    router.push('/detail/'+id)
  }
  useEffect(()=>{
    console.log('bianle',props.stack,router.query.id);
    if(props.stack!==router.query.id){
      setPage(1)
      getList(1,size)
    }
  },[router.query.id])
  return (
    <>
      <List
        header={<div>文章列表</div>}
        itemLayout="vertical"
        dataSource={list}
        renderItem={item => (

          <Skeleton loading={isLoading} active>
            <List.Item
              key={item.id}
              onClick={() => toDetail(item.id)}
            >
              <div className={styles.title}>{item.title}</div>
              <div className={styles.icon}>
                <span><CalendarOutlined /> {item.created_at}</span>
              </div>
              <div className={styles.context}>{item.introduction}</div>
            </List.Item>
          </Skeleton>
        )}
      />
      <Affix offsetBottom={0}>
        <div className={styles.pagination}>
          <Pagination
            showQuickJumper
            defaultCurrent={1}
            showSizeChanger
            total={total}
            pageSize={size}
            current={page}
            onChange={onChange} />
          <br />
        </div>
      </Affix>
    </>
  )
}

Home.getInitialProps = async function (context) {
  let res = await axios.post(apiPath.getList, {
    page: 1,
    size: 20,
    id:context.query.id
  })
  console.log(res.data.code);
  res.data.stack=context.query.id
  return res.data
}
export default Home
