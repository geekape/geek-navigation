import GeekProTable from "@/components/GeekProTable/GeekProTable";
import {API_NAV_AUDIT, API_NAV_LIST} from "@/services/api";
import {ProColumns} from "@ant-design/pro-table";
import {Popconfirm} from "antd";
import request from "@/utils/request";

export default function NavAuditListPage() {
  const columns: ProColumns[] = [
    {
      title: '审核状态',
      dataIndex: 'status',
      valueType: 'select',
      initialValue: ['1'],
      valueEnum: {
        1: {text: '审核中', status: 'Default'},
        2: {text: '已拒绝', status: 'Error'},
      },
      width: 100,
    },
    {
      title: '网站名称',
      dataIndex: 'name',
      search: false,
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
      title: '创建时间',
      dataIndex: 'createTime',
      search: false,
      valueType: 'dateTime'
    },
  ]

  async function onActionClick(id: string, action: any, status = 0) {
    await request({
      url: API_NAV_AUDIT,
      method: 'PUT',
      data: {
        id,
        status: 0,
      },
      msg: status == 0 ? '通过成功' : '拒绝成功'
    })
    action?.reload()
  }

  return (
    <GeekProTable
      columns={columns}
      requestParams={{url: API_NAV_LIST, method: 'GET'}}
      renderOptions={(text, record, _, action) => record.status != 2 ? [
        <Popconfirm title={'确定通过吗？'} onConfirm={() => onActionClick(record._id, action, 1)}>
          <a>通过</a>
        </Popconfirm>,
        <Popconfirm title={'确定拒绝吗？'} onConfirm={() => onActionClick(record._id, action, 2)}>
          <a>拒绝</a>
        </Popconfirm>
      ] : []}/>
  )
}
