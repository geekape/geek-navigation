import {useMemo, useState} from 'react';

interface PopupShowParams {
  data?: any
  type?: string
  action?: object
}

export default function useGeekProTablePopup() {
  const [visible, setVisible] = useState(false);
  const [openType, setOpenType] = useState('add');
  const [tableAction, setTableAction] = useState({});
  const [selectedData, setSelectedData] = useState({});

  function show(params: PopupShowParams = {}) {
    setVisible(true)
    const { data, type, action } = params
    setSelectedData({})

    if (type && type === 'edit') {
      if (data) {
        setSelectedData(data)
      }

      if (type) {
        setOpenType(type)
      }

      if (action) {
        setTableAction(action)
      }
    } else {
      setOpenType('add')
      setSelectedData({})
    }
  }

  function hide() {
    setVisible(false)
  }

  const isEdit = useMemo(()=> openType === 'edit', [openType])

  return {
    show,
    hide,
    tableAction,
    openType,
    selectedData,
    onVisibleChange: setVisible,
    visible,
    isEdit
  }
}
