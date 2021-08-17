import {
  DrawerForm, ProFormDependency, ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormUploadDragger
} from "@ant-design/pro-form";
import useProFormItem from "@/hooks/useProFormItem";
import {Form, UploadProps} from "antd";
import useGeekProForm from "@/components/GeekProForm/useGeekProForm";
import {API_NAV} from "@/services/api";
import request from "@/utils/request";
import CategorySelect from "@/pages/nav/Category/CategorySelect";
import TagSelect from "@/pages/nav/Tag/TagSelect";

export default function NavListForm(props: any) {
  const formProps = useGeekProForm({
    ...props,
    onFinish: async (values) => {
      const data = {
        id: props.isEdit ? props.selectedData?._id : undefined,
        ...values
      }
      await request({
        url: API_NAV,
        method: props.isEdit ? 'PUT' : 'POST',
        msg: props.isEdit ? '编辑成功' : '添加成功',
        data
      })
      props.hide()
      props.tableRef?.reload()
    }
  })
  const logoProps = useProFormItem({
    name: 'logo',
    label: '网站LOGO',
    required: true,
  })
  const nameProps = useProFormItem({
    name: 'name',
    label: '网站名称',
    required: true
  })

  const descProps = useProFormItem({
    name: 'desc',
    label: '网站描述',
    required: true
  })
  const urlProps = useProFormItem({
    name: 'href',
    label: '网站链接',
    required: true
  })
  const authorProps = useProFormItem({
    name: 'authorName',
    label: '作者名称',
  })
  const authorUrlProps = useProFormItem({
    name: 'authorUrl',
    label: '作者网站',
  })
  return (
    <DrawerForm {...props} {...formProps}>
      <ProFormDependency name={['logo']}>
        {({ logo })=> <ProFormText {...logoProps} formItemProps={{extra: <img width={50} src={logo} />}} />}
      </ProFormDependency>

      <ProFormText {...nameProps} />
      <Form.Item name='categoryId' label='网站分类'>
        <CategorySelect />
      </Form.Item>
      <Form.Item name='tags' label='网站标签'>
        <TagSelect valueKey={'name'} />
      </Form.Item>
      <ProFormTextArea {...descProps} />
      <ProFormText {...urlProps} />
      <ProFormText {...authorProps} />
      <ProFormText {...authorUrlProps} />
    </DrawerForm>
  )
}
