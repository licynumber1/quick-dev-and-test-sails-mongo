//Controller配置项

//集合名
const collection = 'GoodsType'
//集合变量
const variable = ['name']
//定位值：搜索、更新采用的查找值
const LocationKey = 'name'
//引用基础增删改查模板
const template = require('../template/index')

//拓展重写方法
const exFun = {

}
//生命周期方法
const lifeCycle = {
  search:{
    before:()=>{
      console.log("search-before")
    },
    after:()=>{
      console.log("search-after")
    }
  },
  create:{
    before:()=>{
      console.log("create-before")
    },
    after:()=>{
      console.log("create-after")
    }
  },
  edit:{
    before:()=>{
      console.log("edit-before")
    },
    after:()=>{
      console.log("edit-after")
    }
  },
  del:{
    before:(req)=>{
      console.log("del-before")
      // console.log(req)
      // return true
    },
    after:(req)=>{
      console.log("del-after")
    }
  },
}
//拓展方法生命周期载入
for(let i in exFun){
  const baseFun = exFun[i]
  exFun[i] = async (req,res)=>await withLifeCycle(req,res,baseFun,lifeCycle[i])
}

//导出继承基础方法
module.exports = {
  ...template.exportModule({collection,variable,LocationKey,lifeCycle}),
  ...exFun
}
