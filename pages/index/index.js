const app = getApp();
const { $Message } = require('../../dist/base/index');

Page({
  data: {
    visible: false,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    bind:true,
    unbind: true,
    name:'',
    pwd:'',
    bindName:'',
    bindPwd:''
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
  },
  onShow: function () {
    var that = this;
    wx.request({
      url: app.globalData.URL + 'public/wechat/isBind',
      header: {
        'content-type': 'application/json',
        'openid': wx.getStorageSync('user').openid
      },
      method: 'post',
      success: function (res) {
        console.log(res);
        if (!res.data) {
          console.log('未绑定')
          that.setData(
            {
              unbind: false,
              bind: true
            }
          )
        } else {
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
  handleClose() {
    this.setData({
      visible: false
    });
  },
  modal: function (e) {
    var name = e.detail.value.name;
    var pwd = e.detail.value.pwd;
    var utilMd5 = require('../../utils/md5.js');
    var password = utilMd5.hexMD5(pwd); 
    this.setData({
      visible: true,
      bindName: name,
      bindPwd: password
    });
  },
  login: function () {
    var that = this;
    var name = that.data.bindName;
    var password = that.data.bindPwd;
    wx.request({
      url: app.globalData.URL + 'public/wechat/bind',
      header: {
        'content-type': 'application/json',
        'openid': wx.getStorageSync('user').openid,
        'nickName': wx.getStorageSync('userInfo').nickName,
        'avatarUrl': wx.getStorageSync('userInfo').avatarUrl,
        'city': wx.getStorageSync('userInfo').city,
        'country': wx.getStorageSync('userInfo').country,
        'gender': wx.getStorageSync('userInfo').gender,
        'language': wx.getStorageSync('userInfo').language,
        'province': wx.getStorageSync('userInfo').province
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
        if(res.data.code!='0'){
          $Message({
            content: res.data.message,
            type: 'error'
          });
          that.setData(
            {
              name:'',
              pwd:''
            }
          );
          that.setData({
            visible: false
          });
        }else{
          $Message({
            content: '绑定成功！',
            type: 'success'
          });
          that.setData(
            {
              unbind: true,
              bind: false,
              name: '',
              pwd: '',
              msg:''
            }
          );
          that.setData({
            visible: false
          });
        }
      }
    })
  },
  unbind(){
    var that=this;
    wx.showActionSheet({
      itemList: ['确认解除'],
      itemColor: '#ed3f14',
      success(e) {
        console.log(e.tapIndex)
        if (e.tapIndex==0){
          wx.request({
            url: app.globalData.URL+'public/wechat/unbind',
            header: {
              'content-type': 'application/json',
              'openid': wx.getStorageSync('user').openid
            },
            method: 'post',
            success: function (res) {
              console.log(res);
              if (res.data.code != '0') {
                $Message({
                  content: '解除失败！',
                  type: 'error'
                });
              }else{
                $Message({
                  content: '解除成功！',
                  type: 'success'
                });
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
      }
    })
  }
})
