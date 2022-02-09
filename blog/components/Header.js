import React, { useEffect, useState } from 'react'
import styles from '../styles/components/header.module.css'
import { Row, Col, Menu,notification } from 'antd'
import { HomeOutlined, MailOutlined, PlayCircleOutlined, WifiOutlined, GithubOutlined, WechatOutlined, QqOutlined, ZhihuOutlined } from '@ant-design/icons';
import Image from 'next/image';
import logo from '../public/logoko-b.png';
import { useRouter } from 'next/router'
const Header = (props) => {
  const router = useRouter()
  const [menu, setMenu] = useState([<Menu.Item key="index" icon={<HomeOutlined />}>
    首页
  </Menu.Item>])
  const [info,setInfo] = useState({})
  function menuClick(e) {
    if (e.key == 'index') {
      router.push('/')
    }else{
      if(info[e.key].jumpPages){
        window.open(info[e.key].val); 
      }else{
        notification.open({
          message: info[e.key].name,
          description:info[e.key].val
        });
      }
    }
  }
  function getItem(key,res,list,info){
    info[key]=res
    if(key==='bilibili'){
      list.push(<Menu.Item key={key} icon={<PlayCircleOutlined />}>
      B站
    </Menu.Item>)
    }else if(key === 'github'){
      list.push(<Menu.Item key={key} icon={<GithubOutlined />}>
      GitHub
    </Menu.Item>)
    }else if(key === 'zhihu'){
      list.push(<Menu.Item key={key} icon={<ZhihuOutlined />}>
      知乎
    </Menu.Item>)
    }else if(key === 'juejin'){
      list.push(<Menu.Item key={key} icon={<WifiOutlined />}>
      掘金
    </Menu.Item>)
    }else if(key === 'weixin'){
      list.push(<Menu.Item key={key} icon={<WechatOutlined />}>
      微信
    </Menu.Item>)
    }else if(key === 'qq'){
      list.push(<Menu.Item key={key} icon={<QqOutlined />}>
      QQ
    </Menu.Item>)
    }else if(key === 'email'){
      list.push(<Menu.Item key={key} icon={<MailOutlined />}>
      邮箱
    </Menu.Item>)
    }
  }
  function getMenu() {
    let list = [<Menu.Item key="index" icon={<HomeOutlined />}>
    首页
  </Menu.Item>]
    let data = props.info
    let info = {}
    let keys = ['bilibili','github','weixin','qq','zhihu','bilibili','email']
    keys.forEach((x)=>{
      if(data[x]){
        let res = JSON.parse(data[x])
        if(res.show){
          getItem(x,res,list ,info)
        }
      }
    })
    setMenu([...list])
    setInfo(info)
  }
  useEffect(() => {
    getMenu()
  }, [props.info])
  return (
    <div className={styles.header}>
      <Row justify="center" align='middle'>
        <Col xs={20} sm={12}>
          <Image onClick={()=>router.push('/')} height={'80px'} width={'212px'} src={logo}></Image>
        </Col>

        <Col xs={4} sm={6}>
          <Menu onClick={menuClick} selectable={false} mode="horizontal">
            {
              menu
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
export default Header