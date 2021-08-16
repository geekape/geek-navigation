import {Select} from "antd";
import request from "@/utils/request";
import {API_CATEGORY_LIST} from "@/services/api";
import {useEffect, useState} from "react";
import {CategoryModel} from "@/constants/api";

export default function CategorySelect(props: any) {
  const [categoryList, setCategoryList] = useState<CategoryModel[]>([]);
  const [value, setValue] = useState('')

  useEffect(()=> {
    async function getCategoryList() {
      const res = await request({
        url: API_CATEGORY_LIST,
        method: 'GET'
      })
      setCategoryList(res.data)
    }

    getCategoryList()
  }, [])

  function onSelectChange(value: string) {
    setValue(value)
  }

  return (
    <Select onChange={onSelectChange} value={value} showSearch {...props}>
      {categoryList.map(item => <Select.OptGroup label={item.name}>
        {item.children.map(subItem => <Select.Option value={subItem._id}>{subItem.name}</Select.Option>)}
      </Select.OptGroup>)}
    </Select>
  )
}
