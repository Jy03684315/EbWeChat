// pages/orders/orders.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: 'http://localhost:8087/LCL-SERVER/public/wechat/listHistory',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.content.orderList)
        that.setData(
          {
            loading: false,
            queryList: res.data.content.orderList
          }
        )
      }
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

  },

  onSearch:function(e){
    console.log(e.detail.value.orderNo);
    var orderNo = e.detail.value.orderNo;
    var that = this;
    that.setData(
      {
        loading: true,
        queryList: []
      }
    )
    wx.request({
      url: 'http://localhost:8087/LCL-SERVER/public/wechat/listHistory',
      header: {
        'content-type': 'application/json'
      },
      data: {
        orderNo: orderNo
      },
      success: function (res) {
        console.log(res.data.content.orderList)
        that.setData(
          {
            loading: false,
            queryList: res.data.content.orderList
          }
        )
      }
    })
  },

  orderDetail:function(e){
    var orderNo = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderNo='+orderNo
    })
  },
})