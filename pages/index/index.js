// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // 轮播图数组
    swiperList:[],
    test_id:0,
    // 楼层数组
    floorList:[]
  },
  // 提交数据到Java后台
  click: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.test_id = res.result;
        console.log(this.test_id);
        that.setData({
          test_id: this.test_id
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        // wx.navigateTo({
        //   url: '/pages/goods_detail/index?id=' + this.test_id,
        // })
      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'none',
          duration: 2000
        })
      },
    })
    },
  onLoad() {
    // 发送异步请求
    wx.request({
      url: 'http://localhost:80/lunbo',
      success:(res)=>{
        console.log(res);
        this.setData({
          swiperList:res.data
        })
        
      }
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    wx.request({
      url: 'http://localhost:80/floor',
      success:(res)=>{
        console.log(res);
        this.setData({
          floorList:res.data
        })
      }
    })
  },
  getUserProfile(e) {
    
  },
  getUserInfo(e) {
    
  }
})
