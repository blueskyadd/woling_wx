// pages/class/class.js
var call = require("../../utils/request.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    setIndexId: '',
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
      {
        value: '全部',
        id: ''
      },
    ],
    filter_list:[],
    isloadText: false,
    loadText:'加载中...',
    number:1,
    isLoadMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  // onLoad: function (options) {
  //   this.getListData('', 1)
  // },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getListData('', 1)
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
  loadMore(){
    this.setData({
      number: this.data.number + 1
    })
    if(this.data.isLoadMore){
      this.getListData(this.data.setIndexId, this.data.number)
    }
   
  },
  changeMask(){
    this.setData({
      isShow: !this.data.isShow
    })
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
    this.getListData(data.currentTarget.id, 1)
  },
  getListData(taber, number){
    wx.showLoading({
      title: '加载中',
    })
    call.getData('good/wx/course/?age_type=' + taber + '&p=' + number , res =>{
      console.log(res.detail)
      wx.hideLoading()
      if (res.detail) {
        this.setData({
          isLoadMore: false
        })
        wx.showToast({ title: '已加载全部数据', icon: 'none', duration: 1000, mask: true })
      }else{
        if (!res.results.length || res.results.length == 0 ) {
          wx.showToast({
            title: '暂无数据',
            icon: 'none',
            duration: 1000,
            mask: true
          })
          this.setData({
            isloadText: true,
            loadText: '暂无数据',
            filter_list: [],
            isLoadMore: false
          })
        } else {
          if (!res.next) {
            this.setData({
              isloadText: true,
              loadText: '已加载全部数据',
              isLoadMore: false
            })
          } else {
            this.setData({
              isloadText: false
            })
          }
          this.setData({
            filter_list: number == 1 ? res.results : this.data.filter_list.concat(res.results),
          })
        }
      }
      
      
    },err =>{
      wx.hideLoading()
      console.log(err)
    })
  },
  goclassdetail(e){
    wx.navigateTo({
      url: '/pages/classDetail/classDetail?id=' + e.currentTarget.id
    })
  }
})