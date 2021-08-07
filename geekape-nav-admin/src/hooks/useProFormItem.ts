import {ProFormItemProps} from "@ant-design/pro-form/es/interface";

export default function useProFormItem<T>(props: ProFormItemProps & T): ProFormItemProps & T {
  if (props.required) {
    props.rules = [{required: true}]
  }
  return {
    ...props
  }
}
