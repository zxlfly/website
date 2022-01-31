import { FC, useEffect, useState } from 'react';
import styles from './index.css'
import { Row, Col, Input, Select, Button, DatePicker, ConfigProvider, Breadcrumb, Spin, message } from 'antd'
import { connect, ConnectProps, useParams, UserModelState } from 'umi';
import category from '@/service/category';
interface AppProps extends ConnectProps {
  User: UserModelState;
}
const { Option } = Select;
const { TextArea } = Input
interface paramsType {
  data: string
}
const AddCategory: FC<AppProps> = props => {
  const params: paramsType = useParams();
  const data = JSON.parse(params.data)
  const [locastr, setLocastr] = useState('')
  const [name, setName] = useState('')
  const [des, setDes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  function getType(params: paramsType) {
    let tips = ''
    if (data.type == 'add') {
      tips = '添加'
    } else if (data.type == 'edit') {
      tips = '编辑'
    }
    if (data.id ?? false) {
      tips += '次级分类'
    } else {
      tips += '顶级分类'
    }
    if (data.name ?? false) {
      setName(data.name)
    }
    setDes(data.des)
    setLocastr(tips)
  }
  async function submit() {
    if (data.type == 'add') {
      add()
    } else if (data.type == 'edit') {
      deit()
    }

  }
  async function deit() {
    setIsLoading(true)
    const res = await category.editCategory(name, data.id,des)
    console.log('res:', res);
    setIsLoading(false)
    if (res.code === 200) {
      message.success('编辑成功');
      props.history.goBack()
    } else {
      message.error(res.message)
    }
  }
  async function add() {
    setIsLoading(true)
    const res = await category.addCategory(name, data.id,des)
    console.log('res:', res);
    setIsLoading(false)
    if (res.code === 200) {
      message.success('添加成功');
      props.history.goBack()
    } else {
      message.error(res.message)
    }
  }
  useEffect(() => {
    getType(params)
  }, [])
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Row align='middle' justify='space-between' className={styles.header}>
        <Breadcrumb>
          <Breadcrumb.Item onClick={() => { props.history.goBack() }}>
            <a>分类列表</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            {locastr}
          </Breadcrumb.Item>
        </Breadcrumb>
      </Row>
      <Row>
      <Input
          style={{ height: '40px', marginTop: '30px' }}
          placeholder='请输入分类名'
          value={name}
          onChange={(e) => setName(e.target.value.trim())}
        />
        <Input
          style={{ height: '40px', marginTop: '30px' }}
          placeholder='请输入分类描述'
          value={des}
          onChange={(e) => setDes(e.target.value.trim())}
        />
      </Row>
      <Row>
        <Button onClick={submit} style={{ width: '100%', height: '40px', marginTop: '30px' }} type={'primary'}>确认添加</Button>
      </Row>
    </Spin>
  )
}
export default AddCategory