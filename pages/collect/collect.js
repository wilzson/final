// pages/collect/collect.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect:[]
  },
  onShow: function () {
    // 获取缓存中的设备信息
    let collect=wx.getStorageSync('collect')||[];
    this.setData({collect});
    console.log(collect);
  },
  
})