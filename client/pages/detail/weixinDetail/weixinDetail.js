// pages/detail/qqdetail/qqdetail.js
var WxParse = require('../../../wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    article: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var weixin = wx.getStorageSync("weixin")
    this.data.list.unshift(weixin)
    this.setData({
      list: this.data.list,
      article: this.data.list[0].content
    })
    wx.setNavigationBarTitle({
      title: this.data.list[0].title,
    })



    var article = this.data.list[0].content;
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    var that = this;
    WxParse.wxParse('article', 'html', article, that, 5);
  }
})