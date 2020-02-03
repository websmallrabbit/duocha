import { Promise } from '../libs/rsvp-latest.min';


export default class API{
  static ajax(url,data,method){
    data = data || {}
    return new Promise((resolve,reject)=>{
      return wx.request({
        method:method || 'get',
        url: url + '?appkey=4f801e91a2880522',
        data:data,
        success:function(res){
          // success网络请求成功
          if (res.statusCode != 200) {
            reject({ error: '服务器忙，请稍后重试', code: 500 });
            return;
          }
          resolve(res);
        },
        fail: function (res) {
          // fail调用接口失败
          reject({ error: '网络错误', code: 0 });
        },
      })
    })
  }

  static showModal(title2,content2){
    wx.showModal({
      title: title2,
      content: content2,
      showCancel: false,
      confirmText: "确定"
    })
  } 
 

  static url ={
    qq:'http://api.jisuapi.com/qqluck/query',
    recipe:'http://api.jisuapi.com/recipe/search',
    weixin:'http://api.jisuapi.com/weixinarticle/channel',
    getArticle:'http://api.jisuapi.com/weixinarticle/get',
    searchArticle:'http://api.jisuapi.com/weixinarticle/search'
  }
}


