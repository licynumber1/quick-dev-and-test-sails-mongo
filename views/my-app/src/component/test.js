import React, { useState, useEffect, useRef } from 'react';
import { Select, Cascader, Checkbox } from 'antd'

export function Test() {
  // 声明一个名为“count”的新状态变量
  const data = [
    {label:"股票指数",value:"1",children:[{label:"市场指数",value:"1-1",children:[{label:"沪指",value:"1-1-1"},{label:"中证",value:"1-1-2"}]},{label:"市场指数",value:"1-1"}]}
    ]

  const onChange = (e) => {
    console.log(e)
  }

  const renderData = (data) => {
    let isRoot = !!data.children
    return (
      <div>{
        isRoot ? <Checkbox onChange={onChange}>{data.label}</Checkbox> : <div onClick={onChange}>{data.label}</div>
      }</div>
    )
  }

  return (
    <div>
      123
      { renderData(data) }
    </div>
  );
}
