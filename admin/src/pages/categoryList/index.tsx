import styles from './index.css';
import { List, Avatar, Button, Skeleton, Row } from 'antd';
import { useEffect, useState } from 'react';
import {
  ReadOutlined,
  PartitionOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import Header from './components/Header';
export default function IndexPage() {

  const [initLoading, setInitLoading] = useState(false)
  const [list, setList] = useState([
    {
      id:'1',
      name:'name',
      des:'des',
      lv:1
    },{
      id:'2',
      name:'name2',
      des:'des2',
      lv:2
    },{
      id:'3',
      name:'name3',
      des:'des3',
      lv:3
    }
  ])
  useEffect(() => {
    
  }, [])
  function handleBtn(type:string){
    console.log(type);
    
  }
  return (
    <>
      <Row align='middle' justify='space-between' className={styles.header}>
        <div>
          分类列表
        </div>
        <Button type='primary' size='large'>
          添加顶级分类
        </Button>
      </Row>
      <List
        className={styles.list}
        itemLayout="horizontal"
        dataSource={list}
        bordered={true}
        size={'large'}
        renderItem={item => (
          <List.Item
            actions={[
              <Button onClick={()=>handleBtn('del')} type={'link'} danger key="list-loadmore-del">删除</Button>,
              <Button onClick={()=>handleBtn('edit')} type={'link'} key="list-loadmore-edit">编辑</Button>,
              <Button onClick={()=>handleBtn('add')} type={'link'} key="list-loadmore-add">添加次级分类</Button>,
            ]}
          >
            <Skeleton avatar loading={initLoading} title={false} active>
              <List.Item.Meta
                avatar={
                  <Header name={item.name} lv={item.lv}>
                    
                  </Header>
                }
                title={<div>{item.name}</div>}
                description={item.des}
              />
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}


