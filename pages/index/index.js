var call = require("../../utils/request.js")
Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    indicatorDots: true,
    autoplay:true,
    interval: 3000,
    duration: 1000,
    toView: 'red',
    scrollTop: 100,
    indexList:[],
    loadText:'加载中...',
    number:1,
    isloadText: false
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
  
  onLoad(){
    this.getIndexlist(1)
  },
  getIndexlist(number){
    wx.showLoading({
      title: '加载中',
    })
    var list = [
      {
        "id": 4,
        "image": "http://img0.imgtn.bdimg.com/it/u=2738234332,2025993528&fm=26&gp=0.jpg",
        "course": "课程01",
        "time": "2019-06-25 10:00",
        "price": 120.0,
        "coach": "李甜甜"
        },
      {
        "id": 44,
        "image": "http://img0.imgtn.bdimg.com/it/u=2738234332,2025993528&fm=26&gp=0.jpg",
        "course": "课程01",
        "time": "2019-06-25 10:00",
        "price": 120.0,
        "coach": "李甜甜"
        },
      {
        "id": 42,
        "image": "http://img0.imgtn.bdimg.com/it/u=2738234332,2025993528&fm=26&gp=0.jpg",
        "course": "课程01",
        "time": "2019-06-25 10:00",
        "price": 120.0,
        "coach": "李甜甜"
        },
      {
        "id": 34,
        "image": "http://img0.imgtn.bdimg.com/it/u=2738234332,2025993528&fm=26&gp=0.jpg",
        "course": "课程23401",
        "time": "2019-06-25 10:00",
        "price": 12.0,
        "coach": "李甜甜"
        },
      {
        "id": 4,
        "image": "http://img0.imgtn.bdimg.com/it/u=2738234332,2025993528&fm=26&gp=0.jpg",
        "course": "课程01",
        "time": "2019-06-25 10:00",
        "price": 120.0,
        "coach": "李甜甜"
      },
      {
        "id": 44,
        "image": "http://img0.imgtn.bdimg.com/it/u=2738234332,2025993528&fm=26&gp=0.jpg",
        "course": "课程01",
        "time": "2019-06-25 10:00",
        "price": 120.0,
        "coach": "李甜甜"
      },
      {
        "id": 42,
        "image": "http://img0.imgtn.bdimg.com/it/u=2738234332,2025993528&fm=26&gp=0.jpg",
        "course": "课程01",
        "time": "2019-06-25 10:00",
        "price": 120.0,
        "coach": "李甜甜"
      },
      {
        "id": 34,
        "image": "http://img0.imgtn.bdimg.com/it/u=2738234332,2025993528&fm=26&gp=0.jpg",
        "course": "课程23401",
        "time": "2019-06-25 10:00",
        "price": 12.0,
        "coach": "李甜甜"
      }
    ]
    
    if(this.data.indexList.length >20){
     
      this.setData({loadText : '已加载全部数据'})
    }else{
      this.setData({
        isloadText: true,
        indexList: number == 1 ? list : this.data.indexList.concat(list)
      })
    }
    wx.hideLoading()
    // call.getData('order/wx/appoint/',res =>{
    //   console.log(res)
    //   this.setData({
    //     isloadText: true,
    //     indexList: res.data.results
    //   })
    // },err =>{
    //   console.log(err)
    // })
  },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    this.setData({
      number: this.data.number + 1
    })
    this.getIndexlist(this.data.number)
  },
})