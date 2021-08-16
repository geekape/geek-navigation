import {Select, SelectProps} from "antd";
import request from "@/utils/request";
import {API_TAG_list} from "@/services/api";
import {useEffect, useState} from "react";
import {TagModel} from "@/constants/api";

interface TagSelectProps extends SelectProps<any> {
  valueKey?: string
}

export default function TagSelect(props: TagSelectProps) {
  const [tagList, setTagList] = useState<TagModel[]>([]);
  const [value, setValue] = useState([])

  useEffect(()=> {
    async function getTagList() {
      const { data } = await request({
        url: API_TAG_list,
        method: 'GET'
      })
      if (Array.isArray(data.data)) {
        setTagList(data?.data)
      }
    }

    getTagList()
  }, [])

  function onSelectChange(value: any) {
    setValue(value)
  }

  return (
    <Select onChange={onSelectChange} value={value} showSearch mode={'tags'} {...props}>
        {tagList.map(subItem => <Select.Option value={subItem[props.valueKey || '_id']}>{subItem.name}</Select.Option>)}
    </Select>
  )
}
