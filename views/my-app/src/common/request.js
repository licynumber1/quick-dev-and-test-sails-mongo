/**
 * powered by 波比小金刚 at 2018-05-08 14:52:28
 * last modified by 波比小金刚 at 2018-05-08 14:52:28
 * @Description: 对 axios 进行二次封装
*/
import { message } from 'antd';
import axios from 'axios';
import qs from 'qs';
//? 服务器code信息
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

// TODO 需要封装一个重定向的方法
//const redirectTo = (path, ...rest) => {}

//? baseUrl

const type = 'test'
const isTest = type === 'test'
const testUrl = ('http://149.129.111.193:1337')//记得改回来
const baseUrl = isTest ? testUrl : 'http://api-dmp.fishsaying.com'
export const websocketUrl = isTest ? "ws://test1-api-dmp.fishsaying.com/websocket" : "ws://api-dmp.fishsaying.com/websocket"
// const baseUrl = process.env.NODE_ENV === 'development' ? 'http://test1-api-dmp.fishsaying.com' : 'http://api-dmp.fishsaying.com';
//之后改成这样的
//? 全局的默认配置
// 现在数据量较大，暂时开放到100s
axios.defaults.timeout = 100000;
axios.defaults.baseURL = baseUrl;
axios.defaults.headers = {
  // 'X-Requested-With': 'XMLHttpRequest',
  'content-Type': 'application/x-www-form-urlencoded'
}

//! 控制请求，统一异常处理和消息提示, loading 的控制也可以在这里完成。
let cancel, promiseArr = {};
const CancelToken = axios.CancelToken;

//? 请求拦截, 这里做了取消重复请求的处理
// TODO loading 在这里控制
axios.interceptors.request.use(config => {
  if(promiseArr[config.url]){
    promiseArr[config.url]('canceled the operation by -^ 波比小金刚 ^-');
    promiseArr[config.url] = cancel
  }else{
    promiseArr[config.url] = cancel
  }
  return config;
}, err => {
  message.error('请求超时');
  return Promise.reject(err);
});

//? 响应拦截，这里统一处理异常
axios.interceptors.response.use(response => {
  return response;
}, err => {
  if(err && err.response){
    message.error(codeMessage[err.response.status] || `连接服务器失败${err.response.status}`);

    // TODO 统一处理各种异常，比如 401 需要跳转到登录页面。
    // switch(err.response.status){
    //   case 400:
    //     break;
    //   case 401:
    //     break;
    //   default:

    // }
  }else{
    //message.error('连接到服务器失败');
  }
  //* 这里是resolve, 所以可以失败了也在 .then 中得到信息，可以方便来关闭 loading 等
  return Promise.resolve(err.response);
})

// ! 导出所有的请求方法
export default {
  //* GET
  get(url, param){
    return new Promise((resolve, reject) => {
      axios({
        method: 'get',
        url,
        params: param,
        cancelToken: new CancelToken( c => { cancel = c })
      }).then( res => {
        resolve(res);
      })
    });
  },

    getWithoutCancel(url, param){
        return new Promise((resolve, reject) => {
            axios({
                method: 'get',
                url,
                params: param,
            }).then( res => {
                resolve(res);
            })
        });
    },

    put(url, param){
        return new Promise((resolve, reject) => {
            axios({
                method: 'put',
                url,
                params: param,
                cancelToken: new CancelToken( c => { cancel = c })
            }).then( res => {
                resolve(res);
            })
        });
    },

    del(url, param){
        return new Promise((resolve, reject) => {
            axios({
                method: 'delete',
                url,
                params: param,
            }).then( res => {
                resolve(res);
            })
        });
    },

  //* POST with json
  postJSON(url, param){
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: param,
        cancelToken: new CancelToken( c => { cancel = c })
      }).then(res => {
        resolve(res);
      })
    })
  },

    postJSONWithoutCancel(url, param){//对于部分形似表单而非表单的接口，不需要对其进行拦截，以免导致逻辑出错
        return new Promise((resolve, reject) => {
            axios({
                method: 'post',
                url,
                data: param,
            }).then(res => {
                resolve(res);
            })
        })
    },

  //* POST with form
  postForm(url, param){
    return new Promise((resolve, reject) => {
      axios({
        method: 'post',
        url,
        data: qs.stringify(param),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        cancelToken: new CancelToken( c => { cancel = c })
      }).then(res => {
        resolve(res);
      })
    })
  },

  //* upload File
  upload(url, param, cb){
    return new Promise((resolve, reject) => {
      axios({
        method: 'put',
        url,
        data: param,
        headers: { 'content-type': 'multipart/form-data' },
        onUploadProgress: processEvent => {
          cb(processEvent);
        },
        cancelToken: new CancelToken( c => { cancel = c })
      }).then(res => {
        resolve(res);
      })
    })
  }
}


// 上传文件的 demo
// (function () {
//   var output = document.getElementById('output');
//   document.getElementById('upload').onclick = function () {
//     var data = new FormData();
//     data.append('foo', 'bar');
//     data.append('file', document.getElementById('file').files[0]);
//     var config = {
//       onUploadProgress: function(progressEvent) {
//         var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
//       }
//     };
//     axios.put('/upload/server', data, config)
//       .then(function (res) {
//         output.className = 'container';
//         output.innerHTML = res.data;
//       })
//       .catch(function (err) {
//         output.className = 'container text-danger';
//         output.innerHTML = err.message;
//       });
//   };
// })();






