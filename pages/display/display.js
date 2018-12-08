// pages/display/display.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    datesFrom: '',
    datesTo: '',
    pol:'',
    pod:'',
    loading:true,
    noQuery:true,
    msg:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    var n = timestamp * 1000;
    var date = new Date(n);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    this.setData(
      {
        datesFrom: Y + '-' + M + '-' + D
      }
    )
    this.data.pol = options.pol;
    this.data.pod = options.pod;
    var that = this;
    console.log(wx.getStorageSync('user').openid)
    wx.request({
      url: app.globalData.URL +'public/wechat/queryOvTariff',
      header: {
        'content-type': 'application/json',
        'openid': wx.getStorageSync('user').openid
      },
      data: {
        pol: options.pol,
        pod: options.pod
      },
      success: function (res) {
        console.log(res);
        var queryList = res.data.content.ovTariffList;
        if (res.data.code != '0'){
          that.setData(
            {
              noQuery: false,
              msg:res.errMsg
            }
          )
        } else if (queryList.length == 0){
          that.setData(
            {
              noQuery: false,
              msg: '暂无数据'
            }
          )
        }else{
          that.setData(
            {
              noQuery: true
            }
          )
        }
        that.setData(
          {
            loading:false,
            queryList: queryList
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
      url: app.globalData.URL +'public/wechat/queryOvTariff',
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
        console.log(res);
        var queryList = res.data.content.ovTariffList;
        if (res.data.code != '0') {
          that.setData(
            {
              noQuery: false,
              msg: res.errMsg
            }
          )
        } else if (queryList.length == 0) {
          that.setData(
            {
              noQuery: false,
              msg: '暂无数据'
            }
          )
        }else {
          that.setData(
            {
              noQuery: true
            }
          )
        }
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
  },
  removeTime:function(){
    this.setData(
      {
        datesFrom: '',
        datesTo: ''
      }
    )
  }
})