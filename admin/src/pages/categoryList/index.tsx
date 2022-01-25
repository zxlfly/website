import styles from './index.css';
import { List, Avatar, Button, Skeleton, Row } from 'antd';
import { useEffect, useState } from 'react';
import {
  ReadOutlined,
  PartitionOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/lib/layout/layout';
const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
export default function IndexPage() {

  const [initLoading, setInitLoading] = useState(true)
  const [list, setList] = useState([])
  useEffect(() => {
    fetch(fakeDataUrl)
      .then(res => res.json())
      .then(res => {
        setList(res.results)
        setInitLoading(false)
        console.log({
          data: res.results,
          list: res.results,

        });
      });
  }, [])

  return (
    <>
      <Row align='middle' justify='space-between' className={styles.header}>
        <div>
          分类列表
        </div>
        <Button type='primary' size='large'>
          添加分类
        </Button>
      </Row>
      <List
        className={styles.list}
        itemLayout="horizontal"
        dataSource={list}
        bordered={true}
        size={'large'}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit">编辑</a>]}
          >
            <Skeleton avatar loading={initLoading} title={false} active>
              <List.Item.Meta
                avatar={<Avatar src={item.picture.large} />}
                title={<a href="https://ant.design">{item.name.last}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
              <div>content</div>
            </Skeleton>
          </List.Item>
        )}
      />
    </>
  );
}


