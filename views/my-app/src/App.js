import React, { Component } from 'react';
import { Popover } from 'antd'
import logo from './logo.svg';
import './App.css';
import '../node_modules/antd/dist/antd.min.css'
import Collection from './Collection.js'
import {Test} from "./component/test";

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

  {
    name:"lagou",
    api:"api/lagou",
    form:[
      {type:'Input',parse:"time",dis:"日期"},
      {type:'Input',parse:"from",dis:"来源"},
      {type:'Input',parse:"data",dis:"数据",render:(data)=>{ return (
        <Popover content={
          <div style={{maxWidth:"500"}}>
            {
              data.map(i=>{
                return (
                  <div>
                    <a href={i.href} target="_blank">{i.text}</a>
                  </div>
                )
              })
            }
          </div>
        }>
          <span>{data.length}</span>
        </Popover>
        ) }},
    ],
    addButton:[
      {
        label:"爬取源数据",
        api:"api/lagou/getExternalData",
        parse:{},
      }
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
          groups.map(i=>{
            return <Collection data={i}/>
          })
        }
      </div>
    );
  }
}
export default App;
