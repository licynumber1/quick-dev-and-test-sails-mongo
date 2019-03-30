import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from './common/request';
import '../node_modules/antd/dist/antd.min.css'
import { message, Button, Modal,Input,InputNumber,Table,Select } from 'antd'
const { Option } = Select

//配置:接口地址定义、表单定义

//逻辑

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      visible:false,
      parse:{},
      searchParse:{},
      form:[],
      goodsList:[],
      groupsItem:props.data
    }
    this.api = props.data.api
    this.form = props.data.form
    this.searchForm = props.data.searchForm || []
    this.baseColumns = this.form.map(i=>({
      title: i.dis || i.parse,
      dataIndex: i.parse,
      key: i.parse,
      render:i.render,
    }))
  }

  getFormItemMap = ({type,src,srcMap},getElementProps) => {
    //对于async组件,采用src获取数据。
    const formItemMap = {
      Input:Input,
      InputNumber:InputNumber,
      PriceInput:InputNumber,
      DeleteSpan:()=><span>确认删除?</span>,
      Select:AsyncSelect
    }

    const formPropsMap = {
      PriceInput:{
        step : 0.01
      },
      Select:{
        src,
        srcMap,
        visible:this.state.visible
      }
    }

    return getElementProps ? formPropsMap[type]: formItemMap[type]
  }

  changeVisible = async (visible) => {
    await this.setState({
      visible:visible === undefined ? !this.state.visible : visible,
      parse:{},
    })
  }

  handleOk = () => {
    this.state.handle()
    this.changeVisible()
  }

  changeParse = (v,label) => {
    this.state.parse[label] = v.target ? v.target.value : v
    this.setState({
      parse:this.state.parse
    },console.log(this.state.parse))
  }

  changeSearchParse = (v,label) => {
    this.state.searchParse[label] = v.target ? v.target.value : v
    this.setState({
      searchParse:this.state.searchParse
    },console.log(this.state.searchParse))
  }

  renderFormItem = (item) => {
    const handle = this.changeParse
    const { type,src,parse,srcMap,modalParse } = item
    const Element = this.getFormItemMap({type,src,srcMap})
    const otherProps = this.getFormItemMap({type,src,srcMap},true)
    return (
      <span>
        <span style={{display:"inline-block",width:"200px"}}>{modalParse || parse+":"}</span>
        <Element style={{width:"300px"}}
                 value={this.state.parse[modalParse || parse]}
                 onChange={(v)=>handle(v,modalParse || parse)}
                 { ...otherProps }
        />
      </span>
    )
  }

  renderSearchFormItem = (item) => {
    const handle = this.changeSearchParse
    const { type,src,parse,srcMap,modalParse } = item
    const Element = this.getFormItemMap({type,src,srcMap})
    const otherProps = this.getFormItemMap({type,src,srcMap},true)
    return (
      <span>
        <span style={{display:"inline-block",width:"100px"}}>{modalParse || parse+":"}</span>
        <Element style={{width:"180px"}}
                 value={this.state.searchParse[modalParse || parse]}
                 onChange={(v)=>handle(v,modalParse || parse)}
                 { ...otherProps }
        />
      </span>
    )
  }

  render() {
    const columns = [
      ...this.baseColumns,
      {
        title:'操作',
        dataIndex: 'handle',
        key:'handle',
        render:(i,row)=>{
          return (<span>
            <span style={{marginRight:"40px",cursor:"pointer"}} onClick={()=>this.editCommodityModal(row)}>编辑</span>
            <span style={{marginRight:"40px",cursor:"pointer"}} onClick={()=>this.deleteCommodityModal(row)}>删除</span>
          </span>)
        }
      }
    ]
    const { goodsList } = this.state
    return (
      <div>
        <div>
          {/*<Button onClick={this.search}>测试</Button>*/}
          <span>{ "-----"}<span style={{color:"red"}}>{this.props.data.name}</span>{"-----" }</span>
          <br/>
          <Button onClick={this.addCommodityModal}>新增</Button>
          {
            (this.props.data["addButton"] || []).map(i=>{
              return  <Button onClick={()=>this.getMethodAdd(i)}>{i.label}</Button>
            })
          }
          {
            this.searchForm.map((i,index)=>{
              return (
                <span key={index}>{this.renderSearchFormItem(i)}</span>
              )
            })
          }
          <Button onClick={this.getCommodity}>查询</Button>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={goodsList}
          />
        </div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={()=>this.changeVisible()}
        >
          {
            this.state.form.map((i,index)=>{
              return (
                <div key={index}>{this.renderFormItem(i)}</div>
              )
            })
          }
        </Modal>
      </div>
    );
  }

  search = () => {
    axios.getWithoutCancel(this.api).then(res=>{
      if(res && res.data && res.data.code === 200 && res.data.result){
        message.success("获取数据成功");
      }else{
        message.error( (res && res.data && res.data.msg) || '获取菜单栏失败');
      }
    })
  }

  // modal

  addCommodityModal = async () => {
    await this.changeVisible()
    this.setState({
      handle:this.addCommodity,
      form:this.form
    })
  }

  editCommodityModal = async (row) => {
    await this.changeVisible()
    this.setState({
      handle:this.editCommodity,
      form:this.form,
      parse:{
        ...row
      }
    })
  }

  deleteCommodityModal = async (row) => {
    await this.changeVisible()
    this.setState({
      handle:this.deleteCommodity,
      form:[
        {type:"DeleteSpan",parse:"删除提示"}
      ],
      parse:{
        id:row.id
      }
    })
  }

  // handle

  addCommodity = () => {
    axios.put(this.api,this.state.parse).then(res=>{
      if(res && res.data && res.data.code === 200 && res.data.result){
        message.success("新增商品成功");
        this.getCommodity()
      }else{
        message.error( (res && res.data && res.data.msg) || '获取菜单栏失败');
      }
    })
  }

  editCommodity = () => {
    axios.postForm(this.api,this.state.parse).then(res=>{
      if(res && res.data && res.data.code === 200 && res.data.result){
        message.success("修改商品成功");
        this.getCommodity()
      }else{
        message.error( (res && res.data && res.data.msg) || '获取菜单栏失败');
      }
    })
  }

  deleteCommodity = () => {
    axios.del(this.api,this.state.parse).then(res=>{
      if(res && res.data && res.data.code === 200 && res.data.result){
        message.success("删除商品成功");
        this.getCommodity()
      }else{
        message.error( (res && res.data && res.data.msg) || '获取菜单栏失败');
      }
    })
  }

  getCommodity = () => {
    const parse = this.state.searchParse
    for(let i in parse){
      if(parse[i] === ""){
        parse[i] = undefined
      }
    }
    axios.getWithoutCancel(this.api,parse).then(res=>{
      if(res && res.data && res.data.code === 200 && res.data.result){
        this.saveGoodsList(res.data.result)
        message.success("获取数据成功");
      }else{
        message.error( (res && res.data && res.data.msg) || '获取菜单栏失败');
      }
    })
  }

  getMethodAdd = ({api,parse={},successLabel,errorLabel}) => {
    console.log(api,parse)
    axios.getWithoutCancel(api,parse).then(res=>{
      if(res && res.data && res.data.code === 200 && res.data.result){
        message.success(successLabel || "操作成功");
      }else{
        message.error( (res && res.data && res.data.msg) || errorLabel || '获取菜单栏失败');
      }
    })
  }

  saveGoodsList = (goodsList) => {
    this.setState({
      goodsList
    })
  }

  componentDidMount() {
    this.getCommodity()
  }
}

class AsyncSelect extends Component {
  state={
    options:[]
  }
  fixSrcData = (src,srcMap) => {
    if(src){
      axios.getWithoutCancel(src).then(res=>{
        if(res && res.data && res.data.code === 200 && res.data.result){
          const result = (res.data.result.map(i=>({
            value:i.id,
            label:i[srcMap]
          })))
          this.setState({
            options:result
          })
          message.success("AsyncSelect获取数据成功");
        }else{
          message.error( (res && res.data && res.data.msg) || '获取菜单栏失败');
        }
      })
    }
  }
  componentDidMount(){
    const {src ,srcMap} = this.props
    this.fixSrcData(src,srcMap)
  }

  componentWillReceiveProps(nextProps){
    const {src ,srcMap,visible} = nextProps
    if(visible === true && this.props.visible === false){
      this.fixSrcData(src,srcMap)
    }
  }

  render() {
    return (
      <Select {...this.props}>
        <Option value={""}>空</Option>
        {
          this.state.options.map((i,index)=>(
            <Option value={i.value} key={index}>{i.label}</Option>
          ))
        }
      </Select>
    );
  }
}

class ElementWithMore extends Component {
  render() {
    const { Element, other } = this.props
    return (
     <Element { ...other }/>
    );
  }
}

export default App;
