import React from 'react';
import styles from '../styles/components/nav.module.css'
import { Tree,Divider } from 'antd';
function Nav(props) {
  const data = [
    {
      title: 'parent 1',
      key: '0-0',
      selectable:true,
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          children: [
            {
              title: 'leaf',
              key: '0-0-0-0',
            },
            {
              title: 'leaf',
              key: '0-0-0-1',
            },
            {
              title: 'leaf',
              key: '0-0-0-2',
            },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            {
              title: 'leaf',
              key: '0-0-1-0',
            },
          ],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [
            {
              title: 'leaf',
              key: '0-0-2-0',
            },
            {
              title: 'leaf',
              key: '0-0-2-1',
            },
          ],
        },
      ],
    },
  ]
  function chooseType(selectedKeys, e){
    console.log(selectedKeys);
    console.log(e);
  }
  return (
    <div className={styles.content}>
      <Divider>分类导航</Divider>
      <Tree 
        defaultExpandAll={true}
        treeData={data}
        onSelect={chooseType}
      />
    </div>
  );
}

export default Nav;