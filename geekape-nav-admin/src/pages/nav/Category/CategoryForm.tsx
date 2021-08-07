import {
  ModalForm, ProFormSelect, ProFormText,
  ProFormUploadButton,
} from "@ant-design/pro-form";
import useProFormItem from "@/hooks/useProFormItem";
import useGeekProForm from "@/components/GeekProForm/useGeekProForm";
import {API_CATEGORY, API_CATEGORY_LIST, API_NAV} from "@/services/api";
import request from "@/utils/request";
import {useMemo} from "react";

export default function CategoryForm(props: any) {
  const formProps = useGeekProForm({
    ...props,
    onInitialValues(values: any): object {
      return values
    },
    onFinish: async (values) => {
      await request({
        url: API_CATEGORY,
        method: props.isEdit ? 'PUT' : 'POST',
        msg: props.isEdit ? '修改成功' : '添加成功',
        data: {
          id: props.isEdit ? props.selectedData?._id : undefined,
          ...values
        }
      })
      props.hide();
      props.tableRef.reload()
    }
  })
  const nameProps = useProFormItem({
    name: 'name',
    label: '分类名',
    width: 'sm',
    required: true,
  })
  const categoryProps = useProFormItem({
    name: 'categoryId',
    label: '父级分类',
    width: 'sm',
  })
  const categoryIconProps = useProFormItem({
    name: 'icon',
    label: '分类图标',
    width: 'sm',
  })

  const icons = [
    'iconfont icon-qianduan',
    'iconfont icon-bd_jiaocheng',
    'iconfont icon-ziyuan',
    'iconfont icon-chanpin',
    'iconfont icon-gongju',
    'iconfont icon-yunying',
    'iconfont icon-sheji',
  ]

  return (
    <ModalForm {...props} {...formProps} width={300}>
      <ProFormText {...nameProps} />
      <ProFormSelect {...categoryProps} options={props.categoryList.reduce((t, v) => [...t, {label: v.name, value: v._id}], [])}/>
      <ProFormSelect
        {...categoryIconProps}
        options={icons.reduce((t, v) => [...t, {label: <i className={v}></i>, value: v}], [])}
      />
    </ModalForm>
  )
}
