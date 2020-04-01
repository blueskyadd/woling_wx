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
    phone:'',
    number: 1,
    isLoadMore: true
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
  goback(){
    wx.navigateBack({     //返回上一页面
      delta: 1,
    })
  },
  showBottom(){
    this.setData({
      isShowTime: !this.data.isShowTime
    })
  },
  ShowForm(){
    this.setData({
      isShowForm: !this.data.isShowForm,
      username: '',
      age: '',
      phone: '',
    })
  },
  isGetTimeList(){
    this.setData({
      isShowTime: !this.data.isShowTime
    })  
    this.getTimeList(1)
  },
  getTimeList(number){
    wx.showLoading({
      title: '加载中',
    })
    call.getData('good/wx/coursetime/?course=' + this.data.classId + '&p=' + number, res => {
      console.log(res)
      wx.hideLoading()
      if (res.detail) {
        this.setData({
          isLoadMore: false
        })
      }else{
          // wx.showToast({ title: '已加载全部数据', icon: 'none', duration: 1000, mask: true })
          if (res.results.length > 0) {
            this.setData({
              timeList: number == 1 ? res.results.concat(res.results) : this.data.timeList.concat(res.results),
            })
            this.setData({
              timeId: this.data.timeList[0].id
            })
          } else {
            var text = number == 1 ? '暂无预约时间' : '已加载全部数据'
            wx.showToast({ title: text, icon: 'none', duration: 1000, mask: true })
            this.setData({
              isLoadMore: false
            })
          }
      }
        
      
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
      console.log(res[0])
      wx.hideLoading()
      if (res[0]){
        wx.showToast({ title: '你已试听本课程', icon: 'none', duration: 1000, mask: true })
      }else{
        var text = res.detail ? '预约失败' : '预约成功'
        wx.showToast({ title: text, icon: 'none', duration: 1000, mask: true })
      }
      this.ShowForm()

    },err=>{
      wx.hideLoading()
      if(err.request.status == '400'){
        wx.showToast({title: '你已试听本课程',icon: 'none',duration: 1000,mask: true})
      }else{
        wx.showToast({ title: '预约失败', icon: 'none',duration: 1000,mask: true})
      }
      this.ShowForm()
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
      console.log(res)
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
  },
  loadMore(){
    this.setData({
      number: this.data.number + 1
    })
    if (this.data.isLoadMore){
      this.getTimeList(this.data.number)
    }
  }
})