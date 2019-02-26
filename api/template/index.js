const mongo = require('sails-mongo')
const sails = require('sails')
const { execHandle, normalHandle, execData, fixFunction, responseResult, withLifeCycle } = require('../utils')

const fixData = (data,union) => {
  return data
}

module.exports = {
  exportModule({collection,variable,LocationKey,userUUid,union=[],lifeCycle}){
    //更新采用id作为主键定位,创建采用LocationKey作为唯一标识。
    const searchId = userUUid ? 'uuid': 'id'
    //todo:可改为自己构造的uuid
    const createHandle = async (req, res) => {
      const params = req.allParams()
      const data = await global[collection].findOrCreate({[LocationKey]:params[LocationKey]},fixFunction(params,variable)).
      exec((error,data,hadHandle)=>execHandle({error,data,hadHandle,res,type:"findOrCreate"}));
    }

    const searchHandle = async (req, res) => {
      const params = req.query
      if(union.length){
        const unionHandle = union.map(i=>{
          return global[i.collection].find(i.params)
        })
        let handle = [global[collection].find(params),...unionHandle]
        const data =  await Promise.all(handle)
        if(data){
          const baseResult = data[0]
          data.forEach((i,index)=>{
            if(index===0){
              return
            }else{
              const unionItem = union[index-1].unionOption
              const { locationLabel, exchangeLabel } = unionItem
              if(exchangeLabel[1]){
                baseResult.forEach(base=>{
                  const unionDataItem = data[index].find(i=>i[locationLabel[1]]===base[locationLabel[0]]) //根据规则找到的附表的一条记录
                  base[exchangeLabel[0]] = unionDataItem && unionDataItem[exchangeLabel[1]]
                })
              }else{
                baseResult.forEach(base=>{
                  const unionDataItem = data[index].find(i=>i[locationLabel[0]]===base[locationLabel[1]]) //根据规则找到的附表的一条记录
                  base[exchangeLabel[0]] = unionDataItem && unionDataItem
                })
              }
            }
          })
          normalHandle(undefined,baseResult,res)
        }else{
          normalHandle(err,"",res)
        }
      }else{
        await global[collection].find(params).
        exec((error,data,hadHandle)=>execHandle({error,data,hadHandle,res,type:"find"}))
      }
    }

    const delHandle = async (req, res) => {
      const params = req.allParams()
      await global[collection].destroy(params).
      exec((error,data,hadHandle)=>execHandle({error,data,hadHandle,res,type:"destroy"}))
    }

    const editHandle = async (req, res) => {
      const params = req.body
      await global[collection].update({[searchId]:params[searchId]},fixFunction(params,variable)).set(fixFunction(params,variable)).
      exec((error,data,hadHandle)=>execHandle({error,data,hadHandle,res,type:"update"}))
    }

    return {
      create: async (req,res) => {
        await withLifeCycle(req,res,createHandle,lifeCycle && lifeCycle["create"])
      },

      search: async (req,res) => {
        await withLifeCycle(req,res,searchHandle,lifeCycle["search"])
      },

      del: async (req, res) => {
        await withLifeCycle(req,res,delHandle,lifeCycle && lifeCycle["del"])
      },

      edit: async (req, res) => {
        await withLifeCycle(req,res,editHandle,lifeCycle && lifeCycle["edit"])
      }
    };
  }
}
