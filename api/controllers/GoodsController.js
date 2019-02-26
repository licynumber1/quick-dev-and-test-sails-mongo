//Controller配置项
const { execHandle, normalHandle, execData, fixFunction, responseResult, withLifeCycle } = require('../utils')
//集合名
const collection = 'Goods'
//集合变量
const variable = ['name','price','type','size']
//定位值：搜索、更新采用的查找值
const LocationKey = 'name'
//引用基础增删改查模板
const template = require('../template/index')

//拓展重写方法
const exFun = {
  // search:async (req, res) => {
  //   const params = req.query
  //   if(union.length){
  //     const unionHandle = union.map(i=>{
  //       return global[i.collection].find(i.params)
  //     })
  //     let handle = [global[collection].find(params),...unionHandle]
  //     const data =  await Promise.all(handle)
  //     if(data){
  //       const baseResult = data[0]
  //       data.forEach((i,index)=>{
  //         if(index===0){
  //           return
  //         }else{
  //           const unionItem = union[index-1].unionOption
  //           const { locationLabel, exchangeLabel } = unionItem
  //           if(exchangeLabel[1]){
  //             baseResult.forEach(base=>{
  //               const unionDataItem = data[index].find(i=>i[locationLabel[1]]===base[locationLabel[0]]) //根据规则找到的附表的一条记录
  //               base[exchangeLabel[0]] = unionDataItem && unionDataItem[exchangeLabel[1]]
  //             })
  //           }else{
  //             baseResult.forEach(base=>{
  //               const unionDataItem = data[index].find(i=>i[locationLabel[0]]===base[locationLabel[1]]) //根据规则找到的附表的一条记录
  //               base[exchangeLabel[0]] = unionDataItem && unionDataItem
  //             })
  //           }
  //         }
  //       })
  //       normalHandle(undefined,baseResult,res)
  //     }else{
  //       normalHandle(err,"",res)
  //     }
  //
  //
  //     // Promise.all(handle).then((data)=>{
  //     //   const baseResult = data[0]
  //     //   data.forEach((i,index)=>{
  //     //     if(index===0){
  //     //       return
  //     //     }else{
  //     //       const unionItem = union[index-1].unionOption
  //     //       const { locationLabel, exchangeLabel } = unionItem
  //     //       if(exchangeLabel[1]){
  //     //         baseResult.forEach(base=>{
  //     //           const unionDataItem = data[index].find(i=>i[locationLabel[1]]===base[locationLabel[0]]) //根据规则找到的附表的一条记录
  //     //           base[exchangeLabel[0]] = unionDataItem && unionDataItem[exchangeLabel[1]]
  //     //         })
  //     //       }else{
  //     //         baseResult.forEach(base=>{
  //     //           const unionDataItem = data[index].find(i=>i[locationLabel[0]]===base[locationLabel[1]]) //根据规则找到的附表的一条记录
  //     //           base[exchangeLabel[0]] = unionDataItem && unionDataItem
  //     //         })
  //     //       }
  //     //     }
  //     //   })
  //     //   normalHandle(undefined,baseResult,res)
  //     // }).catch(err=>{
  //     //   normalHandle(err,"",res)
  //     // })
  //
  //     // Promise.all(handle).then((data)=>{
  //     //   const baseResult = data[0]
  //     //   data.forEach((i,index)=>{
  //     //     if(index===0){
  //     //       return
  //     //     }else{
  //     //       const unionItem = union[index-1].unionOption
  //     //       const { locationLabel, exchangeLabel } = unionItem
  //     //       if(exchangeLabel[1]){
  //     //         baseResult.forEach(base=>{
  //     //           const unionDataItem = data[index].find(i=>i[locationLabel[1]]===base[locationLabel[0]]) //根据规则找到的附表的一条记录
  //     //           base[exchangeLabel[0]] = unionDataItem && unionDataItem[exchangeLabel[1]]
  //     //         })
  //     //       }else{
  //     //         baseResult.forEach(base=>{
  //     //           const unionDataItem = data[index].find(i=>i[locationLabel[0]]===base[locationLabel[1]]) //根据规则找到的附表的一条记录
  //     //           base[exchangeLabel[0]] = unionDataItem && unionDataItem
  //     //         })
  //     //       }
  //     //     }
  //     //   })
  //     //   normalHandle(undefined,baseResult,res)
  //     // }).catch(err=>{
  //     //   normalHandle(err,"",res)
  //     // })
  //   }else{
  //     await global[collection].find(params).
  //     exec((error,data,hadHandle)=>execHandle({error,data,hadHandle,res,type:"find"}))
  //   }
  // }
}
//联表查询方法
const union = [
  //逻辑为从union中读取每个对象，作为一次联表操作。从{collection}集合中，根据联表的locationLabel[1]，找到与主表locationLabel[0]相对应的字段
  //根据type方法进行拼接数据,并将主表的exchangeLabel[0],替换为附表的exchangeLabel[1]
  {
    collection:"GoodsType",
    unionOption:{
      locationLabel:['type','id'],          // 从主表 / 联表中用于定位的字段
      exchangeLabel:['typeLabel','name'],        // 将主表的字段替换为联表的字段,不填第二个参数代表完整copy过去
      params:{}                  // 联表查询的自带参数
    }
  }
]
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
    before:()=>{
      console.log("del-before")
    },
    after:()=>{
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
  ...template.exportModule({collection,variable,LocationKey,union,lifeCycle}),
  ...exFun
}
