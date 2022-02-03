import { FC, useEffect, useState } from 'react';
import styles from './index.css'
import { Row, Col, Input, Select, Button, DatePicker, ConfigProvider, message, Spin, Affix, List, Avatar, Modal } from 'antd'
import { history, ConnectProps, UserModelState } from 'umi';
import article from '@/service/article';
import { ArticleInfo } from '@/types';
import { Pagination } from 'antd';
import moment, { Moment } from 'moment';
import CategorySelect from '@/components/categorySelect'
interface AppProps extends ConnectProps {
  User: UserModelState;
}
const { Option } = Select;
const { TextArea } = Input
const { RangePicker } = DatePicker;
const ArticleList: FC<AppProps> = props => {
  const [list, setList] = useState<Array<ArticleInfo>>([])
  const [selectedType, setSelectType] = useState<number>(-1) //选择的文章类别
  const [isLoading, setIsLoading] = useState(false)
  const [size, setSize] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(1)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keywords,setKeywords] = useState('')
  const [chooseItem, setChooseitem] = useState<ArticleInfo>({
    id: -1,
    pid: -1,
    title: '',
    introduction: '',
    content: ''
  })
  const handleOk = async () => {
    setIsModalVisible(false);
    setIsLoading(true)
    let res = await article.delArticle(chooseItem.id)
    console.log('res:', res);
    setIsLoading(false)
    if (res.code === 200) {
      message.success('已删除：' + chooseItem.title)
      getList(page, size)
    } else {
      message.error(res.message)
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const getList = async (page: number, size: number) => {
    setIsLoading(true)
    let res = await article.getArticleList(page, size)
    // console.log('res:',res);
    setIsLoading(false)
    if (res.code === 200) {
      setList(res.data.list)
      setTotal(res.data.count)
    } else {
      message.error(res.message)
    }
  }
  function onChange(pageNumber: number, pageSize: number) {
    if (pageSize !== size) {
      setSize(pageSize)
    }
    console.log(Math.ceil(total / pageSize), pageNumber);
    // if(Math.ceil(total/pageSize)<pageNumber)return
    setPage(pageNumber)
    getList(pageNumber, pageSize)
  }
  const handleDel = (item: ArticleInfo) => {
    setChooseitem(item)
    setIsModalVisible(true);
  }
  const editArticle = (id: number) => {
    history.push({
      pathname: '/handleArticle/' + id,
    });
  }

  // antd ts支持bug 官方demo报错 暂时使用any
  function selectDate(values: any, formatString: [string, string]) {
    console.log(typeof values, values);
    console.log(formatString);

  }
  async function search(){
    console.log('search');
    
  }
  function selectType(e: number) {
    console.log(e);
    setSelectType(e)
  }
  useEffect(() => {
    getList(page, size)
  }, [])
  return (
    <>
      <Spin tip="Loading..." spinning={isLoading}>
        <Modal title="警告" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>{chooseItem.title}</p>
        </Modal>
        <div className={styles.Row}>
          <Input onChange={(e)=>setKeywords(e.target.value.trim())} value={keywords} className={styles.keyinp} placeholder='关键词搜索'></Input>
          <div className={styles.select}>
            <CategorySelect 
              selectedType={selectedType}
              selectType={selectType}
            />
          </div>
        
          <RangePicker
            className={styles.range}
            ranges={{
              Today: [moment(), moment()],
              'This Month': [moment().startOf('month'), moment().endOf('month')],
            }}
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            onChange={selectDate}
          />
          <Button onClick={search} className={styles.submit} type={'primary'}>搜索</Button>

        </div>
        <List
          className={styles.list}
          itemLayout="horizontal"
          dataSource={list}
          bordered={true}
          size={'large'}
          renderItem={item => (
            <List.Item
              actions={[
                <Button onClick={() => handleDel(item)} type={'link'} danger key="list-loadmore-del">删除</Button>,
                <Button onClick={() => editArticle(item.id)} type={'link'} key="list-loadmore-edit">编辑</Button>,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar style={{ backgroundColor: '#87d068' }} size={40} >{item.title[0]}</Avatar>
                }
                title={<div>{item.title}</div>}
                description={item.introduction}
              />

            </List.Item>
          )}
        />
        <Affix offsetBottom={0}>
          <div className={styles.pagination}>
            <Pagination
              showQuickJumper
              defaultCurrent={1}
              showSizeChanger
              total={total}
              pageSize={size}
              current={page}
              onChange={onChange} />
            <br />
          </div>
        </Affix>
      </Spin></>
  )
}
export default ArticleList