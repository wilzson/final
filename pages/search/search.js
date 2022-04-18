// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchContent:"",
    searchList:[]
  },
// 获取后台数据
  getSearch:function(e) {
    console.log(this.data.searchContent);
    var that = this;

    // 重置数据
    that.setData({
      searchList:null
    })

    wx.request({
      url: 'http://120.76.42.81:8089/getSearchContent',
      data:{
        str:that.data.searchContent
      },
      success(res){
        console.log(res);
        var searchList = res.data;
        console.log(searchList);
        that.setData({
          searchList:searchList
        })
      }
    })
  }
  
})