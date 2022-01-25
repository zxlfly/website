import { Layout, Menu, Breadcrumb } from 'antd';
import {
  ReadOutlined,
  PartitionOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { useState } from 'react';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
import styles from './index.css'
export default function IndexPage(props: any) {
  const [collapsed, setCollapse] = useState(false)
  function itemClick(e:any){
    console.log(e);
    props.history.push(e.key)
  }
  function loginOut(){
    props.history.push('/login')
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapse}>
        <img className={styles.logo} src={require("../../public/img/logoko-w.png")} alt="" />
        <Menu onSelect={itemClick} theme="dark" defaultSelectedKeys={['/addArticle']} mode="inline">
          <Menu.Item title='添加文章' key="/addArticle" icon={<ReadOutlined />}>
            添加文章
          </Menu.Item>
          <Menu.Item title='分类列表' key="/categoryList" icon={<PartitionOutlined />}>
            分类列表
          </Menu.Item>
          <Menu.Item title='留言操作' key="/login" icon={<ToolOutlined />}>
            留言操作
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
            <div className={styles.loginbtn} onClick={loginOut}>登录退出登录</div>
            <div className={styles.username}>欢迎回来：zxlfly</div>
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