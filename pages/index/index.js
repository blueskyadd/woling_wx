var call = require("../../utils/request.js")
Page({
  data: {
    imgUrls: ['http://img.taopic.com/uploads/allimg/140720/240467-140H00K62786.jpg', 'http://img01.taopic.com/160919/240411-16091ZGP271.jpg'],
    indicatorDots: true,
    autoplay:true,
    interval: 3000,
    duration: 1000,
    toView: 'red',
    scrollTop: 100,
    indexList:[],
    loadText:'加载中...',
    number:1,
    isloadText: false,
    isLoadMore: true
  },
  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },
  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },
  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },
  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
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
  tapMove: function(e) {
    cobsole.log(e)
    this.setData({
      scrollTop: this.data.scrollTop + 10
    })
  },
  goclassDetail(e){
    console.log(e)
    wx.navigateTo({
      url: '/pages/classDetail/classDetail?id=' + e.currentTarget.id
    })
  },
  onShow(){
    this.getIndexlist(1)
  },
  getIndexlist(number){
    wx.showLoading({
      title: '加载中',
    })
    
    call.getData('good/wx/course/?p=' + number,res =>{
      console.log(res)
      if (res.detail) {
        this.setData({
          isLoadMore: false
        })
        wx.showToast({ title: '已加载全部数据', icon: 'none', duration: 1000, mask: true })
      } else {
        if (!res.results.length || res.results.length == 0){
            this.setData({
              isloadText: true,
              loadText: '暂无数据',
              indexList: [],
              isLoadMore: false
            })
          }else{
            if (!res.next ) {
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
              indexList: number == 1 ? res.results : this.data.indexList.concat(res.results),
            })
          }
      }
      wx.hideLoading()
      
    },err =>{
      wx.hideLoading()
      console.log(err)
    })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    this.setData({
      number: this.data.number + 1
    })
    if(this.data.isLoadMore){
      this.getIndexlist(this.data.number)
    }
    
  },
})