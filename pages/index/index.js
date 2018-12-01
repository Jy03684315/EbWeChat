//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    msg: '',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bind:true,
    unbind: true,
    name:'',
    pwd:''
  },
  onLoad: function () {
    var that=this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    wx.request({
      url: 'http://localhost:8087/LCL-SERVER/public/wechat/isBind',
      header: {
        'content-type': 'application/json',
        'openid': wx.getStorageSync('user').openid
      },
      method: 'post',
      success: function (res) {
        console.log(res);
        if(res.data==false){
          console.log('未绑定')
          that.setData(
            {
              unbind: false,
              bind: true
            }
          )
        }else{
          console.log('已绑定')
          that.setData(
            {
              unbind: true,
              bind: false
            }
          )
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  login: function (e) {
    // wx.showModal({
    //   content: '确认绑定EB账号？',
    //   confirmText: '确定',
    //   cancelText: '取消',
    //   success: function (res) {
    //     if(res.cancel){

    //     }else{

    //     }
    //   },
    // })
    var that = this;
    var name = e.detail.value.name;
    var pwd = e.detail.value.pwd;
    var utilMd5 = require('../../utils/md5.js');
    var password = utilMd5.hexMD5(pwd); 
    wx.request({
      url: 'http://localhost:8087/LCL-SERVER/public/wechat/bind',
      header: {
        'content-type': 'application/json',
        'openid': wx.getStorageSync('user').openid
      },
      method:'post',
      data: 
      JSON.stringify(
        { // 接口入参
          username: name,
          password: password,
          client_id: 'm1',
          client_secret: 's1',
          grant_type: 'password',
          scope: 'read',
          f1: 'true', //  标记本次请求是否对密码进行MD5加密
          captcha: '2b2b' // 验证码
        }
      ),
      success: function (res) {
        console.log(res);
        if(res.data.code=='500'){
          that.setData(
            {
              msg: res.data.message,
              name:'',
              pwd:''
            }
          )
        }else{
          that.setData(
            {
              unbind: true,
              bind: false,
              name: '',
              pwd: '',
              msg:''
            }
          )
        }
      }
    })
  },
  unbind(){
    var that=this;
    wx.showActionSheet({
      itemList: ['确认解除'],
      success(e) {
        console.log(e.tapIndex)
        if (e.tapIndex==0){
          that.setData(
            {
              unbind: false,
              bind: true
            }
          )
        }
      }
    })
  }
})
