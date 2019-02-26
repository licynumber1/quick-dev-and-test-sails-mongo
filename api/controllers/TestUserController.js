/**
 * TestUserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// lee's study demo !
//waterLine count、create、destroy、find、findone、findOrCreate、native（原始的mongo查询，不推荐）、query（废弃）、stream、update
//          条数   创建    删除     查找  查找一条 查找or创建    mongodb原始查询                    查询           一个接一个 更新
//await Something.stream(criteria)
// .eachRecord(async (record)=>{
//
// });
// 多条件查询
//User.find()
// .where({ id: { '>': 100 }})
// .where({ age: 21 })
// .limit(100)
// .sort('name')
// .exec(function(err, users) {
//   // Do stuff here
// });

const mongo = require('sails-mongo')
const execHandle = require('../utils').execHandle

module.exports = {

  // create: async (req, res) => {
  //   let rows = await TestUser.create({name: 'lee', email: '476770392@qq.com', password: '123456'},{name: 'lee'}).fetch();
  //   return res.json({
  //     rows:rows
  //   });
  // },
  search: (req, res) => {
    //handle
    TestUser.findOrCreate({name:'lee'},{name: 'lee', email: '476770392@qq.com', password: '123456'}).exec((error,data,hadHandle)=>execHandle(error,data,hadHandle,res))
  }
};

