import styles from './login.css';
import { FC, useState } from 'react';
import 'antd/dist/antd.css';
import { Card, Input, Button, Spin, message } from 'antd';
import { KeyOutlined, UserOutlined } from '@ant-design/icons';
import { connect, useDispatch } from 'umi';
import { history } from 'umi';
import { bindActionCreators } from 'redux';
import ConnectState from '@/types/connect';
import { RouteComponentProps } from 'dva/node_modules/@types/react-router-dom';
type toLoginType =  (arg0: { payload: { userName: string; password: string; }; cb: (res: any) => void; }) => void
interface Props extends RouteComponentProps {
  toLogin:toLoginType
}
const IndexPage: FC<Props> = (props) => {
  const [userName, setUserName] = useState('zxlfly')
  const [password, setPassword] = useState('123456')
  const [isLoading, setIsLoading] = useState(false)
  const checkLogin = async () => {
    setIsLoading(true)
    const cb = (res: any) => {
      if (res === true) {
        message.success('欢迎回来');
        history.push('/')
      } else {
        message.error(res);
      }
      setIsLoading(false)
    }
    props.toLogin({ payload: { userName, password }, cb })
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
export default connect(
  (state: ConnectState) => state.User,
  {
    toLogin:(args:any)=>({ type: "User/toLogin",...args})
  }
  // dispatch => {
  //   let creators = {
  //     toLogin:(args: { payload: { userName: string; password: string; }; cb: (res: any) => void; }) => ({ type: "User/toLogin", ...args }),
  //   };
  //   creators = bindActionCreators(creators, dispatch);
  //   return {
  //     dispatch,
  //     ...creators
  //   };
  // }
)(IndexPage)
