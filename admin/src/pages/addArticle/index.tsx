import React, { useState } from 'react';
import { marked } from 'marked'
import hljs from "highlightjs";
import moment from 'moment';
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import 'highlightjs/styles/monokai_sublime.css';
import './index.css'
import { Row, Col, Input, Select, Button, DatePicker, ConfigProvider } from 'antd'

const { Option } = Select;
const { TextArea } = Input
function AddArticle() {
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code: any) {
      return hljs.highlightAuto(code).value;
    }
  });
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('') //html内容
  const [introducemd, setIntroducemd] = useState('')            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别

  function leftMdChange(val: string) {
    if (val === articleContent) {
      return
    }
    setArticleContent(val)
    setMarkdownContent(marked(val))
  }
  function rightMdChange(val: string) {
    if (val === introducemd) {
      return
    }
    setIntroducemd(val)
    setIntroducehtml(marked(val))
  }
  function chooseDate() {

  }
  const nowDate = '' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()
  return (
    <div style={{paddingTop:'20px'}}>
      <Row gutter={20}>
        <Col span={18}>
          <Row gutter={10} >
            <Col span={20}>
              <Input
                placeholder="文章标题"
                size="large"
                value={articleTitle}
                onChange={(e) => setArticleTitle(e.target.value.trim())}
              />
            </Col>
            <Col span={4}>
              <Select style={{width:'100%'}} defaultValue="Sign Up" size="large">
                <Option value="Sign Up">选择分类</Option>
              </Select>
            </Col>
          </Row>
          <br />
          <Row gutter={10} >
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                placeholder="文章内容"
                value={articleContent}
                onChange={e => leftMdChange(e.target.value)}
              />
            </Col>
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}
              >

              </div>

            </Col>
          </Row>

        </Col>

        <Col span={6}>
          <Row justify='space-between'>
            <Button style={{ width: '45%' }} size="large">暂存文章</Button>&nbsp;
            <Button style={{ width: '45%' }} type="primary" size="large" onClick={() => { }}>发布文章</Button>
          </Row>
          <Row>
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                placeholder="文章简介"
                value={introducemd}
                onChange={e => rightMdChange(e.target.value)}
              />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: introducehtml }}
              ></div>
            </Col>
          </Row>
          <Row>
            <div className="date-select">
              <ConfigProvider locale={locale}>
                <DatePicker
                  className='addDatePicker'
                  defaultValue={moment(nowDate, 'YYYY-MM-DD')}
                  placeholder="发布日期"
                  size="large"
                  value={showDate}
                  onChange={chooseDate}
                />
              </ConfigProvider>
            </div>
          </Row>

        </Col>
      </Row>
    </div>
  )
}
export default AddArticle