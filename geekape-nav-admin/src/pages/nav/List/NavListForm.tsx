import {
  DrawerForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
  ProFormUploadDragger
} from "@ant-design/pro-form";
import useProFormItem from "@/hooks/useProFormItem";
import {UploadProps} from "antd";
import useGeekProForm from "@/components/GeekProForm/useGeekProForm";
import {API_NAV} from "@/services/api";
import request from "@/utils/request";

export default function NavListForm(props: any) {
  const formProps = useGeekProForm({
    ...props,
    onInitialValues(values: any): object {
      if (typeof values.logo === 'string') {
        values.logo = [{url: values.logo}]
      }
      return values
    },
    onFinish: async (values) => {
      values.logo = values.logo[0]?.url
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
  const logoProps = useProFormItem<UploadProps>({
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
    name: 'author',
    label: '作者名称',
  })
  const authorUrlProps = useProFormItem({
    name: 'authorUrl',
    label: '作者网站',
  })
  return (
    <DrawerForm {...props} {...formProps}>
      <ProFormUploadButton {...logoProps} />
      <ProFormText {...nameProps} />
      <ProFormTextArea {...descProps} />
      <ProFormText {...urlProps} />
      <ProFormText {...authorProps} />
      <ProFormText {...authorUrlProps} />
    </DrawerForm>
  )
}
