import { Layout, Menu, Breadcrumb, Modal } from 'antd';
import {
  ReadOutlined,
  PartitionOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import styles from './index.css'
import { useDispatch, useSelector } from 'umi';
import { ModelsState } from '@/types';
export default function IndexPage(props: any) {
  const dispatch = useDispatch()
  const userinfo = useSelector((state:ModelsState) => state.User)
  
  const [collapsed, setCollapse] = useState(false)
  function itemClick(e:any){
    props.history.push(e.key)
  }
  function loginOut(){
    dispatch({type:'User/toLoginOut'})
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
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapse}>
        <img className={styles.logo} src={require("../../public/img/logoko-w.png")} alt="" />
        <Menu onSelect={itemClick} theme="dark" defaultSelectedKeys={['/addArticle']} mode="inline">
          <Menu.Item title='添加文章' key="/" icon={<ReadOutlined />}>
            添加文章
          </Menu.Item>
          <Menu.Item title='文章列表' key="/articleList" icon={<PartitionOutlined />}>
            文章列表
          </Menu.Item>
          <Menu.Item title='分类列表' key="/categoryList" icon={<PartitionOutlined />}>
            分类列表
          </Menu.Item>
          {/* <SubMenu key="sub1" icon={<UserOutlined />} title="User">
            <Menu.Item key="3">Tom</Menu.Item>
            <Menu.Item key="4">Bill</Menu.Item>
            <Menu.Item key="5">Alex</Menu.Item>
          </SubMenu> */}
          
          
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header style={{color:'#fff'}}>
          <div className={styles.header}>
            <div className={styles.loginbtn} onClick={showModal}>退出登录</div>
            <div className={styles.username}>欢迎回来：{userinfo.name}</div>
            <Modal title="警告" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
              <p>确定退出登录？</p>
            </Modal>
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {/* <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div className="site-layout-background" style={{ padding: 0, minHeight: 360 }}>
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
}