// pages/mine/mine.js
Page({
  data: {
    userinfo:{},
    collect:[],
    collectLength:0
  },
  onShow(){
    var that=this;
    // 获取缓存中的个人信息
    const userinfo=wx.getStorageSync('userinfo');
    this.setData({userinfo});
    // 获取收藏夹信息
    wx.request({
      url: 'http://120.76.42.81:8089/getCollectContent',
      data:{
        username:that.data.userinfo.nickName
      },
      success(res){
        let collect=res.data;
        wx.setStorageSync('collect', collect);
        let collectLength=collect.length;
        that.setData({
          collect,
          collectLength
        })
      }
    })
  }
})