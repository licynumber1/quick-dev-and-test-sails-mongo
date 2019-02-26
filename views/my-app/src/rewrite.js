import React, { Component } from 'react'
import { Input, Select, Tag, Tooltip, notification, Modal, Checkbox, Upload } from 'antd'
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton
} from 'video-react'
import Progress from '../../../../components/Progress'
import axios from 'axios'
import RichTextEditor from '../../../../components/RichTextEditorFix'
import MapContainer from "../../../../components/Map/MapContainer"
import UpLoadVideo from '../../../../components/UpLoadVideo'
import CutImage from '../../../../components/CutImage'
import { TagsModal } from '../../../../components/ImageTextParams/modals'
import LengthLimitInput from '../../../../shared/project/LengthLimitInput'
import Abstract from "../../../../components/ImageTextParams/Abstract"
import { load } from '../../../../components/HOC/Load'
import { getMediaTime, getAudioTime, secondsToTime, timeToSeconds, ossUrl, uuKey, videoUrl } from '../../../../utils'
import {
  Cover,
  Location,
} from '../../../../components/ImageTextParams/Export'
import './index.less'
const OSS = require('ali-oss')
const { Option } = Select

export class FixInput extends Component {
  render(){
    const { value,onChange,...others } = this.props
    return (
      <Input {...others} value={value} onChange={(e)=>onChange(e.target.value)}/>
    )
  }
}

export class FixSelect extends Component {

  constructor(props){
    super(props)
    this.state = {
      option: props.option || []
    }
  }

  componentDidMount(){
    //对于传入了srcArray的实例，需要根据src来获取数据。以array的方式传入是为了其他组件可能会用到多个src,做通用处理
    const { srcArray=[], onChange, value ,srcMap} = this.props
    const { option } = this.state
    if(srcArray && srcArray.length && srcArray[0]){
      const src = srcArray[0]
      const url = src
      const defaultValue = option && option[0] && option[0].value
      const data = axios.get(url, {}).then(res => {
        if (res && res.data && res.data.success) {
          const { result } = res.data
          if(result){
            //获取select值
            //todo:
            this.setState({
              option:srcMap(result)
            },()=>onChange( value || defaultValue,true))
          }else{

          }
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {

  }

  render(){
    const { value,onChange,pageType,...others } = this.props
    const { option } = this.state
    const defaultValue = "empty" || option && option[0] && option[0].value
    return (
      <Select disabled={pageType==="tag"} style={{width:"100%"}} {...others} value={value || defaultValue} onChange={onChange}>
        <Option key={-1} value={"empty"}>
          {"空"}
        </Option>
        {option.map((item,key)=>(
          <Option key={key} value={item.value}>
            {item.label}
          </Option>
        ))}
      </Select>
    )
  }
}

export class FixRichText extends Component {
  render(){
    const { value,onChange,...others } = this.props
    return (
      <span style={{display:"inline-block",width:""}}>
         {/*RichTextEditor没有按照开放原则,传入的任何参数都会被使用(可能错误使用,传参时请注意,不要传入额外的参数)*/}
        <RichTextEditor title={value.title || ''}
                        content={value.content || ''}
                        cb={onChange}
                        data={value}
        />
      </span>
    )
  }
}

export class FixLocation extends Component {
  state = {
    address:undefined
  }
  componentDidMount() {
    this.setState({
      address:""
    })
  }
  render(){
    const { value="",onChange,...others } = this.props
    return (
      <Location {...others} address={value.address || value || ""} areaId={value.areaId} cb={onChange} withoutLabel={true} />
    )
  }
}

export class FixUpLoadVideo extends Component {
  render(){
    const { value,onChange,...others } = this.props
    const defaultMsg = '建议上传高于720p（1280X720），大小不超过200M'
    return (
      <div key="left-6" style={{width:"300px",height:"200px"}}>
        {
          <UpLoadVideo {...others}
                       list={value || []}
                       onChange={onChange}
                       msg={others.msg || defaultMsg}
          />
        }
      </div>
    )
  }
}

export class FixCutImage extends Component {
  render(){
    const { value,onChange,...others } = this.props
    const defaultMsg = '建议上传高于720p（1280X720），大小不超过200M'
    return (
      <div key="left-6" style={{width:"300px",height:"200px"}}>
        {
          <CutImage
            discript={ others.discript ? others.discript : ()=><div style={{display:"inline-block",width:"120px",color:"#999999",marginLeft:"10px",fontSize:"13px"}}>推荐尺寸640*640</div> }
            {...others}
            type="square"
            src={value}
            onChange={onChange}
          />
        }
      </div>
    )
  }
}

// export class FixTag extends Component {
//
//   constructor(props){
//     super(props)
//     this.state = {
//       visible:false,
//       selectedRowKeys:(props.value || []).map(i=>JSON.stringify(i)) || [],
//     }
//   }
//
//   hideModal = () => {
//     this.setState({
//       visible:false,
//     })
//   }
//
//   showModal = () => {
//     this.setState({
//       visible:true,
//     })
//   }
//
//   setSelectedRowKeys = (selectedRowKeys) => {
//     this.setState({
//       selectedRowKeys
//     })
//     const fixData = selectedRowKeys.map(i=>JSON.parse(i))
//     this.props.onChange(fixData)
//   }
//
//   handleTagClose = key => {
//     const selectedRowKeys = this.state.selectedRowKeys.filter(item => {
//       return item !== key
//     })
//     const { onChange } = this.props
//     let obj = selectedRowKeys.map(item => JSON.parse(item).id)
//     this.setState({ selectedRowKeys })
//     onChange && onChange(obj)
//   }
//
//   render(){
//     const { ...others } = this.props
//     const { visible, selectedRowKeys } = this.state
//     return (
//       <div className="cacloud-tags-component">
//         <div>
//           {selectedRowKeys.length > 0 &&
//           selectedRowKeys.map(item => {
//             const tag = JSON.parse(item)
//             const isLongTag = tag.name > 20
//             const tagEle = (
//               <Tag
//                 key={tag.id}
//                 closable
//                 afterClose={() => this.handleTagClose(item)}
//               >
//                 {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
//               </Tag>
//             )
//             return isLongTag ? (
//               <Tooltip title={tag.name} key={tag.id}>
//                 {tagEle}
//               </Tooltip>
//             ) : (
//               tagEle
//             )
//           })}
//             <span className="add-tags"  onClick={this.showModal}>
//               点击添加
//             </span>
//           <TagsModal
//             visible={visible}
//             hide={this.hideModal}
//             selectedRowKeys={selectedRowKeys}
//             setSelectedRowKeys={this.setSelectedRowKeys}
//           />
//         </div>
//       </div>
//     )
//   }
// }

export class FixLengthInput extends Component {
  render(){
    const { value,onChange,...others } = this.props
    return (
      <LengthLimitInput {...others} config={{value:value}} changeData={(e)=>onChange(e)}/>
    )
  }
}

export class FixTextarea extends Component{
  render(){
    const { value,onChange,...others } = this.props
    return (
      <Abstract description={value} cb={(data)=>onChange(data.description)}
                maxLength={300} title="备注" titleStyle={{marginBottom:"15px"}} withoutMargin={true} pls=" " {...others}/>
    )
  }
}

export class FixCover extends Component{
  state={
    children:[]
  }
  getDataCb = (e) => {
    this.props.onChange(e.image)
  }
  render(){
    const { value,onChange,...others } = this.props
    return (
      <Cover
        radio={false}
        imgUrl={false}
        {...others}
        image={value}
        cb={this.getDataCb}
        withoutLabel={true}
      />
    )
  }
}

const data = {
  FixInput,FixSelect,FixRichText,FixLocation,FixUpLoadVideo,FixCutImage,FixLengthInput,FixTextarea,FixCover
}

export default data
