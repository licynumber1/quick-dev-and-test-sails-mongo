import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import '../node_modules/antd/dist/antd.min.css'
import Collection from './Collection.js'
import { Example } from './component'

//需要校验的集合：name代表名称，api代表接口访问地址、searchForm为查询搜索条件、form为编辑表单.
//form和searchForm： type代表对应组件、parse代表接口字段名、dis为描述。src为部分支持async组件获取数据用、srcMap代表对应label字段名，modalParse代表输出api字段名
const groups = [
  {
    name:"goods",
    api:"api/goods",
    searchForm:[
      {type:'Input',parse:"name",dis:"名称"},
      {type:'PriceInput',parse:"price",dis:"价格"},
      {type:'Select',parse:"typeLabel",dis:"类型",src:'api/goodsType',srcMap:'name',modalParse:"type"},
    ],
    form:[
      {type:'Input',parse:"name",dis:"名称"},
      {type:'PriceInput',parse:"price",dis:"价格"},
      {type:'Select',parse:"typeLabel",dis:"类型",src:'api/goodsType',srcMap:'name',modalParse:"type"},
    ]
  },
  {
    name:"goodsType",
    api:"api/goodsType",
    form:[
      {type:'Input',parse:"name",dis:"名称"},
    ]
  },
]


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          <Example />
        }
        {
          groups.map(i=>{
            return <Collection data={i}/>
          })
        }
      </div>
    );
  }
}
export default App;
