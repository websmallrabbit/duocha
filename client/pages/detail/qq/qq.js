// pages/detail/qq/qq.js
var api = require('../../../api/api.js');
import { Promise } from '../../../libs/rsvp-latest.min';


Page({
  data: {
    qq:'',
    searchIconFlag: true,
    _num:null,
    list:[],
    number:''
   
  },
  setValue: function (e) {
    this.data.qq = e.detail.value
  },
  requestData:function(){

    const data = {
      url: api.default.url.qq,
      qq: this.data.qq
    }
    var _this = this;
    api.default.ajax(api.default.url.qq, data).then(function(res){
      if (res.data.status == 0){
        _this.data.list.unshift(res.data.result)
        _this.setData({
          list: _this.data.list,
          qq: ''
        })
      }else {
        api.default.showModal('提示', res.data.msg)
      }
      
    })
  },

  removefun:function(e){
    this.setData({
      _num: e.currentTarget.dataset.num
    })

    var _this = this;
    this.data.list.splice(this.data._num, 1)
    this.setData({
      list: _this.data.list,
    })
   setTimeout(function(){
   },1600)
  },

  goDetail:function(e){
  
    wx.setStorageSync('qq', e.currentTarget.dataset.qq)
    wx.navigateTo({
      url: '../qqdetail/qqdetail',
    })
  },


 
})