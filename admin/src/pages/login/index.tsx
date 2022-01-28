import styles from './login.css';
import  { useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, notification, Alert } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'umi';
import { history } from 'umi';
export default function IndexPage() {
  const [userName, setUserName] = useState('zxlfly')
  const [password, setPassword] = useState('123456')
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  const checkLogin = async() => {
    setIsLoading(true)
    const cb = (res:any)=>{
      if(res===true){
        notification.open({
          message: '登录成功',
          description:<Alert style={{fontSize:'1rem'}} message="欢迎回来" type="success" />,
        });
        history.push('/')
      }else{
        notification.open({
          message: '登录失败',
          description:<Alert style={{fontSize:'1rem'}} message={res} type="error" />,
        });
      }
      setIsLoading(false)
    }
    dispatch({type:'User/toLogin',payload:{userName,password},cb})
    
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
            style={{ marginBottom: '20px', height: '50px' }}
            value={userName}
          />
          <Input.Password
            style={{ marginBottom: '20px', height: '50px' }}
            id="password"
            size="large"
            placeholder="Enter your password"
            prefix={<KeyOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
            onChange={(e) => { setPassword(e.target.value) }}
            value={password}
          />
          <Button style={{ height: '50px' }} type="primary" size="large" block onClick={checkLogin} > Login in </Button>
        </Card>
      </Spin>
    </div>
  )
}
