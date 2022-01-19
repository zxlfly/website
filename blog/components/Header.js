import React from 'react'
import styles from '../styles/components/header.module.css'
import { Row, Col, Menu } from 'antd'
import { HomeOutlined, GithubOutlined } from '@ant-design/icons';
const Header = () => (
  <div className={styles.header}>
    <Row justify="center">
      <Col xs={20} sm={12}>
        <span className={styles.headerLogo}>zxlfly</span>
        <span className={styles.headerTxt}>赵晓龙的博客</span>
      </Col>

      <Col className={styles.memuDiv} xs={4} sm={6}>
        <Menu selectable={false} mode="horizontal">
          <Menu.Item key="mail" icon={<HomeOutlined />}>
            首页
          </Menu.Item>
          <Menu.Item key="app" icon={<GithubOutlined />}>
            GitHub
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  </div>
)
export default Header