import { Layout, Menu, Breadcrumb, Modal, ConfigProvider, BackTop } from 'antd';
import {
  ReadOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import { FC, useEffect, useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import styles from './index.css'
import { UserModelState, connect, ConnectProps, useSelector } from 'umi';
// import ConnectState from '@/types/connect';
import zhCN from 'antd/lib/locale/zh_CN';
interface AppProps extends ConnectProps {
  User: UserModelState;
}
const IndexPage: FC<AppProps> = props => {
  const userinfo = useSelector(({ User }: { User: UserModelState }) => ({ User }))
  const [refkey,setRefkey] = useState(props.location.pathname)
  function getkey (){
    // console.log(props.location.pathname=='/');
    
    if (props.location.pathname.startsWith('/handleCategory')) {
      setRefkey('/categoryList') 
    }else if(props.location.pathname=='/'){
      setRefkey('/') 
    }
  }
  useEffect(() => {
    getkey()
    // console.log('userinfo',props.location.pathname);
  }, [props.location.pathname])
  const [collapsed, setCollapse] = useState(false)
  function itemClick(e: any) {
    props.history.push(e.key)
  }
  function loginOut() {
    props.dispatch?.({ type: 'User/toLoginOut' })
    props.history.push('/login')
  }
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    loginOut()
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={setCollapse}>
          <img className={styles.logo} src={require("../../public/img/logoko-w.png")} alt="" />
          <Menu onSelect={itemClick} theme="dark" defaultSelectedKeys={[refkey]} mode="inline">
            <Menu.Item title='添加文章' key="/" icon={<ReadOutlined />}>
              添加文章
            </Menu.Item>
            <Menu.Item title='文章列表' key="/articleList" icon={<PartitionOutlined />}>
              文章列表
            </Menu.Item>
            <Menu.Item title='分类列表' key="/categoryList" icon={<PartitionOutlined />}>
              分类列表
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ color: '#fff' }}>
            <div className={styles.header}>
              <div className={styles.loginbtn} onClick={showModal}>退出登录</div>
              <div className={styles.username}>欢迎回来：{props.User.name}</div>
              <Modal title="警告" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>确定退出登录？</p>
              </Modal>
            </div>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 0, minHeight: 360 }}>
              {props.children}
              <BackTop visibilityHeight={10} />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
export default connect(
  ({ User }: { User: UserModelState }) => ({ User })
)(IndexPage);