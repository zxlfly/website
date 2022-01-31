import styles from './index.css';
import { List, Avatar, Button, Skeleton, Row, message, Spin, Modal } from 'antd';
import { FC, useEffect, useState } from 'react';
import {
  ReadOutlined,
  PartitionOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import Header from './components/Header';
import category from '@/service/category';
import { ConnectProps } from 'umi';
import login from '@/service/user';
import { CategoryList } from '@/types';

interface AppProps extends ConnectProps{

}
interface handleProps {
  type:"edit"|"add",
  des?:string,
  id?:string | number,
  name?:string
}
const IndexPage:FC<AppProps>=props=>{

  const [initLoading, setInitLoading] = useState(false)
  const [list, setList] = useState<CategoryList[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [chooseItem,setChooseitem]=useState({id:-1,name:''})
  const handleOk =async () => {
    setIsModalVisible(false);
    setInitLoading(true)
    let res = await category.delCategory(chooseItem.id)
    console.log('res:',res);
    setInitLoading(false)
    if(res.code===200){
      message.success('已删除：'+chooseItem.name)
      getList()
    }else{
      message.error(res.message)
      if(res.code==-2){
        getList()
      }
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  async function getList() {
    function getChildren(root:CategoryList,arr:CategoryList[],dep:number) {
      if(!root.child.length){
        return
      }
      root.child.forEach((item:CategoryList)=>{
        item.lv=dep
        arr.push(item)
        getChildren(item,arr,dep+1)
      })
    }
    setInitLoading(true)
    let res = await category.getCategoryList()
    if(res.code===200){
      let arr: CategoryList[] = []
      res.data.list.forEach((item:CategoryList)=>{
        item.lv=1
        arr.push(item)
        getChildren(item,arr,2)
      })
      setList(arr)
      console.log('list:',arr);
    }else{
      message.error(res.message)
    }
    setInitLoading(false)
  }
  useEffect(() => {
    getList()
  }, [])
  function handleDel(id:number,name:string){
    console.log(id);
    setIsModalVisible(true);
    setChooseitem({id,name})
  }
  function handleCategory(args:handleProps) {
    console.log('args',args);
    props.history.push('/handleCategory/'+JSON.stringify(args))
  }
  return (
    <Spin tip="Loading..." spinning={initLoading}>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>{chooseItem.name}</p>
      </Modal>
      <Row align='middle' justify='space-between' className={styles.header}>
        <div>
          分类列表
        </div>
        <Button onClick={()=>handleCategory({type:'add'})} type='primary' size='large'>
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
              <Button onClick={()=>handleDel(item.id,item.name)} type={'link'} danger key="list-loadmore-del">删除</Button>,
              <Button onClick={()=>handleCategory({type:'edit',id:item.id,name:item.name,des:item.des})} type={'link'} key="list-loadmore-edit">编辑</Button>,
              <Button onClick={()=>handleCategory({type:'add',id:item.id})} type={'link'} key="list-loadmore-add">添加次级分类</Button>,
            ]}
          >
              <List.Item.Meta
                avatar={
                  <Header name={item.name} lv={item.lv}>
                    
                  </Header>
                }
                title={<div>{item.name}</div>}
                description={item.des}
              />
          </List.Item>
        )}
      />
    </Spin>
  );
}

export default IndexPage
