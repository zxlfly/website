import React from 'react'
import styles from '../styles/components/header.module.css'
import { Row, Col, Menu } from 'antd'
import JuejinLogo from './JuejinLogo';
import { HomeOutlined,MailOutlined, WifiOutlined,GithubOutlined,WechatOutlined,QqOutlined,ZhihuOutlined } from '@ant-design/icons';
const Header = () => (
  <div className={styles.header}>
    <Row justify="center">
      <Col xs={20} sm={12}>
        <span className={styles.headerLogo}>zxlfly</span>
        <span className={styles.headerTxt}>赵晓龙的博客</span>
      </Col>
      
      <Col className={styles.memuDiv} xs={4} sm={6}>
        <Menu selectable={false} mode="horizontal">
          <Menu.Item key="index" icon={<HomeOutlined />}>
            首页
          </Menu.Item>
          <Menu.Item key="app" icon={<GithubOutlined />}>
            GitHub
          </Menu.Item>
          <Menu.Item key="juejn" icon={<WifiOutlined />}>
            掘金
          </Menu.Item>
          <Menu.Item key="weixin" icon={<WechatOutlined />}>
            微信
          </Menu.Item>
          <Menu.Item key="qq" icon={<QqOutlined />}>
            QQ
          </Menu.Item>
          <Menu.Item key="email" icon={<MailOutlined />}>
            邮箱
          </Menu.Item>
          <Menu.Item key="zhihu" icon={<ZhihuOutlined />}>
            知乎
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)
export default Header