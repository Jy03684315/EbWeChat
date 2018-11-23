// pages/display/display.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datesFrom: '2000-01-01',
    datesTo: '2000-01-01',
    pol:'',
    pod:'',
    loading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.pol = options.pol;
    this.data.pod = options.pod;
    var that = this;
    wx.request({
      url: 'http://localhost:8087/LCL-SERVER/tariff/queryOvTariff',
      header: {
        'content-type': 'application/json'
      },
      data: {
        pol: options.pol,
        pod: options.pod
      },
      success: function (res) {
        console.log(res.data.content.ovTariffList);
        that.setData(
          {
            loading:false,
            queryList: res.data.content.ovTariffList
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
  onSearch: function (e) {
    var that = this;
    that.setData(
      {
        loading: true,
        queryList:[]
      }
    )
    wx.request({
      url: 'http://localhost:8087/LCL-SERVER/tariff/queryOvTariff',
      header: {
        'content-type': 'application/json'
      },
      data: {
        pol: this.data.pol,
        pod: this.data.pod,
        beginDate: this.data.datesFrom,
        endDate: this.data.datesTo
      },
      success: function (res) {
        console.log(res.data.content.ovTariffList)
        that.setData(
          {
            loading: false,
            queryList: res.data.content.ovTariffList
          }
        )
      }
    })
  },
  bindDateChangeFrom: function (e) {
    this.setData({
      datesFrom: e.detail.value
    })
  },
  bindDateChangeTo: function (e) {
    this.setData({
      datesTo: e.detail.value
    })
  }
})