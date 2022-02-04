import React from 'react'
import styles from '../styles/components/author.module.css'
import { QqOutlined,MailOutlined, GithubOutlined, WechatOutlined, AliwangwangOutlined,ZhihuOutlined } from '@ant-design/icons';
import JuejinLogo from './JuejinLogo';
import { Avatar, Divider } from 'antd'
const Author = () => (
  <div className={styles.author}>
    <div> <Avatar size={100} src="https://avatars.githubusercontent.com/u/26324442?v=4" /></div>
    <div className={styles.introduction}>
      开心每一天！<AliwangwangOutlined />
      <Divider>社交账号</Divider>
      <div className={styles.iconbox}>
        <JuejinLogo style={{color:'#262626',cursor: 'pointer', width: '1.2rem',height:'1.2rem' }} />
        <ZhihuOutlined style={{color:'#262626',cursor: 'pointer', fontSize: '1.2rem' }} />
        <GithubOutlined style={{color:'#262626',cursor: 'pointer', fontSize: '1.2rem' }} />
        <WechatOutlined style={{color:'#262626',cursor: 'pointer', fontSize: '1.2rem' }} />
        <QqOutlined style={{color:'#262626',cursor: 'pointer', fontSize: '1.2rem' }} />
        <MailOutlined style={{color:'#262626',cursor: 'pointer', fontSize: '1.2rem' }}  />
      </div>
    </div>
  </div>
)
export default Author