// pages/orderDetail/orderDetail.js
const app = getApp();
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo:'',
    pod:'',
    pol:'',
    voyageNo:'',
    queryList:[],
    noQuery: true,
    msg: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this;
    wx.request({
      url: app.globalData.URL +'public/wechat/listBizTrace',
      header: {
        'content-type': 'application/json'
      },
      data: {
        orderNo: options.orderNo
      },
      success: function (res) {
        console.log(res.data.content);
        var queryList = res.data.content;
        var current=0;
        if (res.data.code != '0') {
          that.setData(
            {
              noQuery: false,
              msg: res.errMsg
            }
          )
        } else if (res.data.content == null ||queryList.length == 0) {
          that.setData(
            {
              noQuery: false,
              msg: '暂无数据'
            }
          )
        } else {
          for (var i = 0; i < queryList.length; i++) {
            if (!queryList[i].createDt) {
              current = i - 1;
              break;
            }
          }
          for (var i = 0; i < queryList.length; i++) {
            if (queryList[i].upldateDt) {
              queryList[i].upldateDt = time.formatTime(queryList[i].upldateDt);
            }
          }
          that.setData(
            {
              orderNo: options.orderNo,
              queryList: queryList,
              current: current
            }
          )
        }
      }
    });
    wx.request({
      url: app.globalData.URL + 'public/wechat/orderByOrderNo',
      method: 'get',
      header: {
        'content-type': 'application/json',
        'openid': wx.getStorageSync('user').openid
      },
      data: {
        orderNo: options.orderNo
      },
      success: function (res) {
        console.log(res)
        that.setData(
          {
            pod: res.data.content[0].podName,
            pol: res.data.content[0].polName,
            voyageNo: res.data.content[0].voyageNo
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
})