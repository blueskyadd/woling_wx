var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowForm: false,
    isShowTime: false,
    activeIndex: 0,
    timeList:[],
    detailObj:{},
    classId:'',
    timeId:'',
    username:'',
    age:'',
    phone:''
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
    wx.showLoading({
      title: '加载中',
    })
    call.getData('good/wx/coursetime/?course=' + this.data.classId, res => {
      console.log(res)
      res = {
        "count": 2,
        "next": null,
        "previous": null,
        "results": [
          {
            "id": 1,
            "start_time": "06.25 10:00",
            "end_time": "12:00",
            "inventory": 12 
          },
          {
            "id": 2,
            "start_time": "06.25 12:00",
            "end_time": "14:00",
            "inventory": 12
          },
          {
            "id": 1,
            "start_time": "06.25 10:00",
            "end_time": "12:00",
            "inventory": 12
          },
          {
            "id": 2,
            "start_time": "06.25 12:00",
            "end_time": "14:00",
            "inventory": 12
          },
          {
            "id": 1,
            "start_time": "06.25 10:00",
            "end_time": "12:00",
            "inventory": 12
          },
          {
            "id": 2,
            "start_time": "06.25 12:00",
            "end_time": "14:00",
            "inventory": 12
          },
          {
            "id": 1,
            "start_time": "06.25 10:00",
            "end_time": "12:00",
            "inventory": 12
          },
          {
            "id": 2,
            "start_time": "06.25 12:00",
            "end_time": "14:00",
            "inventory": 12
          }
        ]
      }
      this.setData({
        timeList: res.results,
        timeId: res.results[0].id
      })
      wx.hideLoading()
    }, err => {
      wx.hideLoading()
      console.log(err)
    })
  },
  isActivelist(data){
    console.log(data)
    this.setData({
      activeIndex: data.currentTarget.dataset.index,
      timeId: data.currentTarget.id,
    })
  },
  submit(){
    if (!this.VerificationData()) return  
    console.log(this.data)
    wx.showLoading({title: '预约中'})
    call.request('order/wx/appoint/',{
      'audition_time': this.data.timeId,
      'name':this.data.username,
      'age':this.data.age,
      'mobile':this.data.phone
    },res =>{
      console.log(res)
      wx.hideLoading()
      var text = res.detail ? '预约失败' :'预约成功'
      wx.showToast({ title: text ,icon: 'none',duration: 1000, mask: true})
    },err=>{
      wx.hideLoading()
      if(err.request.status == '400'){
        wx.showToast({title: '你已试听本课程',icon: 'none',duration: 1000,mask: true})
      }else{
        wx.showToast({ title: '预约失败', icon: 'none',duration: 1000,mask: true})
      }
    })
   
  },
  VerificationData() {
    var myreg = /^0?(13[0-9]|14[5-9]|15[012356789]|166|17[0-8]|18[0-9]|19[8-9])[0-9]{8}$/;
    if (!this.data.username || !this.data.age || !this.data.phone) {
      wx.showToast({title: '请完善您的信息',icon: 'none',duration: 1000,mask: true})
      return false
    }else{
      if (!myreg.test(this.data.phone.replace(/(^\s*)|(\s*$)/g, ""))) {
        wx.showToast({ title: '请填写正确的手机号', icon: 'none', duration: 1000, mask: true })
        return false
      } else {
        return true
      }
    }
    


  },
  /**@name 加载详情数据 */
  getClassDetail(Id){
    wx.showLoading({ title: '加载中' })
    call.getData('good/wx/course/'+Id +'/', res =>{
      // console.log(res)
      this.setData({
        detailObj:res
      })
      wx.hideLoading()
    },err =>{
      wx.hideLoading()
      // console.log(err)
    })
  },
  inputHandleName(e){
    this.setData({
      username: e.detail.value
    })
  },
  inputHandleAge(e){
    console.log(e)
    this.setData({
      age: e.detail.value 
    })
  },
  inputHandlePhone(e){
    this.setData({
      phone: e.detail.value
    })
  }
})