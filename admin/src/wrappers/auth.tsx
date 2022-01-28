import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { Redirect} from 'umi'

export default (props: { children: boolean | ReactChild | ReactFragment | ReactPortal | null | undefined; }) => {
  if (localStorage.getItem('userinfo')) {
    return <div>{ props.children }</div>;
  } else {
    return <Redirect to="/login" />;
  }
}