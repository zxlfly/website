import React from 'react'
import styles from '../styles/components/author.module.css'
import { QqOutlined, GithubOutlined, WechatOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { Avatar, Divider } from 'antd'
const Author = () => (
  <div className={styles.author}>
    <div> <Avatar size={100} src="https://avatars.githubusercontent.com/u/26324442?v=4" /></div>
    <div className={styles.introduction}>
      开心每一天！<AliwangwangOutlined />
      <Divider>社交账号</Divider>
      <div className={styles.iconbox}>
        <GithubOutlined style={{ fontSize: '1.6rem' }} />
        <QqOutlined style={{ fontSize: '1.6rem' }} />
        <WechatOutlined style={{ fontSize: '1.6rem' }} />
        <Avatar title="666" size={28} icon={<WechatOutlined style={{ fontSize: '1rem' }} />} />
      </div>
    </div>
  </div>
)
export default Author