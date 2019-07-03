// pages/home/home.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollHeight: '',
    picture:'',
    name:'',
    listData:[],
    number:1,
    isloadText: false,
    loadText: '加载中...',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let query = wx.createSelectorQuery().in(this)
    this.getUser()
    this.getDataList()
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
  upper: function(e) {
    console.log(e)
  },
  lower: function(e) {
    console.log(e)
  },
  scroll: function(e) {
    console.log(e)
  },
  tap: function(e) {
    for (var i = 0; i < order.length; ++i) {
      if (order[i] === this.data.toView) {
        this.setData({
          toView: order[i + 1]
        })
        break
      }
    }
  },
  tapMove: function(e) {
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  getUser(){
    wx.getUserInfo({
      success: res => {
        console.log(res)
        this.setData({
          picture: res.userInfo.avatarUrl,
          name: res.userInfo.nickName
        })
      }
    })
  },
  getDataList(number){
    wx.showLoading({
      title: '加载中',
    })
    call.getData('order/wx/appoint/', res=>{
      console.log(res)
      res = {
        "count": 1,
        "next": null,
        "previous": null,
        "results": [
          {
            "id": 4,
            "image": "http://10.102.100.23:8080/media/goods/front/12724384_085414541114_2_-_%E5%89%AF%E6%9C%AC.jpg",
            "course": "课程01",
            "time": "2019-06-25 10:00",
            "price": 120.0,
            "coach": "李甜甜"
          }
        ]
      }
      res.results = res.results.concat(res.results.concat(res.results.concat(res.results.concat(res.results.concat(res.results.concat(res.results.concat(res.results)))))))
      wx.hideLoading()
      if (!res.results.length) {
        wx.showToast({
          title: '暂无数据',
          icon: 'none',
          duration: 1000,
          mask: true
        })
        this.setData({
          isloadText: true,
          loadText: '暂无数据',
          listData: []
        })
      } else {
        if (!res.next) {
          this.setData({
            isloadText: true,
            loadText: '已加载全部数据',
          })
        } else {
          this.setData({
            isloadText: false
          })
        }
        this.setData({
          listData: number == 1 ? res.results : this.data.listData.concat(res.results),
        })
      }
    },res=>{
      wx.hideLoading()
      console.log(res)
    })
  },
  loadMore(){
    console.log('aaaaaa')
    this.setData({
      number: this.data.number + 1
    })
    this.getDataList(this.data.number)
  },
  goclassdetail(e) {
    wx.navigateTo({
      url: '/pages/classDetail/classDetail?id=' + e.currentTarget.id
    })
  }
})