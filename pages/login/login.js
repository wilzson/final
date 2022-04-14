// pages/login/login.js
Page({
  getUserProfile: function (e) {
    wx.getUserProfile({
      desc: '业务需要',
      success: res => {
        //拿到信息处理业务
        try {
          wx.setStorageSync('userinfo', res.userInfo)
        } catch (error) {
          
        }
        // 回退到之前的界面
        wx.navigateBack({
          delta: 1,
        })
      }
    })
    
  }
})