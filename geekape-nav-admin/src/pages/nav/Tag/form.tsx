import {
  ModalForm, ProFormText,
} from "@ant-design/pro-form";
import useProFormItem from "@/hooks/useProFormItem";
import useGeekProForm from "@/components/GeekProForm/useGeekProForm";
import {API_TAG} from "@/services/api";
import request from "@/utils/request";

export default function TagForm(props: any) {
  const formProps = useGeekProForm({
    ...props,
    onInitialValues(values: any): object {
      return values
    },
  })
  const nameProps = useProFormItem({
    name: 'name',
    label: '标签名',
    width: 'sm',
    required: true,
  })

  async function onFinish(values: any) {
    const data = {
        id: props.isEdit ? props.selectedData?._id : undefined,
        ...values,
      }
      await request({
        url: API_TAG,
        method: props.isEdit ? 'PUT' : 'POST',
        msg: props.isEdit ? '修改成功' : '添加成功',
        data
      })
      props.hide();
      props.tableRef.reload()
  }

  return (
    <ModalForm {...props} {...formProps} onFinish={onFinish} width={350}>
      <ProFormText {...nameProps} />
    </ModalForm>
  )
}
