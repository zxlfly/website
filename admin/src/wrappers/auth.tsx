import ConnectState from '@/types/connect';
import { FC} from 'react';
import { Redirect, UserModelState, useSelector} from 'umi'

const IndexPage:FC = props =>{
  const userinfo = useSelector(({ User }: { User: UserModelState }) => (User))
  // const userinfo = useSelector((state:ConnectState) => state.User)
  if (userinfo.login) {
    return <div>{ props.children}</div>;
  } else {
    return <Redirect to="/login" />;
  }
}
export default IndexPage