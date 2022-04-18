// pages/tools/tools.js
// import {request}
Page({

  /**
   * 页面的初始数据
   */
  // 定义初始元素
  data: {
      // 左侧的菜单数据
      leftMenuList:[],
      // // 右侧的商品数据
      rightContent:[],
      // 被点击的左边菜单
      currentIndex:0,
      // 右侧内容滚动scrollTop
      screenTop:0,
      
      // 返回的分类id
      // cate_id:0
  },
  // 接口的返回数据
  Cates:{},
  // var rightContent;
  // 输入框的执行逻辑,数据赋值要通过对象set函数实现

  // 左边菜单的点击事件
  handleItemTap(e) {
    /*
    1 获取被点击标题身上的索引
    2 给data中的currentIndex赋值就可以
     */
    const {index} = e.currentTarget.dataset;
    
    let rightContent=this.Cates[index].children;
    this.setData({
      currentIndex:index,
      rightContent
    })

  },
  onLoad: function(options) {
    /* 
    1 使用缓存技术 先判断本地存储中有没有旧的数据
    2 没有旧数据，直接发送新请求
    3 有旧的数据 同时旧数据没有过期 就使用本地存储的旧数据即可

    */

    // 1. 获取本地存储数据
    const Cates = wx.getStorageSync("cates");
    // 判断
    if(!Cates) {
      // 不存在
      this.getCates();
    }else{
      // 有旧数据 定义过期时间5分钟
      if(Date.now()-Cates.time>1000*300){
        this.getCates();
      }else{
        // 可以使用旧数据
        this.Cates=Cates.data;
        // 构造左侧的大菜单数据
        let leftMenuList=this.Cates.map(v=>v.cate.name);
        // 构造右侧的商品数据
        let rightContent=this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
        console.log(2);
      }
    }
  },
  // 获取分类信息
  getCates:function(){
    var that = this;
    wx.request({
      url: 'http://120.76.42.81:8089/category',
      success(res) {
        // console.log(res);
        console.log(1);
        that.Cates=res.data;
        
        // 把接口数据存入本地存储中
        wx.setStorageSync("cates",{time:Date.now(),data:that.Cates});

        console.log(that.Cates);
        console.log(2);
        // 构造左侧的大菜单数据
        let leftMenuList=that.Cates.map(v=>v.cate.name);
        // 构造右侧的内容
        let rightContent = that.Cates[0].children;
        that.setData({
          leftMenuList,
          rightContent,
          // 重新设置 右侧内容高度
          screenTop:0
        })
      }
    })
  }
})
