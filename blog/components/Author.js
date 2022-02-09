import React, { useEffect, useState } from 'react'
import styles from '../styles/components/author.module.css'
import { AliwangwangOutlined } from '@ant-design/icons';
import { Avatar } from 'antd'
import {imgurl} from '../config/request';
const Author = (props) => {
  return (
    <div className={styles.author}>
      <div> 
        {
          props.info.avatar
          ?<Avatar size={100} src={imgurl+props.info.avatar} />
          :<Avatar size={100} style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
        }
      </div>
      <div className={styles.introduction}>
        {!!props.info.des?props.info.des:(<>开心每一天！<AliwangwangOutlined /></>)}
      </div>
    </div>
  )
}
export default Author