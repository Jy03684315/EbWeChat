// pages/orders/orders.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    orderNo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.URL +'public/wechat/listHistory',
      header: {
        'content-type': 'application/json',
        'openid': wx.getStorageSync('user').openid
      },
      success: function (res) {
        console.log(res)
        if(!res.data.content){
          that.setData(
            {
              loading: false,
              queryList: []
            }
          )
        }else{
          that.setData(
            {
              loading: false,
              queryList: res.data.content.orderList
            }
          )
        }
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
    // var that = this;
    // that.data.orderNo='';
    // wx.request({
    //   url: app.globalData.URL + 'public/wechat/listHistory',
    //   header: {
    //     'content-type': 'application/json',
    //     'openid': wx.getStorageSync('user').openid
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     if (!res.data.content) {
    //       that.setData(
    //         {
    //           loading: false,
    //           queryList: []
    //         }
    //       )
    //     } else {
    //       that.setData(
    //         {
    //           loading: false,
    //           queryList: res.data.content.orderList
    //         }
    //       )
    //     }
    //   }
    // })
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
    if (orderNo==''){
      wx.request({
        url: app.globalData.URL +'public/wechat/listHistory',
        header: {
          'content-type': 'application/json',
          'openid': wx.getStorageSync('user').openid
        },
        success: function (res) {
          console.log(res)
          if (!res.data.content) {
            that.setData(
              {
                loading: false,
                queryList: []
              }
            )
          } else {
            that.setData(
              {
                loading: false,
                queryList: res.data.content.orderList
              }
            )
          }
        }
      })
    }else{
      wx.request({
        url: app.globalData.URL +'public/wechat/orderByOrderNo',
        method: 'get',
        header: {
          'content-type': 'application/json',
          'openid': wx.getStorageSync('user').openid
        },
        data: {
          orderNo: orderNo
        },
        success: function (res) {
          console.log(res)
          that.setData(
            {
              loading: false,
              queryList: res.data.content
            }
          )
        }
      })
    }
  },

  orderDetail:function(e){
    var orderNo = e.currentTarget.dataset.name;
    wx.navigateTo({
      url: '../orderDetail/orderDetail?orderNo='+orderNo
    })
  },
})