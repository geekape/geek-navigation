import styles from './index.less'
import {PageContainer} from "@ant-design/pro-layout";
import {API_NAV, API_NAV_LIST} from "@/services/api";
import GeekProTable from "@/components/GeekProTable/GeekProTable";
import {ProColumns} from "@ant-design/pro-table";
import useGeekProTablePopup from "@/components/GeekProTable/useGeekProTablePopup";
import NavListForm from "@/pages/nav/List/NavListForm";
import {Popconfirm} from "antd";
import request from "@/utils/request";

export default function NavListPage() {
  const formProps = useGeekProTablePopup()
  const columns: ProColumns[] = [
    {
      title: '网站名称',
      dataIndex: 'name',
      width: 180,
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
      title: '提交时间',
      dataIndex: 'createAt',
      search: false,
    },
  ]

  return (
    <div>
      <GeekProTable
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
        ] : []}
      />
      <NavListForm {...formProps} />
    </div>
  )
}
