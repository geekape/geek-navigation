import {API_CATEGORY_LIST, API_NAV, API_NAV_LIST} from "@/services/api";
import GeekProTable from "@/components/GeekProTable/GeekProTable";
import {ProColumns} from "@ant-design/pro-table";
import useGeekProTablePopup from "@/components/GeekProTable/useGeekProTablePopup";
import NavListForm from "@/pages/nav/List/NavListForm";
import {Popconfirm, Select} from "antd";
import request from "@/utils/request";
import {useRef, useState} from "react";
import {Category} from "@/constants/api";

export default function NavListPage() {
  const tableRef = useRef();
  const formProps = useGeekProTablePopup()
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  async function onChange() {
    if (categoryList.length) return
    const res = await request({
      url: API_CATEGORY_LIST,
      method: 'GET'
    })
    setCategoryList(res.data)
  }

  const columns: ProColumns[] = [
    {
      title: '网站名称',
      dataIndex: 'name',
      width: 180,
    },
    {
      title: '分类',
      dataIndex: 'categoryId',
      width: 500,
      hideInTable: true,
      renderFormItem: () => (
        <Select onClick={onChange} showSearch>
          {categoryList.map(item => <Select.OptGroup label={item.name}>
            {item.children.map(subItem => <Select.Option value={subItem._id}>{subItem.name}</Select.Option>)}
          </Select.OptGroup>)}
        </Select>
      )
    },
    {
      title: '网站描述',
      dataIndex: 'desc',
      search: false,
      width: 500,
    },
    {
      title: '网站链接',
      dataIndex: 'href',
      search: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      valueType: 'dateTime'
    },
  ]

  return (
    <div>
      <GeekProTable
        actionRef={tableRef}
        columns={columns}
        requestParams={{url: API_NAV_LIST, method: 'GET'}}
        renderOptions={(text, record, _, action) => record.status != 2 ? [
          <a onClick={() => formProps.show({action, data: record, type: 'edit'})}>编辑</a>,
          <Popconfirm
            title={'确定删除吗?'}
            onConfirm={async () => {
              await request({
                url: API_NAV,
                method: 'DELETE',
                data: {
                  id: record?._id
                },
                msg: '删除成功'
              })
              action.reload()
            }}>
            <a>删除</a>
          </Popconfirm>,
        ] : []}></GeekProTable>
      <NavListForm {...formProps} tableRef={tableRef.current} />
    </div>
  )
}
