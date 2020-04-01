var call = require("../../utils/request.js")
var app = getApp();
Page({
  data: {
    userCode:''
  },
  getUserInfo: function () {
    let that = this;
    wx.login({
      success: res => {
        let code = res.code
        this.setData({
          userCode: res.code
        })
        wx.getUserInfo({
          success: res => {
            wx.request({
              url: 'https://www.volley2019.club/user/wx/login/',
              method: 'post',
              data: {
                'code': this.data.userCode,
                'avatarUrl': res.userInfo.avatarUrl,
                'nickName': res.userInfo.nickName
              },
              header: {
                'content-type': 'application/json'
              },
              success(res) {
                console.log(res.data)
                console.log(res.header['Set-Cookie'].split(';')[0] + ';' + res.header['Set-Cookie'].split(';')[3].split(',')[1])
                wx.setStorageSync('set_cookie', res.header['Set-Cookie'].split(';')[0] + ';' + res.header['Set-Cookie'].split(';')[3].split(',')[1])
                wx.reLaunch({
                  url: '/pages/index/index'
                })
              }
            })
            // 可以将 res 发送给后台解码出 unionId
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id != null || options.id != undefined) {
      this.setData({
        ZhuoID: options.id
      })
    }
    var that = this;
    let code
    wx.login({
      success: res => {
        code = res.code
      }
      
    })
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              wx.reLaunch({
                url: '/pages/index/index'
              })
            }
            
          });
        } else {
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
