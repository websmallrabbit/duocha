// pages/classify/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    classify:[
      {
        name:'qq',
        image:'../../image/qqluck.png',
        text:'QQ号码测吉凶'
      }, {
        name: 'weixin',
        image: '../../image/weixinarticle.png',
        text: '微信文章精选'
      }, {
        name: 'recipe',
        image: '../../image/recipe.png',
        text: '菜谱大全'
      },
      // {
      //   name: 'transit',
      //   image: '../../image/transit.png',
      //   text: '公交地铁查询'
      // },{
      //   name: 'zhouyi',
      //   image: '../../image/zhouyi.png',
      //   text: '周易'
      // }, {
      //   name: 'flowrecharge',
      //   image: '../../image/flowrecharge.png',
      //   text: '手机流量充值'
      // },{
      //   name: 'cell',
      //   image: '../../image/cell.png',
      //   text: '基站查询'
      // },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  goItem:function(event){
    console.log(event);
    var type = event.currentTarget.dataset.type;

    wx.navigateTo({
      url: '../detail/' + type + '/' + type,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})