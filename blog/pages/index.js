import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { List, Pagination, Affix, Skeleton, message } from 'antd'
import styles from '../styles/pages/index.module.css'
import apiPath from '../config/request'
import axios from 'axios'
import { useRouter } from 'next/router'
import {
  CalendarOutlined,
} from '@ant-design/icons';
const Home = (props) => {
  const [isLoading,setIsLoading] = useState(false)
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(props.data.count)
  const [list, setList] = useState(props.data.list)
  const router = useRouter()
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
    const promise = new Promise((resolve,reject) => {
      axios.post(apiPath.getIndex, {
        page,
        size
      }).then(
        (res) => {
          resolve(res.data)
        }
      ).catch(e=>{
        console.log(e);
        setIsLoading(false)
        // reject({code:-1,list:[],message:'获取文章列表失败'})
      })
    })
    let res =  await promise
    setIsLoading(false)
    if(res.code==200){
      setList(res.data.list)
    }else{
      message.error('加载失败')
    }
  }
  const toDetail = (id) => {
    console.log(id);
    router.push('/detail/'+id)
  }
  return (
    <>
      <List
        header={<div>最新日志</div>}
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

Home.getInitialProps = async function () {
  let res = await axios.post(apiPath.getIndex, {
    page: 1,
    size: 20
  })
  return res.data
}
export default Home
