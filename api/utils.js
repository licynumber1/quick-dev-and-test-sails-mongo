var request = require('request');
var axios = require('axios');
var cheerio = require('cheerio');
var moment = require('moment')
const responseResult = (result,err={msg:"",code:400}) => {
  var res = {
    code:200,
    msg:err.msg,
    success:true
  }
  if(result){
    res.result = result
  }else{
    res.success = false
    res.code = err.code
  }
  return res
}

checkType = (hadHandle,type) => {
  const needHadHandleMap = [
    "findOrCreate",
    "destroy",
    "update",
  ]
  if(hadHandle || !needHadHandleMap.some(i=>i===type)){
    return false
  }
  return true
}

fixSave = (arr,from) => {
  let date = moment().format("L")
  let save = {
    time:date,
    data:arr,
    from:from,
  }
  return save
}

module.exports = {
  execHandle : ({error, data, hadHandle,res,type,union,endHandle}) => {
    if(endHandle) {
      endHandle()
    }
    if (error) {
      res.status(400)
      res.send(responseResult(undefined,{msg:error.details || "数据库出错",code:400}))
    }else if(hadHandle!==undefined && checkType(hadHandle,type)){
      res.status(400)
      res.send(responseResult(undefined,{msg:"未操作数据库",code:400}))
    }
    else {
      const result = responseResult(data || "操作成功")
      res.send(result);
    }
  },

  normalHandle : (error,data,res) => {
    if (error) {
      res.status(400)
      res.send(responseResult(undefined, {msg: error.details || "数据库出错",code:400}))
    }else {
      const result = responseResult(data || "操作成功")
      res.send(result);
    }
  },

  execData : ({error, data, hadHandle,res,type,union}) => {
    if (error) {
      return error
    }
    else {
      return data
    }
  },

  fixFunction : (params,variable) => {
    //过滤属性
    const newParams = {id:params.id}
    variable.forEach(i=>{
      newParams[i] = params[i]
    })
    return newParams
  },

  withLifeCycle : async (req, res, mainFun, lifeCycle) => {
    if(lifeCycle && lifeCycle["before"]){
      if(lifeCycle["before"](req)){
        res.status(400)
        res.send(responseResult(undefined,{msg:"操作失败",code:400}))
        return
      }
    }
    await mainFun(req,res)
    if(lifeCycle && lifeCycle["after"])lifeCycle["after"](req)
  },

  responseResult,

  //爬虫相关
  getNews:{
    getBaiduNews:async (resolve)=>{
      let label = "百度新闻"
      const baseUrl = `http://news.baidu.com/`;
      let arr = []
      let data = await axios.get(baseUrl)
      var $ = cheerio.load(data.data);
      var li = $('li');
      li.each(function (index, ele) {
        var text = $(this).text();
        var src = $('img', this).attr('src');
        var href = $('a', this).attr('href');
        var obj = {
          src: src,
          href: href,
          text: text
        };
        if(obj && obj.href && /^http:\/\/baijiahao/.test(obj.href)){
          arr.push(obj);
        }
      });
      let save = fixSave(arr,label)
      resolve(save)

      // request(baseUrl, (error, innerRes, body) => {
      //   if (!error && innerRes.statusCode == 200) {
      //     var $ = cheerio.load(body);
      //     var li = $('li');
      //     li.each(function (index, ele) {
      //       var text = $(this).text();
      //       var src = $('img', this).attr('src');
      //       var href = $('a', this).attr('href');
      //       var obj = {
      //         src: src,
      //         href: href,
      //         text: text
      //       };
      //       if(obj && obj.href && /^http:\/\/baijiahao/.test(obj.href)){
      //         arr.push(obj);
      //       }
      //     });
      //     let save = fixSave(arr)
      //     resolve(save)
      //   }
      // })
    },

    getSinaNews:async (resolve)=>{
      let label = "新浪新闻"
      const baseUrl = `https://news.sina.com.cn/`;
      let arr = []
      let data = await axios.get(baseUrl)
      var $ = cheerio.load(data.data);
      var li = $('li');
      li.each(function (index, ele) {
        var text = $(this).text();
        var src = $('img', this).attr('src');
        var href = $('a', this).attr('href');
        var obj = {
          src: src,
          href: href,
          text: text
        };
        console.log(obj)
        if(obj && obj.href && /^http[s]?:\/\/news.sina.com.cn\/s/.test(obj.href)){
          arr.push(obj);
        }
      });
      let save = fixSave(arr,label)
      resolve(save)

      // request(baseUrl, (error, innerRes, body) => {
      //   if (!error && innerRes.statusCode == 200) {
      //     var $ = cheerio.load(body);
      //     var li = $('li');
      //     li.each(function (index, ele) {
      //       var text = $(this).text();
      //       var src = $('img', this).attr('src');
      //       var href = $('a', this).attr('href');
      //       var obj = {
      //         src: src,
      //         href: href,
      //         text: text
      //       };
      //       if(obj && obj.href && /^http:\/\/baijiahao/.test(obj.href)){
      //         arr.push(obj);
      //       }
      //     });
      //     let save = fixSave(arr)
      //     resolve(save)
      //   }
      // })
    }
  }
}


