import { Avatar } from 'antd';
interface Props {
  name:string,
  lv:number,
  children?:any
}
const Header = (props:Props) => {
  return (
    <div style={{paddingLeft:(props.lv-1)*35+'px'}}>
      <Avatar style={{ backgroundColor: '#87d068' }} size={40} >{props.name[0].toUpperCase()}</Avatar>
    </div>
  );
};

export default Header;