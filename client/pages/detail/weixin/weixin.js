var api = require('../../../api/api.js');
import { Promise } from '../../../libs/rsvp-latest.min';


Page({
  data: {
    searchIconFlag: true,
    _num: null,
    list: [],
    num: 1,
    articleList: [],
    channelid: 1,
    searchKeyword: '',  //需要搜索的字符  
    start: 0,
    isFromSearch: true,   // 用于判断数组是不是空数组，默认true，空的数组  
    articleNum:20,
    searchLoading: false, //"上拉加载"的变量，默认false，隐藏  
    searchLoadingComplete: false  //“没有数据”的变量，默认false，隐藏  


  },
  onLoad: function () {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 2000
    })

    var _this = this;

    var channel = wx.getStorageSync('wxchannel')
    if (channel) {
      this.setData({
        list: channel
      })
    }
    else {
      const data = {
        url: api.default.url.weixin,
      }
      api.default.ajax(api.default.url.weixin, data).then(function (res) {
        if (res.data.status == 0) {
          _this.data.list.unshift(res.data.result)
          _this.setData({
            list: _this.data.list,
          })
        } else {
          api.default.showModal('提示', res.data.msg)
        }
        wx.setStorageSync('wxchannel', _this.data.list)
      })
    }

    //获得热门数据
    const data = {
      channelid: 1,
      start: '0',
      num: this.data.articleNum
    }
    api.default.ajax(api.default.url.getArticle, data).then(function (res) {
      _this.setData({
        articleList: res.data.result.list
      })
    })
  },



  //输入框事件，每输入一个字符，就会触发一次  
  bindKeywordInput: function (e) {
    console.log("输入框事件")
    this.setData({
      searchKeyword: e.detail.value
    })
  },

  //搜索，访问网络  
  fetchSearchList: function () {
    let that = this;

    //访问网络  

    const data = {
      channelid: this.data.channelid,
      start: that.data.start + 10,
      num: this.data.articleNum 
    }

    api.default.ajax(api.default.url.getArticle, data).then(function (res) {

      //判断是否有数据，有则取数据  
      if (res.data.status == '0') {
        //如果isFromSearch是true从data中取出数据，否则先从原来的数据继续添加  
        that.data.articleList = that.data.articleList.concat(res.data.result.list)

        that.setData({
          articleList: that.data.articleList, //获取数据数组  
          isFromSearch:that.data.isFromSearch,
          searchLoading: false   //把"上拉加载"的变量设为false，显示  
        });
        //没有数据了，把“没有数据”显示，把“上拉加载”隐藏  
      } else {
        that.setData({
          searchLoadingComplete: true, //把“没有数据”设为true，显示  
          searchLoading: false  //把"上拉加载"的变量设为false，隐藏  
        });
      }
    })
  },


  //点击搜索按钮，触发事件  
  keywordSearch: function (e) {
    this.setData({
      searchPageNum: 1,   //第一次加载，设置1  
      articleList: [],  //放置返回数据的数组,设为空  
      isFromSearch: true,  //第一次加载，设置true  
      searchLoading: true,  //把"上拉加载"的变量设为true，显示  
      searchLoadingComplete: false //把“没有数据”设为false，隐藏   
    })

    console.log("search")

    const data = {
      keyword: this.data.searchKeyword
    }
    api.default.ajax(api.default.url.searchArticle, data).then(function (res) {
      console.log("search")
    })
  },


  //滚动到底部触发事件  
  searchScrollLower: function () {
    let that = this;
    if (!that.data.searchLoading && !that.data.searchLoadingComplete) {
      that.setData({
        start:that.data.start+10,
        isFromSearch: false  //触发到上拉事件，把isFromSearch设为为false  
      });
      if (!this.data.searchLoading) {
        this.fetchSearchList();
        console.log("底部", this.data.articleList)
      }
    }
  },



  goDetail: function (e) {
    wx.setStorageSync('weixin', e.currentTarget.dataset.weixin)
    wx.navigateTo({
      url: '../weixinDetail/weixinDetail',
    })
  },

  goChannel: function (e) {
    wx.showToast({
      title: "loading",
      icon: "loading",
      duration: 2000
    })
    this.setData({
      channelid: e.currentTarget.dataset.item,
      articleList: [],
      num: e.currentTarget.dataset.item
    })
  
    this.fetchSearchList();
  },
})
