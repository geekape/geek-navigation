import React, { ReactNode, useImperativeHandle, useMemo, useRef, useState } from 'react';
import ProTable, { ProColumns, ProTableProps } from '@ant-design/pro-table';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Dropdown, Menu, PageHeaderProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import request from "@/utils/request";

/**
 * 封装 ProTable 功能
 * 1. 组合 PageHeaderWrapper
 * 2. 导出 ref
 * 3. table的请求
 * 4. 操作栏触发弹窗
 * 5. 导入table action，方便在完成后刷新表格
 * 6. 表格超过3个操作，加到更多里面去
 * @constructor
 */

interface GeekProTableProps extends ProTableProps<any, any> {
  showPageHeader?: boolean;
  pageHeaderProps?: PageHeaderProps;
  requestParams?: any;
  defaultRequestData?: object
  renderOptions?: (text: ReactNode, record: any, _: any, action: any) => ReactNode[];
}

function GeekProTable(props: GeekProTableProps, ref: any) {
  const {
    showPageHeader = true,
    pageHeaderProps = {},
    requestParams = {},
    defaultRequestData = {},
    columns = [],
    children,
    renderOptions,
    ...proTableProps
  } = props;

  const from = useRef();
  useImperativeHandle(ref, () => ({ from: from.current }), []);

  const [loading, setLoading] = useState(false);

  const realColumns  = useMemo<ProColumns[]>(() => {
    if (renderOptions) {
      return [
        ...columns,
        {
          title: '操作',
          valueType: 'option',
          render: (text, record, _, action)=> formatOptions(renderOptions(text, record, _, action))
        }
      ]
    }
    return columns
  }, [renderOptions, columns]);

  // useEffect(() => {
  //   if (renderOptions) {
  //     columns.push({
  //       title: '操作',
  //       valueType: 'option',
  //       render: (text, record, _, action) => formatOptions(renderOptions(text, record, _, action)),
  //     });
  //   }
  // }, [columns, renderOptions]);

  const proTable = (
    <ProTable
      columns={realColumns}
      loading={loading}
      formRef={from}
      request={proTableProps.request || onRequest}
      rowSelection={{type: 'checkbox'}}
      rowKey={'_id'}
      {...proTableProps}
    />
  );

  async function onRequest(params: any) {
    setLoading(true);
    try {
      const { url, pageSize, current } = params
      delete params.url
      delete params.pageSize
      delete params.current

      const res: any = await request({
        url,
        ...requestParams,
        data: {
          pageSize,
          pageNumber: current,
          ...defaultRequestData,
          ...params,
        },
      });
      setLoading(false);
      // const resData = parseListData(res);
      return {
        data: res?.data?.data,
        total: res?.data?.total,
      };
    } catch (err) {
      console.error(err)
    }
  }

  if (!showPageHeader) {
    return proTable;
  }

  return (
    <PageHeaderWrapper {...pageHeaderProps}>
      {proTable}
      {children}
    </PageHeaderWrapper>
  );
}

function formatOptions(options: any[], maxCount = 3) {
  if (options.length >= maxCount) {
    const moreOptions = options.splice(maxCount-1);

    return [
      ...options,
      <Dropdown
        overlay={
          <Menu>
            {moreOptions.map(item => (
              <Menu.Item>{item}</Menu.Item>
            ))}
          </Menu>
        }
        trigger={['click']}
      >
        <a>
          更多操作
          <DownOutlined />
        </a>
      </Dropdown>,
    ];
  }

  return options;
}

export default React.forwardRef(GeekProTable);
