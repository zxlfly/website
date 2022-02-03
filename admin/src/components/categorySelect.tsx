import { CategoryModelState } from '@/models/category';
import getCategoryList from '@/utils/getCategoryList';
import { message, Select, Spin } from 'antd';
import { DefaultOptionType, SelectHandler } from 'rc-select/lib/Select';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'umi';
const { Option } = Select
interface Props {
  selectedType: number,
  selectType: SelectHandler<number, DefaultOptionType>,
}
const CategorySelect: FC<Props> = (props) => {
  const { selectedType, selectType } = props
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const category = useSelector(({ Category }: { Category: CategoryModelState }) => (Category))
  
  useEffect(() => {
    if (category.list.length == 0) {
      // console.log('chufale ');
      getCategoryList(dispatch,setIsLoading)
    }
  }, [])
  return (
    <Spin tip="Loading..." spinning={isLoading}>
      <Select
        style={{ width: '100%' }}
        size="large"
        placeholder='选择分类'
        onSelect={selectType}
        value={selectedType == -1 ? null : selectedType}
      >
        <Option key={-1} value={-1}>
        选择分类
        </Option>
        {
          category.list.length>0&&category.list.map((item) => {
            return <Option disabled={item.disable} key={item.id} value={item.id}>
              {item.name}
            </Option>
          })
        }
      </Select>
    </Spin>
  );
}

export default CategorySelect