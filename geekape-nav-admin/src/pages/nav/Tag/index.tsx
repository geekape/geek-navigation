import {Button, Popconfirm} from "antd";
import request from "@/utils/request";
import {API_TAG, API_TAG_list} from "@/services/api";
import GeekProTable from "@/components/GeekProTable/GeekProTable";
import type {ActionType, ProColumns} from "@ant-design/pro-table";
import {PlusOutlined} from "@ant-design/icons";
import useGeekProTablePopup from "@/components/GeekProTable/useGeekProTablePopup";
import {useRef, useState} from "react";
import TagForm from "@/pages/nav/Tag/form";


export default function NavTagListPage() {
  const formProps = useGeekProTablePopup()
  const tableRef = useRef<ActionType>();
  const [tagList, setTagList] = useState([]);

  async function onRequestData() {
    const { data } = await request({
      url: API_TAG_list,
      method: 'GET',
      data: {
        showInMenu: false
      }
    })
    setTagList(data.data)
    return data
  }


  async function onDelete(id: string, action: any) {
    await request({
      url: API_TAG,
      method: 'DELETE',
      data: {
        id,
      },
      msg: '删除成功',
    })
    action.reload()
  }

  const columns: ProColumns[] = [
    {
      title: '标签名',
      dataIndex: 'name'
    },
  ]
  return (
      <div>
        <GeekProTable
          actionRef={tableRef}
          columns={columns}
          pageHeaderProps={{
            extra: <Button type='primary' onClick={()=> formProps.show()}><PlusOutlined />添加标签</Button>
          }}
          search={false}
          request={onRequestData}
          renderOptions={(text, record, _, action)=> ([
            <a onClick={()=> formProps.show({type: 'edit', data: record, action})}>编辑</a>,
            <Popconfirm title={'确定删除吗？'} onConfirm={() => onDelete(record._id, action)}>
              <a>删除</a>
            </Popconfirm>,
          ])}
        />
        <TagForm {...formProps} tableRef={tableRef.current} tagList={tagList} />
      </div>
  );
}
