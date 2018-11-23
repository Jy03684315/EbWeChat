// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderNo:'',
    pod:'',
    pol:'',
    voyageNo:'',
    ORDER:'',
    EX_LOAD_IN_HOUSE:'',
    CUSTOM_DECLARATION:'',
    EX_HBL:'',
    SAIL:'',
    FEE:'',
    EX_HBL_ISSUE:'',
    LCL_STATUS:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.orderNo)
    var that = this;
    wx.request({
      url: 'http://localhost:8087/LCL-SERVER/booking/detail/listBizTrace',
      header: {
        'content-type': 'application/json'
      },
      data: {
        orderNo: options.orderNo
      },
      success: function (res) {
        console.log(res.data.content);
        var queryList = res.data.content;
        that.setData(
          {
            orderNo: options.orderNo,
            ORDER: queryList[0].status,
            ORDERtime: queryList[0].upldateDt,
            EX_LOAD_IN_HOUSE: queryList[1].status,
            CUSTOM_DECLARATION: queryList[2].status,
            EX_HBL: queryList[3].status,
            SAIL: queryList[4].status,
            FEE: queryList[5].status,
            EX_HBL_ISSUE: queryList[6].status,
            LCL_STATUS: queryList[7].status,
            current: 4
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