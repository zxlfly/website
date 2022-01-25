import styles from './login.css';
import React, { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';

export default function IndexPage() {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const checkLogin = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }
  return (
    <div className={styles.login}>

      <Spin tip="Loading..." spinning={isLoading}>
        <Card 
          title="" 
          bordered={true} 
          style={{ width: 400 }} 
          cover={
            <img
              className={styles.logo}
              alt="logo"
              src={require('../../../public/img/logo-b.png')}
            />
          }
        >
          <Input
            id="userName"
            size="large"
            placeholder="Enter your userName"
            prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setUserName(e.target.value) }}
            style={{marginBottom:'20px',height:'50px'}}
          />
          <Input.Password
            style={{marginBottom:'20px',height:'50px'}}
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setPassword(e.target.value) }}
          />
          <Button style={{height:'50px'}} type="primary" size="large" block onClick={checkLogin} > Login in </Button>
        </Card>
      </Spin>
    </div>
  )
}
