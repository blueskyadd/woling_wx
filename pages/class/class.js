// pages/class/class.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    setIndexId: '1',
    filtrate_list: [
      {
        value: '5-6岁',
        id: '1'
      },
      {
        value: '7-8岁',
        id: '2'
      },
      {
        value: '8-10岁',
        id: '3'
      },
      {
        value: '10-12岁',
        id: '4'
      },
    ],
    filter_list:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData(1)
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
  changeMask(){
    this.setData({
      isShow: !this.data.isShow
    })
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
  changeFilter(data){
    console.log(data.currentTarget.id)
    this.setData({
      setIndexId : data.currentTarget.id,
      isShow: false
    })  
    this.getListData(data.currentTarget.id)
  },
  getListData(taber){
    call.getData('good/wx/course/?age_type=' + taber , res =>{
      this.setData({
        filter_list: res.data.results
      })
    },err =>{
      console.log(err)
    })
  }
})