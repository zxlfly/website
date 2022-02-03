import { FC, useEffect, useState } from 'react';
import { marked } from 'marked'
import hljs from "highlightjs";
import 'moment/locale/zh-cn';
import 'highlightjs/styles/monokai_sublime.css';
import './index.css'
import { Row, Col, Input, Select, Button, DatePicker, ConfigProvider, message, Spin, Breadcrumb } from 'antd'
import { connect, ConnectProps, useDispatch, useParams, UserModelState } from 'umi';
import { ApiRespone, ArticleCatche, ArticleList, CategoryList } from '@/types';
import category from '@/service/category';
import article from '@/service/article';
import Item from 'antd/lib/list/Item';
import { CategoryModelState } from '@/models/category';
import CategorySelect from '@/components/categorySelect'
interface AppProps extends ConnectProps {
  User: UserModelState;
  Category:CategoryModelState
}
interface paramsType {
  data: string
}
const { Option } = Select;
const { TextArea } = Input
const AddArticle: FC<AppProps> = props => {
  const dispatch = useDispatch()
  const params: paramsType = useParams();
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
  const [isLoading, setIsLoading] = useState(false)
  const [articleId, setArticleId] = useState<number | string>(params.data ?? -1) //文章id，-1标识不是编辑文章
  const [cacheId, setCacheId] = useState(-1)  //缓存文章的ID，如果是-1说明不存在缓存
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('') //html内容
  const [introducemd, setIntroducemd] = useState('')            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('') //简介的html内容
  const [selectedType, setSelectType] = useState<number>(-1) //选择的文章类别
  const [sort,setSort] = useState(99)
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
  function selectType(e: number) {
    console.log(e);
    setSelectType(e)
  }
  const nowDate = '' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate()

  async function submit(type: string) {
    if (!articleTitle.length) {
      return message.warning('请输入标题')
    } else if (!articleContent.length) {
      return message.warning('请输入内容')
    } else if (!introducemd.length) {
      return message.warning('请输入简介')
    } else if (selectedType == -1) {
      return message.warning('请选择类型')
    }
    if (type == 'catch') {
      catcharticle()
    } else if (type == 'add') {
      add()
    } else if (type == 'edit') {
      edit()
    }
  }
  async function edit() {
    setIsLoading(true)
    let res: ApiRespone<ArticleCatche> = await article.editArticle(Number(articleId), selectedType, articleTitle, introducemd, articleContent,sort)
    setIsLoading(false)
    // console.log('res:',res);
    if (res.code === 200) {
      message.success('编辑成功')
      props.history.goBack()
    } else {
      message.error(res.message)
    }
  }
  async function add() {
    setIsLoading(true)
    let res: ApiRespone<ArticleList> = await article.addArticle(Number(articleId), selectedType, articleTitle, introducemd, articleContent,sort)
    setIsLoading(false)
    // console.log('res:',res);
    if (res.code === 200) {
      message.success('添加成功')
      setArticleId(-1)
      setArticleTitle('')
      setArticleContent('')
      setIntroducemd('')
      setSelectType(-1)
      setMarkdownContent('')
      setIntroducehtml('')
    } else {
      message.error(res.message)
    }
  }
  async function catcharticle() {
    setIsLoading(true)
    let res: ApiRespone<ArticleCatche> = await article.addCatcheArticle(cacheId, selectedType, articleTitle, introducemd, articleContent)
    setIsLoading(false)
    console.log('res:', res);
    if (res.code === 200) {
      message.success('缓存成功')
    } else {
      message.error(res.message)
    }
  }
  async function getCatchData() {
    setIsLoading(true)
    let res = await article.getCatcheArticle()
    // console.log(res);
    setIsLoading(false)
    if (res.code === 200) {
      if (res.data.id == -1) {
        message.success('暂无缓存')
      } else {
        message.success(res.message)
        setCacheId(res.data.id)
        setArticleTitle(res.data.title)
        setArticleContent(res.data.content)
        setIntroducemd(res.data.introduction)
        setSelectType(res.data.pid)
      }
    } else {
      message.warn(res.message)
    }
  }
  async function getArticle() {
    setIsLoading(true)
    let res = await article.getArticle(Number(articleId))
    console.log(res);
    setIsLoading(false)
    if (res.code === 200) {
      if (res.data.id == -1) {
        // message.success('暂无缓存')
      } else {
        message.success(res.message)
        setArticleTitle(res.data.title)
        setArticleContent(res.data.content)
        setIntroducemd(res.data.introduction)
        setSelectType(res.data.pid)
      }
    } else {
      message.warn(res.message)
    }
  }
  function getData() {
    if (articleId !== -1) {
      getArticle()
    } else {
      getCatchData()
    }
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <div style={{ paddingTop: '20px' }}>
        {
          articleId !== -1 ?
            <Breadcrumb style={{ paddingBottom: '20px' }}>
              <Breadcrumb.Item onClick={() => { props.history.goBack() }}>
                <a>文章列表</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                编辑文章
              </Breadcrumb.Item>
            </Breadcrumb> : null
        }
        <Row gutter={20}>
          <Col span={18}>
            <Row gutter={10} >
              <Col span={16}>
                <Input
                  className={articleTitle.length > 0 ? '' : 'bitian'}
                  placeholder="文章标题"
                  size="large"
                  value={articleTitle}
                  onChange={(e) => setArticleTitle(e.target.value.trim())}
                />
              </Col>
              <Col span={4}>
                <Input
                  placeholder="排序"
                  size="large"
                  value={sort}
                  type={'number'}
                  onChange={(e) => setSort(Number(e.target.value.trim()))}
                />
              </Col>
              <Col span={4}>
                <CategorySelect 
                  selectedType={selectedType}
                  selectType={selectType}
                />
              </Col>
            </Row>
            <br />
            <Row gutter={10} >
              <Col span={12}>
                <TextArea
                  className={articleContent.length > 0 ? 'markdown-content' : 'bitian markdown-content'}
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
              {
                articleId == -1 ?
                  <>
                    <Button style={{ minWidth: '45%', height: '40px' }} type="primary" onClick={() => submit('catch')}>暂存文章</Button>
                    <Button style={{ minWidth: '45%', height: '40px' }} type="primary" onClick={() => submit('add')}>发布文章</Button>
                  </> :
                  <Button style={{ width: '100%', height: '40px' }} type="primary" onClick={() => submit('edit')}>确定修改</Button>
              }
            </Row>
            <Row>
              <Col span={24}>
                <br />
                <TextArea
                  rows={4}
                  placeholder="文章简介"
                  value={introducemd}
                  className={introducemd.length > 0 ? 'markdown-content' : 'bitian markdown-content'}
                  onChange={e => rightMdChange(e.target.value)}
                />
                <div
                  className="introduce-html"
                  dangerouslySetInnerHTML={{ __html: introducehtml }}
                ></div>
              </Col>
            </Row>

          </Col>
        </Row>
      </div>
    </Spin>
  )
}
export default connect(
  ({ User,Category }: { User: UserModelState ,Category:CategoryModelState}) => ({ User,Category })
)(AddArticle);