var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowForm: false,
    isShowTime: false,
    activeIndex: 0,
    timeList:[
      '03.26 13:30-14.30',
      '03.26 13:30-14.30',
      '03.26 13:30-14.30',
      '03.26 13:30-14.30',
      '03.26 13:30-14.30',
      '03.26 13:30-14.30',
      '03.26 13:30-14.30',
      '03.26 13:30-14.30',
      '03.26 13:30-14.30',
    ],
    detailObj:{},
    classId:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      classId: options.id
    })
    this.getClassDetail(options.id)
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
  goback(){
    wx.navigateBack({     //返回上一页面
      delta: 1,
    })
  },
  showBottom(){
    this.setData({
      isShowTime: !this.data.isShowTime
    })
    this.getTimeList()
    
  },
  ShowForm(){
    this.setData({
      isShowForm: !this.data.isShowForm
    })
  },
  getTimeList(){
    call.getData('good/wx/coursetime/?course=' + this.data.classId, res => {
      console.log(res)
      this.timeList = res.data.results
    }, err => {
      console.log(err)
    })
  },
  isActivelist(data){
    console.log(data)
    this.setData({
      activeIndex: data.currentTarget.dataset.index
    })
  },
  submit(){
    wx.showToast({
      title: '预约成功',
      icon: 'none',
      duration: 1000,
      mask: true
    })
  },
  /**@name 加载详情数据 */
  getClassDetail(Id){
    call.getData('good/wx/course/'+Id +'/', res =>{
      // console.log(res)
    },err =>{
      // console.log(err)
    })
  }
})