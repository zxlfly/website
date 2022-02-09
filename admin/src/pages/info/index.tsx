import styles from './index.css';
import { Button, Row, message, Spin, Typography, Col, Input, Switch, Upload } from 'antd';
import { FC, useEffect, useState } from 'react';
import info from '@/service/info';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import isImage from '@/utils/isImage';
import { apiurl,imgurl, TOKEN_KEY } from '@/api/request';
import { UpImgRes } from '@/types';
const { Title } = Typography;
const { TextArea } = Input;
const IndexPage: FC = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [upLoading, setUpLoading] = useState(false)
  const [avatar, setAvatar] = useState('')
  const [header,setHeader] = useState({authorization:'Bearer'})
  useEffect(()=>{
   let token = window.localStorage.getItem(TOKEN_KEY)
    setHeader({
      authorization: 'Bearer '+token
    })
  },[])
  const [weixin, setWeixin] = useState({
    show: false,
    val: '',
    jumpPages: false,
    name: '微信'
  })
  const [qq, setQq] = useState({
    show: false,
    val: '',
    jumpPages: false,
    name: 'QQ'
  })
  const [github, setGithub] = useState({
    show: false,
    val: '',
    jumpPages: false,
    name: 'Github'
  })
  const [juejin, setJuejin] = useState({
    show: false,
    val: '',
    jumpPages: false,
    name: '掘金'
  })
  const [bilibili, setBilibili] = useState({
    show: false,
    val: '',
    jumpPages: false,
    name: 'B站'
  })
  const [zhihu, setZhihu] = useState({
    show: false,
    val: '',
    jumpPages: false,
    name: '知乎'
  })
  const [email, setEmail] = useState({
    show: false,
    val: '',
    jumpPages: false,
    name: '邮箱'
  })
  const [des, setDes] = useState('')

  async function submit() {
    setIsLoading(true)
    const res = await info.upInfo(
      JSON.stringify(weixin),
      JSON.stringify(qq),
      JSON.stringify(zhihu),
      JSON.stringify(juejin),
      JSON.stringify(bilibili),
      JSON.stringify(github),
      des,
      JSON.stringify(email),
      avatar
    )
    setIsLoading(false)
    if (res.code == 200) {
      message.success('修改成功')
    } else {
      message.error(res.message)
    }
  }
  async function getInfo() {
    setIsLoading(true)
    const res = await info.getWebInfo()
    setIsLoading(false)
    if (res.code == 200) {
      let data = res.data
      if (data.bilibili) {
        let obj = JSON.parse(data.bilibili)
        setBilibili({ ...obj })
      }
      if (data.weixin) {
        let obj = JSON.parse(data.weixin)
        setWeixin({ ...obj })
      }
      if (data.qq) {
        let obj = JSON.parse(data.qq)
        setQq({ ...obj })
      }
      if (data.juejin) {
        let obj = JSON.parse(data.juejin)
        setJuejin({ ...obj })
      }
      if (data.zhihu) {
        let obj = JSON.parse(data.zhihu)
        setZhihu({ ...obj })
      }
      if (data.github) {
        let obj = JSON.parse(data.github)
        setGithub({ ...obj })
      }
      if (data.des) {
        setDes(data.des)
      }
      if (data.email) {
        let obj = JSON.parse(data.email)
        setEmail({ ...obj })
      }
      if (data.avatar) {
        setAvatar(data.avatar)
      }
    } else {
      message.error('获取信息失败')
    }
  }
  async function beforeUpload(file:File) {
    let res = await isImage(file)
    if(!res){
      message.error('图片格式不合法，修改后缀名也不行！')
    }
    const size = file.size / 1024 / 1024 < 3
    if( !size ){
      message.error('图片大小不能超过3兆') 
    }
    return res&&size
  }
  function handleChange(info: { file: { status: string; response: UpImgRes; originFileObj: any; }; }) {
    if (info.file.status === 'uploading') {
      setUpLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      setUpLoading(false)
      let res = info.file.response
      if(res.code==200){
        setAvatar(res.data.url)
        message.success('上传成功')
      }else{
        message.error(res.message)
      }
      
    }
  }
  useEffect(() => {
    getInfo()
  }, [])
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Row align='middle' justify='space-between' className={styles.header}>
        <div>
          网站信息
        </div>
        <Button onClick={submit} type='primary' size='large'>
          保存
        </Button>
      </Row>
      <Row>
        <Col className={styles.col} md={24} lg={12} xxl={8}>
          <Title level={5}>微信：</Title>
          <Input value={weixin.val} onChange={(e) => setWeixin({ ...weixin, val: e.target.value.trim() })} placeholder='微信' allowClear />
          <Switch checked={weixin.show} onChange={(e) => setWeixin({ ...weixin, show: e })} className={styles.switch} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
          <Switch checked={weixin.jumpPages} onChange={(e) => setWeixin({ ...weixin, jumpPages: e })} className={styles.switch} checkedChildren="网页" unCheckedChildren="弹框" defaultChecked />
        </Col>
        <Col className={styles.col} md={24} lg={12} xxl={8}>
          <Title level={5}>QQ：</Title>
          <Input value={qq.val} onChange={(e) => setQq({ ...qq, val: e.target.value.trim() })} placeholder='QQ' allowClear />
          <Switch checked={qq.show} onChange={(e) => setQq({ ...qq, show: e })} className={styles.switch} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
          <Switch checked={qq.jumpPages} onChange={(e) => setQq({ ...qq, jumpPages: e })} className={styles.switch} checkedChildren="网页" unCheckedChildren="弹框" defaultChecked />
        </Col>
        <Col className={styles.col} md={24} lg={12} xxl={8}>
          <Title level={5}>知乎：</Title>
          <Input value={zhihu.val} onChange={(e) => setZhihu({ ...zhihu, val: e.target.value.trim() })} placeholder='知乎' allowClear />
          <Switch checked={zhihu.show} onChange={(e) => setZhihu({ ...zhihu, show: e })} className={styles.switch} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
          <Switch checked={zhihu.jumpPages} onChange={(e) => setZhihu({ ...zhihu, jumpPages: e })} className={styles.switch} checkedChildren="网页" unCheckedChildren="弹框" defaultChecked />
        </Col>
        <Col className={styles.col} md={24} lg={12} xxl={8}>
          <Title level={5}>掘金：</Title>
          <Input value={juejin.val} onChange={(e) => setJuejin({ ...juejin, val: e.target.value.trim() })} placeholder='掘金' allowClear />
          <Switch checked={juejin.show} onChange={(e) => setJuejin({ ...juejin, show: e })} className={styles.switch} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
          <Switch checked={juejin.jumpPages} onChange={(e) => setJuejin({ ...juejin, jumpPages: e })} className={styles.switch} checkedChildren="网页" unCheckedChildren="弹框" defaultChecked />
        </Col>
        <Col className={styles.col} md={24} lg={12} xxl={8}>
          <Title level={5}>GitHub：</Title>
          <Input value={github.val} onChange={(e) => setGithub({ ...github, val: e.target.value.trim() })} placeholder='GitHub' allowClear />
          <Switch checked={github.show} onChange={(e) => setGithub({ ...github, show: e })} className={styles.switch} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
          <Switch checked={github.jumpPages} onChange={(e) => setGithub({ ...github, jumpPages: e })} className={styles.switch} checkedChildren="网页" unCheckedChildren="弹框" defaultChecked />
        </Col>

        <Col className={styles.col} md={24} lg={12} xxl={8}>
          <Title level={5}>B站：</Title>
          <Input value={bilibili.val} onChange={(e) => setBilibili({ ...bilibili, val: e.target.value.trim() })} placeholder='哔哩哔哩' allowClear />
          <Switch checked={bilibili.show} onChange={(e) => setBilibili({ ...bilibili, show: e })} className={styles.switch} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
          <Switch checked={bilibili.jumpPages} onChange={(e) => setBilibili({ ...bilibili, jumpPages: e })} className={styles.switch} checkedChildren="网页" unCheckedChildren="弹框" defaultChecked />
        </Col>
        <Col className={styles.col} md={24} lg={12} xxl={8}>
          <Title level={5}>email：</Title>
          <Input value={email.val} onChange={(e) => setEmail({ ...email, val: e.target.value.trim() })} placeholder='email' allowClear />
          <Switch checked={email.show} onChange={(e) => setEmail({ ...email, show: e })} className={styles.switch} checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked />
        </Col>
      </Row>
      <Row className={styles.logo}>
        <Title level={5}>个人描述</Title>
        <TextArea value={des} onChange={(e) => setDes(e.target.value.trim())} placeholder='网站描述' />
      </Row>
      <Row className={styles.logo}>
        <Title level={5}>头像</Title>
        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          headers={header}
          action={apiurl+'uploadImg'}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {
            avatar
              ? <img src={ imgurl+avatar} alt="avatar" style={{ maxWidth:'100%',maxHeight:'100%' }} />
              : <div>
                {upLoading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>}
        </Upload>
      </Row>
    </Spin>
  );
}

export default IndexPage
