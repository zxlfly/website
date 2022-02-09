import { Menu, message,Skeleton,Divider } from 'antd';
import { useEffect ,useState} from 'react';
import axios from 'axios';
import apiPath from '../config/request';
import Link from 'next/link'
import { useRouter } from 'next/router';

const { SubMenu } = Menu;
function NavPage() {
  const router = useRouter()
  const [isLoading,setIsLoading] = useState(false)
  const [list,setList] = useState([])
  const getDate = async () => {
    setIsLoading(true)
    let res = await axios.post(apiPath.getNav)
    setIsLoading(false)
    if (res.data.code == 200) {
      let menu = renderMenu(res.data.data.list)
      setList(menu)
    } else {
      message.error('获取分类导航失败')
    }
  }
  
  function renderMenu(list){
    const menu = []
    function create(children,el){
      children.map((x,i)=>{
        if(x.children.length){
          let son = []
          create(x.children,son)
          el.push(
            <SubMenu key={x.id} title={x.name}>
              {son}
            </SubMenu>
          )
        }else{
          el.push(<Menu.Item key={x.id}>
            <Link href={'/list/'+x.id+'/'} shallow={true}>
              {x.name}
            </Link>
          </Menu.Item>)
        }
      })
    }
    create(list,menu)
    return menu
  }
  const [refKey,setRefkey]=useState('/index')
  function getkey (){
    // console.log(router);
    if(router.pathname=='/'){
      setRefkey('/index') 
    }else if(router.pathname.startsWith('/list/')){
      setRefkey(router.query.id)
    }
  }
  useEffect(() => {
    getkey()
  }, [router.asPath])
  useEffect(() => {
    
    getDate()
  }, [])
  return (
    <div style={{padding:'1rem'}}>
      <Divider>分类导航</Divider>
      <Skeleton loading={isLoading} paragraph={{rows:10}} active>
        <Menu
          style={{ width: '100%' }}
          mode="inline"
          selectedKeys={[refKey]}
        >
          <Menu.Item key='/index'>
            <Link href={'/'}>
              最近日志
            </Link>
          </Menu.Item>
          {list}
        </Menu>
      </Skeleton>
    </div>
  );
}

export default NavPage