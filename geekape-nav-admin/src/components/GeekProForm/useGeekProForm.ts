import { useEffect, useRef } from 'react';
import type { ProFormProps } from '@ant-design/pro-form';

interface IProps extends ProFormProps {
  onInitialValues(values: any): object,
  [name: string]: any
}

/**
 * proform封装
 * 1. 针对编辑的Form，自动设置默认值
 * 2. 添加和编辑的Form逻辑处理
 * @param props
 */
export default function useGeekProForm(props: IProps) {
  const form = useRef<any>({});

  useEffect(() => {
    if (props?.visible && props.selectedData) {
      if (props.isEdit) {
        // 设置编辑表单的选中值
        let selectedData = props.selectedData
        if (props.onInitialValues) {
          selectedData = props.onInitialValues(props.selectedData)
        }
        console.log('form.current.setFieldsValue:', selectedData);
        form.current.setFieldsValue(selectedData)
      } else {
        form.current.resetFields()
      }

    }
  }, [props?.visible]);


  return {
    formRef: form,
    ...props
  }
}
