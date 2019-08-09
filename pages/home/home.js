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
    isLoadMore: true
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
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

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
      
      wx.hideLoading()
      if (res.detail) {
        this.setData({
          isLoadMore: false
        })
        wx.showToast({ title: '已加载全部数据', icon: 'none', duration: 1000, mask: true })
      }else{
        if (!res.results.length || res.results.length  == 0) {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 1000,
            mask: true,
            
          })
          this.setData({
            isloadText: true,
            loadText: '暂无数据',
            isLoadMore: false,
            listData: []
          })
        } else {
          if (!res.next ) {
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
      }
     
    },res=>{
      wx.hideLoading()
      console.log(res)
    })
  },
  loadMore(){
    this.setData({
      number: this.data.number + 1
    })
    if (this.data.isLoadMore){
      this.getDataList(this.data.number)
    }
    
  },
  goclassdetail(e) {
    wx.navigateTo({
      url: '/pages/classDetail/classDetail?id=' + e.currentTarget.id
    })
  }
})