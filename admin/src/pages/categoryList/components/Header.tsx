import { Avatar } from 'antd';

const Header = (props) => {
  return (
    <div style={{paddingLeft:(props.lv-1)*35+'px'}}>
      <Avatar style={{ backgroundColor: '#87d068' }} size={40} >{props.name[0].toUpperCase()}</Avatar>
    </div>
  );
};

export default Header;